window.onload = function() {
    const generatedImage = localStorage.getItem("generatedImage");
    if (generatedImage) {
        const imageCard = document.getElementById('image-card');
        imageCard.style.visibility = 'visible';
        const cardImg = imageCard.querySelector('.cardImage');
        cardImg.src = generatedImage;
    } else {
        const memorizationText = "example prompt";
        generateImage(memorizationText);
    }
}

function generateImage(memorizationText) {
    console.log(memorizationText);

    const apiKey = tempKey;
    const endpointUrl = "https://api.openai.com/v1/images/generations";

    fetch(endpointUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            "model": "image-alpha-001",
            "prompt": memorizationText,
            "num_images": 1,
            "size": "256x256",
        }),
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const imageUrl = result.data[0].url;
        const cardImg = document.querySelector('.cardImage');
        cardImg.src = imageUrl;
        localStorage.setItem("generatedImage", imageUrl);
    })
    .catch(error => console.error(error));
}
