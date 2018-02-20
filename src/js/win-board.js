const winBoard = {
    board: document.getElementById('win-board'),
    btnsContainer: document.getElementById('btns-container'),
    winsContainer: document.getElementById('wins-container'),
    show: function(){
        winBoard.board.classList.remove('hidden');
    },
    hide: function(){
        winBoard.board.classList.add('hidden');
        winBoard.btnsContainer.innerHTML = '';
    },
    createButton: function(htmlClass , text){
        let btn = document.createElement('button');
        btn.classList.add(htmlClass);
        btn.textContent = text;
        winBoard.btnsContainer.appendChild(btn);
        return btn;
    },
    showResults: function(){

    }
}
export {winBoard};
