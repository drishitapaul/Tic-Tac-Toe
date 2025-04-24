console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let boxes = document.getElementsByClassName('box');

    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox img').style.width = "200px";

            // Dynamically calculate line position
            let box1 = boxes[e[0]].getBoundingClientRect();
            let box2 = boxes[e[2]].getBoundingClientRect();

            let container = document.querySelector('.container').getBoundingClientRect();

            let x1 = box1.left + box1.width / 2 - container.left;
            let y1 = box1.top + box1.height / 2 - container.top;
            let x2 = box2.left + box2.width / 2 - container.left;
            let y2 = box2.top + box2.height / 2 - container.top;

            let length = Math.hypot(x2 - x1, y2 - y1);
            let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

            const line = document.querySelector('.line');
            line.style.width = `${length}px`;
            line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
        }
    });
};

// Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            } 
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})

