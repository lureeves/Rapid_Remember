const inputField = document.getElementById('input-field');
let text = document.getElementById('text');
if (text) {
  text = text.textContent.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
}
let score = 0; // Tracks how few helps user needed, higher is better
const textArray = text.filter(emptyWord => emptyWord !== '') // Removes empty elements
let currentWordIndex = 0;
let currentWord = textArray[currentWordIndex];
inputField.value = '';
inputField.focus();

let correctWordsArray = []; // an array to keep track of the correct words entered so far

inputField.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        event.preventDefault(); // prevent default spacebar behavior
        const userInput = inputField.value.trim().toLowerCase();

        // Increment/decrement if the word entered is the next in the sequence
        if (userInput === currentWord) {
            score++; // Increment the score
            currentWordIndex++;
            if (currentWordIndex < textArray.length) {
                currentWord = textArray[currentWordIndex];
                inputField.value = ''; // clear the input field
                // Add the previous word to the display
                const previousWord = textArray[currentWordIndex - 1];

                const correctWords = document.getElementById('correctWords')
                correctWords.textContent += previousWord + ' ';
            } else {
                // User finished the text

                window.location.href = '/'; // Redirect to home page
            }
        } else { // Wrong word entered
            score--; // Decrement score

            // flash the input field border red
            inputField.style.backgroundColor = 'red';
            setTimeout(() => {
                inputField.style.backgroundColor = '';
            }, 500); // set timeout to reset border color after 100 milliseconds
        }
        const scoreDisplay = document.getElementById('score');
        scoreDisplay.textContent = score; // Display the score
        inputField.value = '' // Clear input field
    }
});



