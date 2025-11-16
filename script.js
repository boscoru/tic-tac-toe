const board = document.querySelector('#gameboard');
const nameX = document.querySelector('#nameX');
const nameO = document.querySelector('#nameO');
const markerX = document.querySelector('#markerX');
const markerO = document.querySelector('#markerO');
const message = document.querySelector('#message');
const restartButton = document.querySelector('#content > button');

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
    };

    const checkWinner = () => {
        winner = 1;
        if (gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][0] && gameBoard[1][0] === gameBoard[2][0]) return 1;
        else if(gameBoard[0][1] && gameBoard[0][1] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][1]) return 2;
        else if(gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][2] && gameBoard[1][2] === gameBoard[2][2]) return 3;
        else if(gameBoard[0][0] && gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] === gameBoard[0][2]) return 4;
        else if(gameBoard[1][0] && gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[1][2]) return 5;
        else if(gameBoard[2][0] && gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] === gameBoard[2][2]) return 6;
        else if(gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) return 7;
        else if(gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) return 8;
        else {
            winner = 0;
            return 0;
        }
    };

    const getWinner = () => winner;

    const getTurn = () => turn;

    return {xPlayer, oPlayer, getWinner, getTurn, takeTurn, getBoard, restart, checkWinner};
})();

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
        game.checkWinner(); 
        if (result.success) {
            updateBoard(result.turn);
            if (game.getWinner()) {
                if (result.turn === 'x') message.textContent = game.xPlayer + " wins!";
                else message.textContent = game.oPlayer + " wins!";
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

board.addEventListener('click', playGame);
restartButton.addEventListener('click', () => {
    game.restart();
    updateBoard();
});