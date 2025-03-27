console.log("Welcome to Tic-Tac-Toe");

// Initialize variables
let turn = "X";
let isgameover = false;
let musicStarted = false; // Flag to track if music has started

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

// Function to change turn
const changeTurn = ()=>{
    return turn === "X" ? "O" : "X";
}

// Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
           (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
           (boxtext[e[0]].innerText !== "") ){

            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
            isgameover = true;

            // Stop background music and play gameover sound
            music.pause();
            gameover.play();

            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');

    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            
            // Play music on first move
            if (!musicStarted) {
                music.play();
                music.loop = true; // Keep music playing until game over
                musicStarted = true;
            }

            audioTurn.play(); // Play turn sound
            checkWin(); 

            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset game
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });

    turn = "X"; 
    isgameover = false;
    musicStarted = false; // Reset flag so music starts again on next game
    music.pause();
    music.currentTime = 0; // Reset background music
    gameover.pause();
    gameover.currentTime = 0; // Reset gameover sound

    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
