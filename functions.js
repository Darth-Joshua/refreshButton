'use strict';
// VARIABLES------------------------------------
const time = document.getElementById('time');
const startbutton = document.getElementById('start');
const sound = document.getElementById('sound');
const won = document.getElementById('won');
const square = document.getElementById('square');
const reversebutton = document.getElementById('reverse');

let ison = false;
let startTime; // Variable to store the start time
let timerInterval; // Interval ID for updating the timer
let state = false;

// Store the initial styles for the div.square
const initialSquareStyles = {
    display: 'flex',
    flexDirection: 'column', // Add flexDirection property
    justifyContent: 'center',
    alignItems: 'center',
};


// FUNCTIONALITY--------------------------------
// Function to start the timer
function startTimer(ut) {
    ison = true
    if (!ison === false) {
        startTime = new Date().getTime(); // Get the current timestamp
        timerInterval = setInterval(ut, 1000); // Update the timer every second
        startbutton.textContent = 'Refresh';  
    }
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
    time.textContent = timeString;

    if (timeString === '02:00') {
        timeString =  '02:00';
        sound.play();
    }
}

// Function to update the timer ----------------------02:00   ----> 00:00
function updateTimerReverse() {
    const currentTime = new Date().getTime(); // Get the current timestamp
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed seconds

    const remainingSeconds = 120 - elapsedTime; // Calculate remaining seconds

    if (remainingSeconds <= 0) {
        // When the timer reaches 00:00, stop the interval and play the sound
        clearInterval(timerInterval);
        sound.play();
        startbutton.textContent = 'Refresh';
        time.textContent = '00:00';
        return;
    }

    const minutes = Math.floor(remainingSeconds / 60); // Calculate minutes
    const seconds = remainingSeconds % 60; // Calculate seconds

    // Display the time in "00:00" format
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    time.textContent = timeString;
}


// CLICK EVENTS---------------------------------

// Event listener for the button click
startbutton.addEventListener('click', function () {
    // Start the timer when the button is clicked
    time.textContent = '02:00';
    state = false;
    return startTimer(updateTimerReverse);
});

reversebutton.addEventListener('click', function () {
    if (state === false) { 
        time.textContent = '00:00';
        state = true;
        return startTimer(updateTimer);
    }
    else {
        time.textContent = '02:00';
        state = false;
        return startTimer(updateTimerReverse);
    }
});


// EVENTS--------------------------------------

// Add a keydown event listener to the document
document.addEventListener('keypress', (event) => {
    // Check if the pressed key is the spacebar (keyCode 32)
    if (event.key === ' ') {
        // Prevent the default spacebar behavior (scrolling the page)
        event.preventDefault();
        // Play the audio when the spacebar is pressed
        startTimer();
    }
});

// Add a keydown event listener to the document
document.addEventListener('keypress', (event) => {
    // Check if the pressed key is the spacebar (keyCode 87)
    if (event.key === 'w') {
        // Play the audio when the spacebar is pressed
        won.hidden = false;
        square.style.display = 'none';
    }
});

// Add a keydown event listener to the document
document.addEventListener('keypress', (event) => {
    // Check if the pressed key is the spacebar (keyCode 87)
    if (event.key === 'r') {
        // Play the audio when the spacebar is pressed
        won.hidden = true;
        square.style.display = 'block';
        Object.assign(square.style, initialSquareStyles);
        startTimer();
    }
});






