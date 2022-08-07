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

function calcAccuracy(input, ref) {
  const total = input.length;
  if (total === 0) return { errors: 0, accuracy: 100}
  const errors = input.split('').reduce((count, char, i) => char === ref[i]? count: count + 1,0);
  const accuracy = 100*(total - errors) / total;
  return {errors, accuracy}
}

function showErrors(input,ref) {
  let parser = new DOMParser();
  let html = '<div>';
  const errorsText = document.createElement('div');
  errorsText.classList.add("text")
  for (let i = 0; i < input.length; i++) {
    if (input[i] === ref[i]) errorsText.insertAdjacentHTML('beforeend', input[i])
    else errorsText.insertAdjacentHTML('beforeend', `<span class="mistake">${input[i]}</span>`)
    // else html += `<span class="mistake">${input[i]}</span>`
  }
  html += '</div>'
  // console.log('html:', html)
  // console.log(parser.parseFromString(html, 'text/html').body);
  return errorsText;
  
}
function runTimer(run) {
	if (run) {
		isTimerRunning = setInterval(() => {
			timerEl.innerHTML = secondsToString(++timeCounter);
		}, 1000);
	} else {
		clearInterval(isTimerRunning);
		isTimerRunning = 0;
	}
}

function wordsPerMinutes(text) {
  const wpm = timeCounter
    ? countWords(text)/(timeCounter/60)
    : 0
  return wpm;
}

const processText = (input,ref) => {
  //start timer if not running already
  if (!isTimerRunning) runTimer(true);
  // check for errors and change background
  ref.slice(0,input.length) !== input 
    ? inputTextEl.classList.add('error') 
    : inputTextEl.classList.remove('error');
  wordsEl.innerHTML = `${countWords(input)} / ${wordsCount}`;
  wpmEl.innerText = wordsPerMinutes(input).toFixed(1); 
  const {errors, accuracy} = calcAccuracy(input,ref);
  accuDetailEl.innerText = `${input.length - errors} / ${input.length}`;
  accuracyEl.innerText = `${Math.round(accuracy)}%`;
}

function endGame(text,ref) {
  messageEl.innerText = "Test Ended"
  // stop timer
  runTimer(false)
  // disable typing
  inputTextEl.removeEventListener('input',handleInput);
  const testResultsEl = showErrors(text,ref)
  inputTextEl.remove();
  document.getElementById('texts').appendChild(testResultsEl)
  inputTextEl.innerHTML = result;

}

const handleInput = (ev) => {
  ev.preventDefault();
  const inputText = ev.target.value
  processText(inputText,currentText);
  if (inputText.length === currentText.length) endGame(inputText, currentText);
}

const currentText = selectText();
const wordsCount = countWords(currentText);
let timeCounter = 0;
let isTimerRunning = 0;
// showWordsPerMinutes("")
const timerEl = document.getElementById("timer");
const wordsEl = document.getElementById("words");
const messageEl = document.getElementById("message");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const accuDetailEl = document.getElementById("accuracy-detail");
const inputTextEl = document.getElementById("input");

timerEl.innerText = secondsToString(timeCounter)
wordsEl.innerText = `0 / ${wordsCount}`;
accuDetailEl.innerText = `0 / ${wordsCount}`;
wpmEl.innerText = '0.0';
accuracyEl.innerText = '100%'
messageEl.innerText = 'Start typing to begin';
document.getElementById("test-text").innerText = currentText;

inputTextEl.addEventListener('input',handleInput);
