var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function createHomePageProductCard(obj) {

  var mainDiv = document.createElement('div');
  mainDiv.classList.add('product-card');

  var productLink = document.createElement('a');
  productLink.href = '/product/details.html?p=' + obj.id;

  var productImage = document.createElement('img');
  productImage.classList.add('product-image');
  productImage.src = obj.preview;
  productImage.alt = obj.name + ' Pic';

  productLink.appendChild(productImage);

  var innerDiv = document.createElement('div');
  innerDiv.classList.add('product-meta');

  var productName = document.createElement('h4');
  var productNameText = document.createTextNode(obj.name);
  productName.appendChild(productNameText);

  var productBrand = document.createElement('h5');
  var productBrandText = document.createTextNode(obj.brand);
  productBrand.appendChild(productBrandText);

  var productPrice = document.createElement('p');
  var productPriceText = document.createTextNode('Rs ' + obj.price);
  productPrice.appendChild(productPriceText);

  innerDiv.appendChild(productName);
  innerDiv.appendChild(productBrand);
  innerDiv.appendChild(productPrice);

  mainDiv.appendChild(productLink);
  mainDiv.appendChild(innerDiv);

  return mainDiv;
}

var clothingList = document.getElementById('clothing-grid');
var accessoryList = document.getElementById('accessory-grid');

function getData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
  // const productCard = document.createElement('div');
  // const productImage = document.createElement('a');
  // const productData = document.createElement('div');


  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === xhr.DONE) {

      const response = JSON.parse(this.response);
      // console.log(response);
      for (var i = 0; i < response.length; i++) {
        if (response[i].isAccessory) {
          accessoryList.append(createHomePageProductCard(response[i]))
        }
        else {
          clothingList.append(createHomePageProductCard(response[i]))
        }
      }
    }
  }
  xhr.send();
}

getData();
