// Request a random image from Lorem Picsum API
function generateImage() {
    const imageCard = document.getElementById('image-card');
    imageCard.style.visibility = 'visible';
    
    fetch('https://picsum.photos/512/512')
        .then(response => {
            // Get the image URL from the response headers
            const imageUrl = response.url;
            // Set the source of the card's image to the URL
            const cardImg = imageCard.querySelector('.card-img-top');
            cardImg.src = imageUrl;
        })
        .catch(error => console.error(error));
}

