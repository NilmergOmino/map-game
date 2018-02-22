const winBoard = {
    board: document.getElementById('win-board'),
    btnsContainer: document.getElementById('btns-container'),
    winsContainer: document.getElementById('wins-container'),
    btnResetResults: document.getElementById('btn_clear-storage'),
    show: function(){
        winBoard.board.classList.remove('hidden');
    },
    hide: function(){
        winBoard.board.classList.add('hidden');
        winBoard.btnsContainer.innerHTML = '';
        winBoard.winsContainer.innerHTML = '';
    },
    createButton: function(htmlClass , text){
        let btn = document.createElement('button');
        btn.classList.add(htmlClass);
        btn.textContent = text;
        winBoard.btnsContainer.appendChild(btn);
        return btn;
    },
    addNewResult: function(mapName, result, maxPoints){
        if(localStorage.getItem(mapName) == null){
            localStorage.setItem(mapName, JSON.stringify({
                max: maxPoints,
                arr: []
            }));
        }
        let results = JSON.parse(localStorage.getItem(mapName));
        results.arr.push(result);
        localStorage.setItem(mapName, JSON.stringify(results));
        winBoard.winsContainer.innerHTML = '';
        winBoard.btnResetResults.classList.add('hidden');
        winBoard.showResults(mapName);
    },
    showResults: function(mapName){
        winBoard.show();

        let divContainer = document.createElement('div');
        divContainer.classList.add('map-results');
        winBoard.winsContainer.appendChild(divContainer);

        let mapTitle = document.createElement('h2');
        mapTitle.classList.add('map-title');
        mapTitle.textContent = winBoard.translate(mapName);
        divContainer.appendChild(mapTitle);

        if(localStorage.getItem(mapName) !== null){
            let results = JSON.parse(localStorage.getItem(mapName));
            let bestResult = Math.max(...results.arr);

            let maxPointsContainer = document.createElement('p');
            maxPointsContainer.classList.add('board__max-points');
            divContainer.appendChild(maxPointsContainer);
            maxPointsContainer.innerHTML = 'Maksymalna liczba punktów: '+results.max;

            let bestResultContainer = document.createElement('p');
            bestResultContainer.classList.add('best-result');
            divContainer.appendChild(bestResultContainer);
            bestResultContainer.innerHTML = 'Twój najlepszy wynik: <span class="best-result-value">'+bestResult+'</span>';

            let otherResults = document.createElement('div');
            otherResults.classList.add('other-results');
            divContainer.appendChild(otherResults);
            otherResults.innerHTML = '<p>Najnowsze wyniki:</p>';

            let list = document.createElement('ol');
            list.classList.add('result-list');
            otherResults.appendChild(list);

            let fragment = document.createDocumentFragment();
            results.arr.reverse().forEach((el,index)=>{
                if(index < 10){
                    let item = document.createElement('li');
                    item.classList.add('result-list-item');
                    item.textContent = el;
                    fragment.appendChild(item);
                }
            })
            list.appendChild(fragment);
        }
        else{
            let noResultsInfo = document.createElement('p');
            noResultsInfo.classList.add('no-results-info');
            noResultsInfo.textContent = "brak wyników";
            divContainer.appendChild(noResultsInfo);
        }
    },
    resetResults: function(){
        if (confirm('Wszystkie Twoje wyniki zostaną usunięte z pamięci, czy na pewno chcesz kontynuować?')) {
            localStorage.clear();
            winBoard.winsContainer.innerHTML = '';
            winBoard.showAllResults();
        }
    },
    showAllResults: function(){
        winBoard.winsContainer.innerHTML = '';
        winBoard.btnResetResults.classList.remove('hidden');
        document.querySelectorAll('.select-map option').forEach(el=>{
            winBoard.showResults(el.value);
        })
    },
    translate: function(mapName){
        let translatedName = 'wystąpił błąd';
        document.querySelectorAll('.select-map option').forEach(el=>{
            if(el.value == mapName) translatedName = el.textContent;
        })
        return translatedName;
    }
}
export {winBoard};
