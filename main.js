const X_class = 'x';
const CIRCLE_class = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellEle = document.querySelectorAll('[data-cell');
const board = document.getElementById('board');
const restartBtn = document.getElementById('restartButton');
const winningMessageTextEle = document.querySelector('[data-winning-message-text]');
const winningMessageEle = document.querySelector('.winning-message');
let circleTurn;

startGame();

restartBtn.addEventListener('click',startGame);

function startGame() {
    circleTurn = false;
    cellEle.forEach(cell => {
        cell.classList.remove(X_class);
        cell.classList.remove(CIRCLE_class);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once: true});
    });
    setBoardHoverClass();
    winningMessageEle.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currClass = circleTurn ? CIRCLE_class : X_class;
    placeMark(cell,currClass);
    if(checkWin(currClass)){
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    }
    else{
        swapTurns();
        setBoardHoverClass();
    }
} 
function endGame(draw) {
    if(draw) {
        winningMessageTextEle.innerText = 'Draw!';
    }
    else{
        winningMessageTextEle.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageEle.classList.add('show');
}
function isDraw() {
    return [...cellEle].every(cell=> {
        return cell.classList.contains(X_class) || cell.classList.contains(CIRCLE_class);
    });
}
function placeMark(cell,currClass) {
    cell.classList.add(currClass);
}
function swapTurns() {
    circleTurn = !circleTurn;
}
function setBoardHoverClass() {
    board.classList.remove(X_class);
    board.classList.remove(CIRCLE_class);
    if(circleTurn){
        board.classList.add(CIRCLE_class);
    }
    else{
        board.classList.add(X_class);
    }
}
function checkWin(currClass) {
    return WINNING_COMBINATIONS.some(c => {
        return c.every(index => {
            return cellEle[index].classList.contains(currClass);
        });
    });
}