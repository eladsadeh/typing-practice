import texts from './text.json' assert {type: 'json'};

const selectText = () => {
  const index = Math.floor(Math.random()*texts.length)
  return texts[index]
  };

const countWords = (text) => {
  return text.replace(/[-(\.|\,) *]/g,' ').trim().split(' ').length;
};

function secondsToString(time) {
	const minutes = Math.floor(time / 60);
	const seconds = minutes ? time % 60 : time;
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
		2, '0')}`;
}

function mistakesPercentage(input, ref) {
  const errors = input.split('').reduce((count, char, i) => char === ref[i]? count: count + 1,0);
  console.log('errors:',errors);
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

function showWordsPerMinutes(text) {
  const wpm = timeCounter
    ? countWords(text)/(timeCounter/60)
    : 0
  document.getElementById("wpm").innerText = wpm.toFixed(1); 
}

const processText = (input,ref) => {
  //start timer if not running already
  if (!isTimerRunning) runTimer(true);
  // check for errors and change background
  ref.slice(0,input.length) !== input 
    ? inputTextEl.classList.add('error') 
    : inputTextEl.classList.remove('error');
  wordsEl.innerHTML = countWords(input);
  showWordsPerMinutes(input)
  mistakesPercentage(input,ref)
  // const wpm = countWords(input)/(timeCounter/60);
  // document.getElementById("wpm").innerText = wpm;
}

function endGame(text,ref) {
  console.log('ending game');
  // stop timer
  runTimer(false)
  // disable typing
  inputTextEl.removeEventListener('input',handleInput);
  document.getElementById("input").readOnly = true;
  // calculate and show WPM
  showWordsPerMinutes(text)
  // const wpm = countWords(text)/(timeCounter/60);
  // document.getElementById("wpm").innerText = wpm;
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

}

let timeCounter = 0;
let isTimerRunning = 0;
showWordsPerMinutes("")
const timerEl = document.getElementById("timer");
timerEl.innerHTML = secondsToString(timeCounter)
const wordsEl = document.getElementById("words");
wordsEl.innerHTML = 0;
const messageEl = document.getElementById("message");
messageEl.innerHTML = 'Start typing to begin';
const sampleTextEl = document.getElementById("test-text");
const currentText = selectText()
const inputTextEl = document.getElementById("input");
sampleTextEl.innerText = currentText;

inputTextEl.addEventListener('input',handleInput);
