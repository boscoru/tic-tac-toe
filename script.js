const board = document.querySelector('#gameboard');
const nameX = document.querySelector('#nameX');
const nameO = document.querySelector('#nameO');
const markerX = document.querySelector('#markerX');
const markerO = document.querySelector('#markerO');
const message = document.querySelector('#message');
const restartButton = document.querySelector('#content > button');
const dialogX = document.querySelector("#changeX");
const showButtonX = document.querySelector("#nameX > button");
const closeButtonX = document.querySelector("#changeX button");
const dialogO = document.querySelector("#changeO");
const showButtonO = document.querySelector("#nameO > button");
const closeButtonO = document.querySelector("#changeO button");
const submitX = document.getElementById('formX');
const submitO = document.getElementById('formO');
const gameBoard = document.getElementById('gameboard');

let spots = [];
for(i = 0; i<9; i++) spots[i] = document.getElementById(`${i}`);

let game = (function () {
    let xPlayer = 'Player X';
    let oPlayer = 'Player O';
    let turn = 'x';
    let winner = 0;

    let gameBoard = [];
    for(let i = 0; i < 3; i++){
        gameBoard[i] = [];
        for(let j = 0; j < 3; j++) gameBoard[i][j] = undefined;
    };

    function takeTurn (choiceX, choiceY) {
        if (gameBoard[choiceX][choiceY]) return {success: 0, turn: turn};
        else {
            gameBoard[choiceX][choiceY] = turn;
            let oldTurn = turn;
            if (turn === 'x') turn = 'o';
            else turn = 'x';
            return {success: 1, turn: oldTurn};
        }
    };

    const getBoard = () => gameBoard;

    const restart = () => {
        turn = 'x';
        winner = 0;
        for(let i = 0; i < 3; i++){
            gameBoard[i] = [];
            for(let j = 0; j < 3; j++) gameBoard[i][j] = undefined;
        }
        let line = document.querySelector('.line');
        if (line) line.remove();
    };

    const checkWinner = () => {
        let stalemate = 1;
        winner =1;
        for (let i=0 ; i<3 ; i++) {
            for (let j=0; j<3 ; j++) if(!gameBoard[i][j]) stalemate = 0;
        }
        if (gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][0] && gameBoard[1][0] === gameBoard[2][0]) return 1;
        else if(gameBoard[0][1] && gameBoard[0][1] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][1]) return 2;
        else if(gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][2] && gameBoard[1][2] === gameBoard[2][2]) return 3;
        else if(gameBoard[0][0] && gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] === gameBoard[0][2]) return 4;
        else if(gameBoard[1][0] && gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[1][2]) return 5;
        else if(gameBoard[2][0] && gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] === gameBoard[2][2]) return 6;
        else if(gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) return 7;
        else if(gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) return 8;
        else if(stalemate === 1){
            winner = 2;
            return 0;
        }
        else {
            winner = 0;
            return 0;
        }
    };

    const getWinner = () => winner;

    const getTurn = () => turn;

    return {xPlayer, oPlayer, getWinner, getTurn, takeTurn, getBoard, restart, checkWinner};
})();

function showWinner(position) {
    let line = document.createElement('div')
    line.classList.add('line');
    switch (position) {
        case 1:
            line.style.top = '50%';
            line.style.left = '16.667%';
            line.style.transform = 'translate(-50%, -50%) rotate(90deg)';
            line.style.width = '375px';
            break;
        case 2:
            line.style.top = '50%';
            line.style.left = '50%';
            line.style.transform = 'translate(-50%, -50%) rotate(90deg)';
            line.style.width = '375px';
            break;
        case 3:
            line.style.top = '50%';
            line.style.left = '83.333%';
            line.style.transform = 'translate(-50%, -50%) rotate(90deg)';
            line.style.width = '375px';
            break;
        case 4:
            line.style.top = '16.667%';
            line.style.left = '50%';
            line.style.transform = 'translate(-50%, -50%)';
            line.style.width = '375px';
            break;
        case 5:
            line.style.top = '50%';
            line.style.left = '50%';
            line.style.transform = 'translate(-50%, -50%)';
            line.style.width = '375px';
            break;
        case 6:
            line.style.top = '83.333%';
            line.style.left = '50%';
            line.style.transform = 'translate(-50%, -50%)';
            line.style.width = '375px';
            break;
        case 7:
            line.style.top = '50%';
            line.style.left = '50%';
            line.style.transform = 'translate(-50%, -50%) rotate(45deg)';
            line.style.width = '530px';
            break;
        case 8:
            line.style.top = '50%';
            line.style.left = '50%';
            line.style.transform = 'translate(-50%, -50%) rotate(45deg)';
            line.style.width = '530px';
            break;
    }
    gameBoard.appendChild(line);
}

function playGame(e) {
    let choiceX, choiceY;
    if (!game.getWinner()) {
        switch (e.target.id) {
            case '0':
                choiceX = 0;
                choiceY = 0;
                break;
            case '1':
                choiceX = 0;
                choiceY = 1;
                break;
            case '2':
                choiceX = 0;
                choiceY = 2;
                break;
            case '3':
                choiceX = 1;
                choiceY = 0;
                break;
            case '4':
                choiceX = 1;
                choiceY = 1;
                break;
            case '5':
                choiceX = 1;
                choiceY = 2;
                break;
            case '6':
                choiceX = 2;
                choiceY = 0;
                break;
            case '7':
                choiceX = 2;
                choiceY = 1;
                break;
            case '8':
                choiceX = 2;
                choiceY = 2;
                break;
        }
        let result = game.takeTurn(choiceX, choiceY);  
        let position = game.checkWinner(); 
        if (result.success) {
            updateBoard(result.turn);
            if (game.getWinner() === 1 ) {
                if (result.turn === 'x') message.textContent = game.xPlayer + " wins!";
                else message.textContent = game.oPlayer + " wins!";
                markerX.style.backgroundColor = 'rgb(0, 0, 60)';
                markerO.style.backgroundColor = 'rgb(0, 0, 60)';
                showWinner(position);
            }
            else if (game.getWinner() ===2 ) {
                message.textContent = "Stalemate!";
                markerX.style.backgroundColor = 'rgb(0, 0, 60)';
                markerO.style.backgroundColor = 'rgb(0, 0, 60)';
            }
        }
        else message.textContent = 'Spot already taken! Pick again!';
    }
}

function updateBoard(turn = 'o') {
    if (turn === 'x') {
        markerX.style.backgroundColor = 'rgb(0, 0, 60)';
        markerO.style.backgroundColor = 'beige';
    }
    else {
        markerX.style.backgroundColor = 'beige';
        markerO.style.backgroundColor = 'rgb(0, 0, 60)';
    }
    let currentBoard = game.getBoard();
    let index = 0;
    for (i = 0; i < 3; i++){
        for (j = 0; j < 3; j++) {
            if (currentBoard[i][j]) spots[index].textContent = currentBoard[i][j].toUpperCase();
            else spots[index].textContent = '';
            index++;
        }
    }
    message.textContent = '';
}

function changeXName(event) {
    event.preventDefault();
    let form = document.getElementById(event.target.id);
    let formData = new FormData(form);
    showButtonX.textContent = formData.get('playerX');
    game.xPlayer = formData.get('playerX');
    form.reset();
    dialogX.close();
}

function changeOName(event) {
    event.preventDefault();
    let form = document.getElementById(event.target.id);
    let formData = new FormData(form);
    showButtonO.textContent = formData.get('playerO');
    game.oPlayer = formData.get('playerO');
    form.reset();
    dialogO.close();
}

board.addEventListener('click', playGame);
restartButton.addEventListener('click', () => {
    game.restart();
    updateBoard();
});

showButtonX.addEventListener("click", () => {
  dialogX.showModal();
});

closeButtonX.addEventListener("click", () => {
  dialogX.close();
});

showButtonO.addEventListener("click", () => {
  dialogO.showModal();
});

closeButtonO.addEventListener("click", () => {
  dialogO.close();
});

submitX.addEventListener("submit", changeXName);
submitO.addEventListener("submit", changeOName);