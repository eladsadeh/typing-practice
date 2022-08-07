import texts from './text.json' assert {type: 'json'};

const selectText = () => {
  const index = Math.floor(Math.random()*texts.length)
  return texts[index]
  };

const countWords = (text) => {
  return text[text.length-1] === ' ' ? text.trim().split(/[\s-]/).length :
  text.trim().split(/[\s-]/).length-1
};

function secondsToString(time) {
	const minutes = Math.floor(time / 60);
	const seconds = minutes ? time % 60 : time;
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
		2, '0')}`;
}

function runTimer(run) {
	if (run) {
		isTimerRunning = setInterval(() => {
			timerEl.innerHTML = secondsToString(++timeCounter);
		}, 1000);
	} else {
		// Pause - clear the setInterval
		clearInterval(isTimerRunning);
		isTimerRunning = 0;
	}
}

const processText = (input,ref) => {
  //start timer if not running already
  if (!isTimerRunning) runTimer(true);
  // check and count errors
  let errors = 0;
  if (input !== ref) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== ref[i]) errors++;
    }
  }
  errors ? inputTextEl.classList.add('error') : inputTextEl.classList.remove('error');
}

function endGame(text,ref) {
  console.log('ending game');
  // stop timer
  runTimer(false)
  // disable typing
  // calculate and show WPM
  // Show errors in input text
  // Show number/precentage of errors
  // add/change button to start new test

}

const handleInput = (ev) => {
  ev.preventDefault();
  const inputText = ev.target.value
  if (inputText.length === currentText.length) endGame(inputText, currentText);
  else processText(inputText,currentText);
  // console.log('count:', countWords(inputText));
  wordsEl.innerHTML = countWords(inputText);

}

let timeCounter = 0;
let isTimerRunning = 0;

const timerEl = document.getElementById("timer");
timerEl.innerHTML = secondsToString(timeCounter)
const wordsEl = document.getElementById("words");
wordsEl.innerHTML = 0;
const sampleTextEl = document.getElementById("test-text");
const currentText = selectText()
const inputTextEl = document.getElementById("input");
sampleTextEl.innerText = currentText;

inputTextEl.addEventListener('input',handleInput);
