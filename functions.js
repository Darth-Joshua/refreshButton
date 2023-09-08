'use strict';
// VARIABLES------------------------------------
const time2 = document.getElementById('time2'); // time that starts from 02:00 to 00:00
const time0 = document.getElementById('time0'); // time that starts from 00:00 to 02:00

const startbutton = document.getElementById('start'); // button to start the time2
const startbutton2 = document.getElementById('start2'); // button to start the time2
const reversebutton = document.getElementById('reverse'); // 

const sound = document.getElementById('sound'); // sound to play
const won = document.getElementById('won'); // image to display 

const square = document.getElementById('square'); // square box that holds the button and timer
let body = document.body; // body-tag

let ison = false;
let startTime; // Variable to store the start time

let timerIntervalreverse; // Interval ID for updating the timer
let timerIntervalforward; // Interval ID for updating the timer

let formerBGC = ''; // bgc variable
let whichButtonstate = true;
let number = 1;


// Store the initial styles for the div.square
const initialSquareStyles = {
    display: 'flex',
    flexDirection: 'column', // Add flexDirection property
    justifyContent: 'center',
    alignItems: 'center',
};


// FUNCTIONALITY--------------------------------
// Function to start the timer
function startTime2() {
    startTime = new Date().getTime(); // Get the current timestamp
    timerIntervalreverse = setInterval(updateTimerReverse, 1000); // Update the timer every second
    startbutton.textContent = 'Refresh';  
}

function startTime0() {
    startTime = new Date().getTime(); // Get the current timestamp
    timerIntervalforward = setInterval(updateTimer, 1000); // Update the timer every second
    startbutton2.textContent = 'Refresh';  
}

// FUNCTIONS ------------------------------------
// Function to update the timer  ----------------------00:00   ----> 02:00
function updateTimer() {
    const currentTime = new Date().getTime(); // Get the current timestamp
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed seconds

    const minutes = Math.floor(elapsedTime / 60); // Calculate minutes
    const seconds = elapsedTime % 60; // Calculate seconds

    // Display the time in "00:00" format
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    console.log(timeString);

    time0.textContent = timeString;

    if (timeString === '02:00') {
        timeString =  '02:00';
        startbutton2.textContent = 'start';
        sound.play();
    }
}

// Function to update the timer ----------------------02:00   ----> 00:00
function updateTimerReverse() {
    const currentTime = new Date().getTime(); // Get the current timestamp
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed seconds

    let remainingSeconds = 120 - elapsedTime; // Calculate remaining seconds

    if (remainingSeconds <= 0) {
        // When the timer reaches 00:00, stop the interval and play the sound
        clearInterval(timerIntervalreverse);
        sound.play();
        startbutton.textContent = 'start';
        time2.textContent = '00:00';
        remainingSeconds = 0;
        return;
    }

    const minutes = Math.floor(remainingSeconds / 60); // Calculate minutes
    const seconds = remainingSeconds % 60; // Calculate seconds

    // Display the time in "00:00" format
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    time2.textContent = timeString;
}


// CLICK EVENTS---------------------------------

// Event listener for the button click
startbutton.addEventListener('click', function () {
    return startTime2();
});

startbutton2.addEventListener('click', function () {
    return startTime0();
});

reversebutton.addEventListener('click', function () {
    if (whichButtonstate === false) {
        whichButtonstate = true;
        time2.textContent = '02:00';

        time0.hidden = true;
        time2.hidden = false;
        
        startbutton.hidden = false;
        startbutton2.hidden = true;
        startbutton.textContent = 'start';

        clearInterval(timerIntervalforward);
        clearInterval(timerIntervalreverse);
    }
    else {
        whichButtonstate = false;
        time0.textContent = '00:00';

        time0.hidden = false;
        time2.hidden = true;

        startbutton.hidden = true;
        startbutton2.hidden = false;
        startbutton2.textContent = 'start';

        clearInterval(timerIntervalreverse);
        clearInterval(timerIntervalforward);
    }
});


// EVENTS--------------------------------------


// do things when the window is loaded
window.addEventListener('load', function () {

    if (window.innerWidth <= 427) {
        body.style.backgroundColor = 'red'; // Red background for small screens
        square.style.width = '75%';
        startbutton.style.fontSize = 'larger';
        startbutton2.style.fontSize = 'larger';
    } else if (window.innerWidth >= 428 && window.innerWidth <= 850) {
        body.style.backgroundColor = 'yellow'; // Yellow background for medium screens
        square.style.width = '50%';
    } else if (window.innerWidth >= 1440) {
        body.style.backgroundColor = 'green'; // Yellow background for medium screens
        square.style.width = '25%';
    } else {
        body.style.backgroundColor = 'blue'; // Blue background for large screens
        square.style.width = '25%';
    }
});

// on keypress do something
document.addEventListener('keypress', (event) => {
    // on key press " " (space) do things
    if (event.key === ' ') {
        // Prevent the default spacebar behavior (scrolling the page)
        event.preventDefault();
        // Play the audio when the spacebar is pressed
        whichButtonstate ? setInterval(startbutton.click(), 1500)  : setInterval(startbutton2.click(), 1500);
    }

    // on key press "r" do things
    if (event.key === 'r') {
        if (formerBGC !== '') {
            body.style.backgroundColor = formerBGC;
        }
        won.hidden = true;
        reversebutton.hidden = false;
        square.style.display = 'block';
        Object.assign(square.style, initialSquareStyles);
        clearInterval(timerIntervalreverse);
        clearInterval(timerIntervalforward);
    }

    // on key press "w" do things
    if (event.key === 'w') {
        formerBGC = body.style.backgroundColor;
        won.hidden = false;
        won.style.width = '100%';
        won.style.height = '100vh';
        body.style.backgroundColor = 'black';
        reversebutton.hidden = true;
        square.style.display = 'none';
    }
});

// Add a resize event listener to dynamically change the background color on window resize
window.addEventListener('resize', function () {

    if (window.innerWidth <= 427) {
        body.style.backgroundColor = 'red'; // Red background for small screens
        square.style.width = '75%';
        startbutton.style.fontSize = 'larger';
    } else if (window.innerWidth >= 428 && window.innerWidth <= 850) {
        body.style.backgroundColor = 'yellow'; // Yellow background for medium screens
        square.style.width = '50%';
    }
    else if (window.innerWidth >= 1440) {
        body.style.backgroundColor = 'green'; // Yellow background for medium screens
    } else {
        body.style.backgroundColor = 'blue'; // Blue background for large screens
        square.style.width = '25%';
    }
});
