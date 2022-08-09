import texts from './text.json' assert {type: 'json'};

// select random sample text from array
const selectText = () => {
  const index = Math.floor(Math.random()*texts.length)
  return texts[index]
  };

// return number of words in text
const countWords = (text) => {
  return text.replace(/[-(\.|\,) *]/g,' ').trim().split(' ').length;
};

// return strin in format 'MM:SS' from time in seconds
function secondsToString(time) {
	const minutes = Math.floor(time / 60);
	const seconds = minutes ? time % 60 : time;
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
		2, '0')}`;
}

// calulate accuracy of typed input against reference
function calcAccuracy(input, ref) {
  const total = input.length;
  if (total === 0) return { errors: 0, accuracy: 100}
  const errors = input.split('').reduce((count, char, i) => char === ref[i]? count: count + 1,0);
  const accuracy = 100*(total - errors) / total;
  return {errors, accuracy}
}

// return HTML element to show the user errors
function showErrors(input,ref) {
  const element = document.createElement('div');
  element.id = "test-results";
  element.className ="text";
  for (let i = 0; i < input.length; i++) {
    if (input[i] === ref[i]) element.insertAdjacentHTML('beforeend', input[i])
    else element.insertAdjacentHTML('beforeend', `<span class="mistake">${input[i]}</span>`);
  }
  return element;
}

// create and return 'textarea' element
function createInputEl() {
  const textarea = document.createElement('textarea');
  textarea.id = "input";
  textarea.placeholder = "Start typing to begin test";
  textarea.className = "text";
  textarea.autofocus = true;
  return textarea;
}

// Main function to run the app. 
function runTest() {
  // start/stop timer
  function runTimer(run) {
    if (run) {
      isTimerRunning = setInterval(() => {
        timerEl.innerHTML = secondsToString(++timeCounter);
      }, 1000);
    } else {
      clearInterval(isTimerRunning);
      isTimerRunning = 0;
      timeCounter = 0;
    }
  }
  // return words per minutes.
  function wordsPerMinutes(text) {
    const wpm = timeCounter
      ? countWords(text)/(timeCounter/60)
      : 0
    return wpm;
  }
  // process the input text while typing
  const processText = (input,ref) => {
    //start timer if not running already
    if (!isTimerRunning) runTimer(true);
    if (isTimerRunning) messageEl.innerText = 'Good luck';
    // check for errors and change background
    if (highlightError) {
      ref.slice(0,input.length) !== input 
      ? inputTextEl.classList.add('error') 
      : inputTextEl.classList.remove('error');
    }
    // update status indicators (words typed/WPM/Accuracy)
    wordsEl.innerText = `${countWords(input)} / ${wordsCount}`;
    wpmEl.innerText = wordsPerMinutes(input).toFixed(1); 
    const {errors, accuracy} = calcAccuracy(input,ref);
    accuDetailEl.innerText = `${input.length - errors} / ${input.length}`;
    accuracyEl.innerText = `${accuracy.toFixed(1)}%`;
  }
  // test end procedure
  function endTest(text,ref) {
    messageEl.innerText = "Test Ended"
    // stop timer
    runTimer(false)
    // remove input element and show the errors
    inputTextEl.remove();
    const testResultsEl = showErrors(text,ref)
    document.getElementById('input-text').prepend(testResultsEl)
  }

  const handleInput = (ev) => {
    ev.preventDefault();
    const inputText = ev.target.value
    processText(inputText,sampleText);
    // end test if input length the same as sample text
    if (inputText.length === sampleText.length) endTest(inputText, sampleText);
  }

  function resetTest() {
    if (document.getElementById('test-results')) {
    // If preview test eneded, remove the results
      document.getElementById('test-results').remove()
    // and add the input texterea
      document.getElementById('input-text').prepend(inputTextEl)
    }
    // reset textarea
    inputTextEl.value = '';
    inputTextEl.classList.remove('error');
    // reset timer
    runTimer(false);
    // reset status indicators
    init();
  }
  // Set highlight error mode on/off
  function handleCheckbox(ev) {
    highlightError = ev.target.checked;
    if(!highlightError) inputTextEl.classList.remove('error');
  }
  // run new test
  function newTest() {
    // get new sample text
    sampleText = selectText();
    wordsCount = countWords(sampleText);
    document.getElementById("sample-text").innerText = sampleText;
    resetTest()
  }
  // Initialize status indicators
  function init() {
    timerEl.innerText = secondsToString(0)
    wordsEl.innerText = `0 / ${wordsCount}`;
    accuDetailEl.innerText = `0 / 0`;
    wpmEl.innerText = '0.0';
    accuracyEl.innerText = '100%'
    messageEl.innerText = 'Start typing to begin';
  }

  // "State" variables (enclosed inside 'runTest' function)
  let timeCounter = 0;
  let isTimerRunning = 0;
  let sampleText = selectText();
  let wordsCount = countWords(sampleText);
  let highlightError = false;
  // DOM elements to work with (status indicators)
  const timerEl = document.getElementById("timer");
  const wordsEl = document.getElementById("words");
  const messageEl = document.getElementById("message");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  const accuDetailEl = document.getElementById("accuracy-detail");
  // add the sample text
  document.getElementById("sample-text").innerText = sampleText;
  // create and add the textarea element
  const inputTextEl = createInputEl();
  document.getElementById('input-text').prepend(inputTextEl)
  // Event listeners
  inputTextEl.addEventListener('input',handleInput);
  document.getElementById('reset-btn').addEventListener('click', resetTest)
  document.getElementById('new-test').addEventListener('click', newTest)
  document.getElementById('highlight-error').addEventListener('change', handleCheckbox)
  // initialize status
  init()
}
// run the application
runTest();
