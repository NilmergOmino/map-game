import '../scss/style.scss';
import { winBoard } from './win-board.js';

window.addEventListener('DOMContentLoaded', function(){
    const btnStart = document.getElementById('btn_start');
    const btnWinBoard = document.getElementById('btn_win-board');
    const btnClose = document.getElementById('btn_close');
    const btnBack = document.getElementById('btn_back');
    const selectMap = document.getElementById('select-map');
    selectMap.addEventListener('change', Game.setMap);
    Game.setMap();
    btnStart.addEventListener('click', function(){
        app.toggleView();
        app.startGame();
    });
    btnWinBoard.addEventListener('click', winBoard.showAllResults);
    btnClose.addEventListener('click', winBoard.hide);
    btnBack.addEventListener('click', app.startView);
    winBoard.btnResetResults.addEventListener('click', winBoard.resetResults);
})

const app = {
    header: document.getElementById('header'),
    startPanel: document.getElementById('start-panel'),
    gameContainer: document.getElementById('game-container'),
    startGame: function(){
        Game.init();
    },
    restartGame: function(){
        Game.stopAndClean();
        winBoard.hide();
        Game.init();
    },
    startView: function(){
        Game.stopAndClean();
        winBoard.hide();
        app.toggleView();
    },
    toggleView: function(){
        app.header.classList.toggle('hidden');
        app.startPanel.classList.toggle('hidden');
        app.gameContainer.classList.toggle('hidden');
    }
}

const Game = {
    timeContainer: document.getElementById('time'),
    pointsContainer: document.getElementById('points'),
    gameCountry: document.getElementById('game-country'),
    selectMap: document.getElementById('select-map'),
    mapContainer: document.getElementById('game-map-container'),
    init: function(){
        Game.status = true;
        Game.mapContainer.innerHTML = Game.mapSVG;
        let svgMap = Game.mapContainer.querySelector('svg');
        svgMap.id = Game.map;
        svgMap.classList.add(Game.map, "game-map");
        Game.stopCounting = false;
        Game.letClick = true;
        Game.points = 0;
        Game.pointsContainer.textContent = Game.points;
        Game.time = 100;
        Game.setMapItems();
        Game.setCountries();
        Game.mapItems.forEach(el=>el.addEventListener('click',Game.checkAnswer));
    },
    setMap: function(){
        Game.map = Game.selectMap.value;
        let mapSource = "js/maps-info/"+Game.map+'.json';
        let ajax = new XMLHttpRequest();
        ajax.open("GET", mapSource, true);
        ajax.addEventListener('load', function(){
            if(this.status === 200){
                Game.mapObject = JSON.parse(ajax.responseText)
                Game.loadMap();
            }
            else alert('Błąd połączenia! Prosimy spróbować później.');
        })
        ajax.send();
    },
    loadMap: function(){
        let mapSource = "img/maps/"+Game.map+".svg";
        let ajax = new XMLHttpRequest();
        ajax.open("GET", mapSource, true);
        ajax.addEventListener('load', function(){
            (this.status === 200)? Game.mapSVG = ajax.responseText : alert('Błąd połączenia! Prosimy spróbować później.');
        })
        ajax.send();
    },
    stopAndClean: function(){
        Game.mapContainer.innerHTML = '';
        Game.stopCounting = true;
        Game.letClick = false;
        Game.status = false;
    },
    setMapItems: function(){
        let items = '#'+Game.map+' .map-item';
        Game.mapItems = document.querySelectorAll(items);
    },
    setCountries: function(){
        Game.countriesArr = [];
        for(let key in Game.mapObject){
            if(Game.mapObject.hasOwnProperty(key)) Game.countriesArr.push(key);
        }
        Game.maxPoints = Game.countriesArr.length*2;
        Game.startRound();
    },
    setTime: function(){
        Game.time = 100;
    },
    setCountry: function(){
        let random = Math.round(Math.random()*(Game.countriesArr.length-1));
        Game.currentCountry = Game.countriesArr[random];
        Game.gameCountry.classList.remove('game-country_correct');
        Game.gameCountry.classList.remove('game-country_wrong');
        Game.gameCountry.textContent = Game.mapObject[Game.currentCountry];
    },
    removeCountry: function(item){
        let itemIndex = Game.countriesArr.indexOf(item);
        Game.countriesArr.splice(itemIndex,1);
    },
    counting: function(){
        if(Game.time >= 50){
            Game.timeContainer.classList.add('time_good');
            Game.timeContainer.classList.remove('time_enough');
        }
        else if(Game.time < 50 && Game.time > 0){
            Game.timeContainer.classList.add('time_enough');
            Game.timeContainer.classList.remove('time_good');
        }
        else{
            Game.timeContainer.classList.remove('time_good');
            Game.timeContainer.classList.remove('time_enough');
        }
        if(!Game.stopCounting && Game.time > 0){
            Game.time -= 1;
            Game.timeContainer.textContent = ((Game.time/10)%1 == 0)?(Game.time/10)+".0" : Game.time/10;
            setTimeout(Game.counting, 100);
            if(Game.time == 0) Game.letClick = false;
        }
        else if(Game.time <= 0){
            Game.points--;
            Game.pointsContainer.textContent = Game.points;
            Game.stopCounting = true;
            Game.gameCountry.classList.add('game-country_wrong');
            let x = window.innerWidth/2-10;
            let y = (window.innerHeight/2)+pageYOffset-15;
            Game.flyingPoint('-1','minus',x,y);
            window.setTimeout(Game.startRound, 700);
        }
    },
    startRound: function(){
        if(Game.status){
            if(Game.countriesArr.length > 0){
                Game.stopCounting = false;
                Game.letClick = true;
                Game.setCountry();
                Game.stopCounting = false;
                Game.time = 100;
                Game.counting();
            }
            else{
                Game.endGame();
            }
        }
    },
    checkAnswer: function(event){
        Game.stopCounting = true;
        if(Game.letClick){
            let x = event.clientX-14;
            let y = event.clientY-34+pageYOffset;
            Game.letClick = false;
            let mapItemId = event.target.id;
            if(mapItemId == Game.currentCountry){
                if(Game.time >= 50){
                    Game.points+=2
                    Game.flyingPoint('+2','plus-plus',x,y);
                }
                else{
                    Game.points++;
                    Game.flyingPoint('+1','plus',x,y);
                }
                event.target.removeEventListener('click', Game.checkAnswer);
                event.target.classList.add('map-item_correct');
                Game.removeCountry(mapItemId);
                Game.gameCountry.classList.add('game-country_correct');
            }
            else{
                Game.points--;
                event.target.classList.add('map-item_wrong');
                Game.gameCountry.classList.add('game-country_wrong');
                Game.flyingPoint('-1','minus',x,y);
                window.setTimeout(function(){
                    event.target.classList.remove('map-item_wrong');
                }, 700);
            }
            Game.pointsContainer.textContent = Game.points;
            Game.stopCounting = true;
            window.setTimeout(Game.startRound, 700);
        }
    },
    endGame: function(){
        Game.stopCounting = true;
        Game.letClick = false;
        Game.status = false;
        Game.gameCountry.textContent = "Gratulacje, ukończyłeś grę!";
        Game.pointsContainer.textContent = Game.points + " / " + Game.maxPoints;
        winBoard.show();
        let btnRestart = winBoard.createButton('btn_restart', 'zagraj ponownie');
        let btnStartView = winBoard.createButton('btn_restart', 'powrót do wyboru mapy');
        btnRestart.addEventListener('click', app.restartGame);
        btnStartView.addEventListener('click', app.startView);
        winBoard.addNewResult(Game.map, Game.points, Game.maxPoints);
    },
    flyingPoint: function(content, pointType, x, y){
        let point = document.createElement('span');
        point.textContent = content;
        point.classList.add('flying-point', 'flying-point_'+pointType);
        point.style.left = x+'px';
        point.style.top = y+'px';
        document.body.appendChild(point);
        window.setTimeout(function(){
            document.body.removeChild(point);
        },1500);
    }
}
