// Get the input field and text element from the HTML document
const inputField = document.getElementById('input-field');
let text = document.getElementById('text');

// If the text element exists, process the text
if (text) {
  // Convert the text to lower case, remove punctuation, and split it into an array of words
  text = text.textContent.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
}

// Initialize variables to track score, current word index, and current word
let score = 0;
const textArray = text.filter(emptyWord => emptyWord !== '');
let currentWordIndex = 0;
let currentWord = textArray[currentWordIndex];

// Set the value of the input field to an empty string and give it focus
inputField.value = '';
inputField.focus();

// Add an event listener for when a key is pressed in the input field
inputField.addEventListener('keydown', (event) => {
  // If the key pressed is the spacebar, prevent the default behavior and continue
  if (event.key === ' ') {
    event.preventDefault();

    // Get the user's input, trim it, and convert it to lower case
    const userInput = inputField.value.trim().toLowerCase();

    // If the user entered the correct word, increment the score and move to the next word
    if (userInput === currentWord) {
      score++;
      currentWordIndex++;

      // Add the previous word to the "correct words" display element
      const previousWord = textArray[currentWordIndex - 1];
      const correctWords = document.getElementById('correctWords');
      correctWords.textContent += previousWord + ' ';

      // If there are still more words, move to the next one and clear the input field
      if (currentWordIndex < textArray.length) {
        currentWord = textArray[currentWordIndex];
        inputField.value = '';
      } else {
        // If there are no more words, display the final score in a modal dialog
        inputField.value = '';
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
        const finalScore = document.getElementById('finalScore');
        finalScore.textContent = 'Final Score: ' + score;

        // Add event listeners to the "Practice Again" and "My Texts" buttons in the modal dialog
        const practiceAgainButton = modal.querySelector('.btn-primary');
        score = 0;
        currentWordIndex = 0;
        practiceAgainButton.addEventListener('click', () => {
          correctWords.textContent += '';
          inputField.value = '';
          modal.style.display = 'none';
          location.reload();
          inputField.focus();
        });
        const playAgainButton = modal.querySelector('.btn-secondary');
        playAgainButton.addEventListener('click', () => {
          window.location.href = '/';
        });
      }
    } else {
      // If the user entered the wrong word, decrement the score and flash the input field red
      score--;
      inputField.style.backgroundColor = 'red';
      setTimeout(() => {
        inputField.style.backgroundColor = '';
      }, 500);
    }

    // Update the score display and clear the input field
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = score;
    inputField.value = '';
  }
});
