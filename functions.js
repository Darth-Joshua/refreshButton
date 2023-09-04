const time = document.getElementById('time');
const startbutton = document.getElementById('start');
const sound = document.getElementById('sound');

let ison = false;
let startTime; // Variable to store the start time
let timerInterval; // Interval ID for updating the timer

// Function to start the timer
function startTimer() {
    ison = true
    if (!ison === false) {
        startTime = new Date().getTime(); // Get the current timestamp
        timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
        startbutton.textContent = 'Refresh';  
    }
}

// Function to update the timer
function updateTimer() {
    const currentTime = new Date().getTime(); // Get the current timestamp
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed seconds

    const minutes = Math.floor(elapsedTime / 60); // Calculate minutes
    const seconds = elapsedTime % 60; // Calculate seconds

    // Display the time in "00:00" format
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    time.textContent = timeString;

    if (timeString === '02:00') {
        sound.play();
    }
}

// Event listener for the button click
startbutton.addEventListener('click', function () {
    // Start the timer when the button is clicked
    startTimer();
});

// Add a keydown event listener to the document
document.addEventListener('keydown', (event) => {
    // Check if the pressed key is the spacebar (keyCode 32)
    if (event.keyCode === 32) {
        // Prevent the default spacebar behavior (scrolling the page)
        event.preventDefault();

        // Play the audio when the spacebar is pressed
        startTimer();
    }
});