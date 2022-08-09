# Typing test application

## Description
The app starts by presenting a random sample text in the upper pane. To start the test, just start typing in the lower text area pane. The timer will start counting time once the user start typing.

The application will present the following real-time information:

- Time elapsed
- Number of words typed and total number of words in sample text.
- Words per minute
- Accuracy: precent of correct characters typed.
- Accuracy: number of correct characters and total characters typed.

When the test end (user typed the same numbers of charcters as in sample text), The app will highlight the typing errors with red highlight at the bottom pane.

## Interaction
There are two buttons and a checkbox below the bottom pane:

- `ReStart` button: Restart the test with the same sample text.
- `New Test` button: Start new test with randomly selected text.
- `Highlight Errors` checkbox: When checked, if the typed in text contain any errors, the background of the lower pane will turn reddish, to indicate that there are errors.

## Comments

- Sample texts are selected randomly from `texts.json`. If you want to use other texts, just edit the `texts.json` file.
- I followed camel case convention used in JavaScript.
- The application is deployed at https://eladsadeh.github.io/typing-practice/