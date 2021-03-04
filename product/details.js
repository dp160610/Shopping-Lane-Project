var productId = window.location.search.split('=')[1];
var currentObj = null;

function createProductImages(url, pos) {
    var image = document.createElement('img');
    image.src = url

    if (pos === 0) {
        image.classList.add("active-image");
    }

    image.onclick = function () {
        document.querySelector('#product-images img').classList.remove("active-image")
        image.classList.add("active-image");
        document.getElementById('product-preview').src = url;
    }

    return image;
}

function getProductData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId, true);

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === xhr.DONE) {

            const data = JSON.parse(this.response);
            // console.log(data);
            document.getElementById('product-preview').src = data.preview;
            document.getElementById('product-title').innerHTML = data.name;
            document.getElementById('product-brand').innerHTML = data.brand;
            document.getElementById('description').innerHTML = data.description;
            document.getElementById('product-price').innerHTML = data.price;

            for (var i = 0; i < data.photos.length; i++) {
                document.getElementById('product-images').append(createProductImages(data.photos[i], i));
            }
            const addCartButton = document.getElementById('btn-add-to-cart');
            addCartButton.onclick = function () {
                addCartButton.classList.add('bigger');
                setTimeout(function () {
                    addCartButton.classList.remove('bigger');
                }, 200)

                var productList = window.localStorage.getItem('product-list');
                productList = productList === null || productList === '' ? [] : productList;
                productList = productList.length > 0 ? JSON.parse(productList) : [];

                // productList.push(currentObj);
                // window.localStorage.setItem('product-list', JSON.stringify(productList));
                console.log(productList);

                var foundAtPos = -1;
                for (var i = 0; i < productList.length; i++) {
                    // console.log(productList[i].id);
                    if (parseInt(productList[i].id) == parseInt(data.id)) {
                        foundAtPos = i;
                    }
                }

                if (foundAtPos > -1) {
                    productList[foundAtPos].count = productList[foundAtPos].count + 1;
                    console.log(productList[foundAtPos].count);
                    window.localStorage.setItem('product-list', JSON.stringify(productList));
                } else {
                    data.count = 1;
                    productList.push(data);
                    console.log(productList);
                    window.localStorage.setItem('product-list', JSON.stringify(productList));
                }

                var totalCount = 0;
                for (var i = 0; i < productList.length; i++) {
                    totalCount = totalCount + productList[i].count;
                }

                document.getElementById('cart-count').innerHTML = totalCount;
            }
        }
    }
    xhr.send();
}
getProductData();

