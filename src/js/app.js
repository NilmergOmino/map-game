import '../scss/style.scss';
// import { Europe } from './maps/europe.js';
import { EuropePL } from './maps/europe-pl.js';


window.addEventListener('DOMContentLoaded', function(){
    const btnStart = document.getElementById('btn_start');
    btnStart.addEventListener('click', function(){
        toggleView();
        startGame();
    });
})

function toggleView(){
    const header = document.getElementById('header');
    const startPanel = document.getElementById('start-panel');
    const gameContainer = document.getElementById('game-container');
    header.classList.toggle('hidden');
    startPanel.classList.toggle('hidden');
    gameContainer.classList.toggle('hidden');
}
function startGame(){
    Game.init();
}
function restartGame(){
    document.querySelectorAll('.map-item').forEach(el=>el.classList.remove('map-item_correct'));
    toggleView();
}
const Game = {
    timeContainer: document.getElementById('time'),
    pointsContainer: document.getElementById('points'),
    gameCountry: document.getElementById('game-country'),
    mapItems: document.querySelectorAll('.map-item'),
    init: function(){
        Game.stopCounting = false;
        Game.letClick = true;
        Game.points = 0;
        Game.pointsContainer.textContent = Game.points;
        Game.time = 100;
        Game.setCounties();
        Game.mapItems.forEach(el=>el.addEventListener('click',Game.checkAnswer));
    },
    setCounties: function(){
        Game.countriesArr = [];
        for(let key in EuropePL){
            if(EuropePL.hasOwnProperty(key)) Game.countriesArr.push(key);
        }
        Game.maxPoints = Game.countriesArr.length*2;
        Game.startRound();
    },
    setTime: function(){
        Game.time = 100;
    },
    setCountry: function(){
        let random = Math.floor(Math.random()*(Game.countriesArr.length-1));
        Game.currentCountry = Game.countriesArr[random];
        Game.gameCountry.classList.remove('game-country_correct');
        Game.gameCountry.classList.remove('game-country_wrong');
        Game.gameCountry.textContent = EuropePL[Game.currentCountry];
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
            console.log (x+"_"+y);
            Game.flyingPoint('-1','minus',x,y);
            window.setTimeout(Game.startRound, 700);
        }
    },
    startRound: function(){
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
    },
    checkAnswer: function(event){
        Game.stopCounting = true;
        if(Game.letClick){
            let x = event.clientX-10;
            let y = event.clientY-22+pageYOffset;
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
        let btnRestart = document.createElement('button');
        btnRestart.classList.add('btn_restart');
        btnRestart.textContent = "Zagraj ponownie";
        btnRestart.addEventListener('click', restartGame);
        Game.gameCountry.textContent = "Gratulacje, ukończyłeś grę!";
        Game.gameCountry.appendChild(btnRestart);
        Game.pointsContainer.textContent = Game.points + " / " + Game.maxPoints;
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
        },1500)
    }
}
