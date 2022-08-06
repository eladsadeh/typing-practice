import texts from './text.json' assert {type: 'json'};

let timeCounter = 0;
let isTimerRunning = 0;

const selectText = () => {
  const index = Math.floor(Math.random()*texts.length)
  return texts[index]
  };

const countWords = (text) => {
  return text[text.length-1] === ' ' ? text.trim().split(/[\s-]/).length :
  text.trim().split(/[\s-]/).length-1};

const compareText = (input,ref) => {
  let complete = input.length === ref.length;
  let errors = 0;
  if (input !== ref) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== ref[i]) errors++;
    }
  }
  return {errors, complete}
}

function secondsToString(time) {
	const minutes = Math.floor(time / 60);
	const seconds = minutes ? time % 60 : time;
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
		2,
		'0'
	)}`;
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

const handleInput = (ev) => {
  ev.preventDefault();
  const inputText = ev.target.value
  const {errors, complete} = compareText(inputText,currentText);
  errors ? inputTextEl.classList.add('error') : inputTextEl.classList.remove('error');

  if (!isTimerRunning && !complete) runTimer(true);
  else if (isTimerRunning && complete) runTimer(false);
  // console.log('count:', countWords(inputText));
  wordsEl.innerHTML = countWords(inputText);

}

const timerEl = document.getElementById("timer");
timerEl.innerHTML = secondsToString(timeCounter)
const wordsEl = document.getElementById("words");
wordsEl.innerHTML = 0;
const sampleTextEl = document.getElementById("test-text");
const currentText = selectText()
const inputTextEl = document.getElementById("input");
sampleTextEl.innerText = currentText;

inputTextEl.addEventListener('input',handleInput);
