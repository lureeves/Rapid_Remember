/**
 * Generates an image using OpenAI's image-generation API and displays it in the DOM.
 * @param {string} memorizationText - The text prompt for generating the image.
 */
function generateImage(memorizationText) {
    console.log(memorizationText); // Logs the memorization text to the console.

    // Gets the image card element from the DOM and sets its visibility to visible.
    const imageCard = document.getElementById('image-card');
    imageCard.style.visibility = 'visible';

    // Gets the API key from a variable named 'tempKey'.
    const apiKey = tempKey;

    // Sets the endpoint URL for the OpenAI image-generation API.
    const endpointUrl = "https://api.openai.com/v1/images/generations";

    // Sends a POST request to the OpenAI image-generation API.
    fetch(endpointUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            "model": "image-alpha-001", // Specifies the image-generation model to use.
            "prompt": memorizationText, // Specifies the prompt text to use for generating the image.
            "num_images": 1, // Specifies the number of images to generate (in this case, 1).
            "size": "256x256", // Specifies the size of the generated image.
        }),
    })
    .then(response => response.json()) // Converts the response to JSON format.
    .then(result => {
        console.log(result); // Logs the API response to the console.
        const imageUrl = result.data[0].url; // Gets the URL of the generated image from the API response.
        const cardImg = imageCard.querySelector('.cardImage'); // Gets the image element from the image card.
        cardImg.src = imageUrl; // Sets the source of the image element to the generated image URL.
    })
    .catch(error => console.error(error)); // Logs any errors that occur during the API request to the console.
}
