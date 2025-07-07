let time = 25*60;
let timerInterval=null;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn= document.getElementById('reset');

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
    timerInterval = setInterval(() => {
        if(time > 0) {
            time--;
            updateDisplay();
        }
        else{
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");
            startBtn.classList.remove('active');
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
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay(); 