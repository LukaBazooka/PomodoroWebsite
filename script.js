let time = 25*60;
let timerInterval=null;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn= document.getElementById('reset');
const workBtn = document.getElementById('workbtn');
const restBtn = document.getElementById('restbtn');
const alarmSound = document.getElementById('alarm-sound');


if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
}

function updateDisplay()
{
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer(){
    if(timerInterval) return;
    startBtn.classList.add('active');
    pauseBtn.classList.remove('active');
    timerDisplay.setAttribute('contenteditable', 'false');
    timerInterval = setInterval(() => {
        if(time > 0) {
            time--;
            updateDisplay();
        }
        else {
            clearInterval(timerInterval);
            timerInterval = null;
            startBtn.classList.remove('active');
            timerDisplay.setAttribute('contenteditable', 'true');

            // Play sound
            alarmSound.currentTime = 0;
            alarmSound.play();

            // Show notification
            showNotification("Pomodoro Finished!", "Time for a break 🍅");

            alert("Time's up!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.classList.remove('active');
    pauseBtn.classList.add('active');
}

function resetTimer() {
    pauseTimer();
    time = 25 * 60;
    updateDisplay();
    startBtn.classList.remove('active');
    pauseBtn.classList.remove('active');
    timerDisplay.setAttribute('contenteditable', 'true');
}

function workTimer() {
    pauseTimer(); 
    time = 25 * 60;
    updateDisplay();
    startBtn.classList.remove('active');
    pauseBtn.classList.remove('active');
    timerDisplay.setAttribute('contenteditable', 'true');
}

function restTimer() {
    pauseTimer(); 
    time = 5 * 60;
    updateDisplay();
    startBtn.classList.remove('active');
    pauseBtn.classList.remove('active');
    timerDisplay.setAttribute('contenteditable', 'true');
}

function showNotification(title, message) {
    if (Notification.permission === "granted") {
        new Notification(title, { body: message, icon: "imgs/tomatostalk.png" }); // icon optional
    }
}


function handleManualTimeInput() {
    const input = timerDisplay.textContent.trim();

    let minutes = 0;
    let seconds = 0;

    if (input.includes(':')) {
        const parts = input.split(':');
        if (parts.length === 2) {
            minutes = parseInt(parts[0]);
            seconds = parseInt(parts[1]);

            if (isNaN(minutes) || isNaN(seconds) || seconds >= 60 || minutes < 0 || seconds < 0) {
                alert("Please enter a valid time (e.g., 10:30)");
                updateDisplay();
                return;
            }
        } else {
            alert("Invalid time format. Use MM:SS or just seconds.");
            updateDisplay();
            return;
        }
    } else {
        // Raw number input: assume it's seconds
        const raw = parseInt(input);
        if (isNaN(raw) || raw < 0) {
            alert("Please enter a valid number of seconds or time in MM:SS format.");
            updateDisplay();
            return;
        }

        minutes = Math.floor(raw / 60);
        seconds = raw % 60;
    }

    time = minutes * 60 + seconds;
    updateDisplay();
}


timerDisplay.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();  
        timerDisplay.blur(); 
    }
});

timerDisplay.addEventListener('blur', handleManualTimeInput);

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
workBtn.addEventListener('click', workTimer);
restBtn.addEventListener('click', restTimer);

updateDisplay(); 