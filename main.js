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

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]

function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener(
        "click", function () {
            document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    
    document.querySelector("#close-nav-menu").addEventListener(
        "click",function () {
            document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

function greetingHandler(){
    let currentHour = new Date().getHours();
    let greetingText;

    if (currentHour < 12){
        greetingText = "Good morning!";
    }else if(currentHour < 18){
        greetingText = "Good afternoon!";
    }else if(currentHour < 24){
        greetingText = "Good evening!";
    }else{
        greetingText = "Welcome!"
    }


    const weatherCondition = "sunny";
    const userLocation = "Hamburg";
    let temperature = 25;

    let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside.`;
    let fahrenheitText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahrenheit(temperature).toFixed(1)}°F outside.`;

    document.querySelector("#greeting").innerHTML = greetingText;
    document.querySelector("#weather").innerHTML = celsiusText;

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
}

function celsiusToFahrenheit(temperature){
    let fahrenheit = (temperature * (9/5)) + 32;
    return fahrenheit;
}

function clockHandler(){
    setInterval(function(){
        let localTime = new Date();
    
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0");
    }, 1000);
}

function galleryHandler(){
    
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
}

function productsHandler(){
    
    let freeProducts = products.filter(function(p){
        return !p.price || p.price <= 0;
    });

    let paidProducts = products.filter(function(p){
        return p.price > 0;
    });

    populateProducts(products);

    document.querySelector(".products-filter label[for=all] .product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] .product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] .product-amount").textContent = freeProducts.length;

    let productsFilter = document.querySelector(".products-filter");

    productsFilter.addEventListener("click", function(event){
        if (event.target.id === "all"){
            populateProducts(products);
        }else if(event.target.id === "paid"){
            populateProducts(paidProducts);
        }else if (event.target.id === "free"){
            populateProducts(freeProducts);
        }
    });
}

function populateProducts(productList){

    let productSection = document.querySelector(".products-area");

    productSection.textContent = "";
    
    productList.forEach(function(product){
        let productElement = document.createElement("div");
        productElement.classList.add("product-item");

        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image of: " + product.title;

        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";
        

        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);

        productElement.append(productImage);
        productElement.append(productDetails);

        productSection.append(productElement);
        
    });

}

menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();

