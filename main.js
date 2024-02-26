//Menu section

document.querySelector("#open-nav-menu").addEventListener(
    "click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
});

document.querySelector("#close-nav-menu").addEventListener(
    "click",function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
});

//Greeting Section

const greetingText = "Good Morning!";
const weatherCondition = "sunny";
const userLocation = "Hamburg";
let temperature = 25;

let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside.`;
let fahrenheitText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahrenheit(temperature).toFixed(1)}°F outside.`;

document.querySelector("#greeting").innerHTML = greetingText;
document.querySelector("#weather").innerHTML = celsiusText;

function celsiusToFahrenheit(temperature){
    let fahrenheit = (temperature * (9/5)) + 32;
    return fahrenheit;
}

document.querySelector(".weather-group").addEventListener(
    "click", function (event) {
        let weatherElement = document.querySelector("#weather");
        let id = event.target.id;

        if(id == "celsius"){
            weatherElement.innerHTML = celsiusText;
        }else if(id == "fahr"){
            weatherElement.innerHTML = fahrenheitText;
        }
    }
);

setInterval(function(){
    let localTime = new Date();

    document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0");
}, 1000);

const galleryImages = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
];

let mainImage = document.querySelector("#gallery > img");
let thumbnails = document.querySelector("#gallery .thumbnails");

mainImage.src = galleryImages[0].src;
mainImage.alt = galleryImages[0].alt;

galleryImages.forEach(function(img, index){
    let t = document.createElement("img");
    t.src = img.src;
    t.alt = img.alt;   
    t.dataset.arrayIndex = index;
    t.dataset.selected = index === 0;

    t.addEventListener("click", function(event){
        let selectedIndex = event.target.dataset.arrayIndex;
        let selectedImage = galleryImages[selectedIndex];
        mainImage.src = selectedImage.src;
        mainImage.alt = selectedImage.alt;

        thumbnails.querySelectorAll("img").forEach(function(image){
            image.dataset.selected = false;
        });
        event.target.dataset.selected = true;
    });

    thumbnails.appendChild(t);
});

