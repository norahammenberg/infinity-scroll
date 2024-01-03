//variables geting info from the HTML to display the images. 
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

//global variable
let ready = false; //used to check if all images are loaded. 
let imagesLoaded = 0; // this will count up everytime an images i loaded. 
let totalImages = 0;// keeping track that all are loaded .
let initialCount = 5;
let updatedCount = 0;
//an empty array for saving the API fetch in. 
let photosArray = [];

//Unsplash API
const apiKey = config.apiKey;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

//function that updates the URL and change the image count:
function urlUpdate() {
    if ( initialCount === 5 ) {
        //update the updated count to 30
        updatedCount = 30;
        //update the URL to use the new variable of 30 imageses to fetch in one go. 
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${updatedCount}`;
    }
}
// checks if the ALL image are loaded. 
function imageLoader() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        //all images are loaded:
         ready = true;
         //hid the loader:
         loader.hidden = true;
    }
}

//helperfunction for the setAttribute to create none repatitive code. 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create elements for links and photos and adding it to the DOM.
function displayPhotos() {
    //making the varaible totalimages the same length as the array:
    totalImages = photosArray.length;
    imagesLoaded = 0;
    //looping through the images
    photosArray.forEach((photo) => {
        //Create an <a> to link to unsplach.
        const item = document.createElement('a');

        //calling the setAttributeS function and passing the parameters:
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create <img> for photo:
        const image = document.createElement('img');
        
        //calling the setAttributeS function and passing the parameters:
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //event listner, check when each image is loaded. when use the 
        image.addEventListener('load', imageLoader);

        item.appendChild(image);//we append the image to  the <a>
        imageContainer.appendChild(item);//we append the <a> to the imagecontainer
    });
}

//get photos from Unspash API.
async function getPhotos() {
    try {
        const response = await fetch(apiURL); 
        photosArray = await response.json();// saving the json data in a GLOBAL array, its a let because the infor will change in the array. 
        //displaying the photos:
        displayPhotos();
    } catch(error) {
        //catch the error
    }
    //update URL.
    urlUpdate();
};

//Checking if the scroll is near the bottom of the page.
window.addEventListener('scroll', () => {

    if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)  {
        //is images loading changed to false. 
        ready = false;
        //getting photos from the API and displaying photos again.
        getPhotos(); 
    }
});

//on load of the browser
getPhotos();