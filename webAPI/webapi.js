const API_URL = 'https://fakestoreapi.com/products';

const productWrapper = document.querySelector('.productWrapper');

async function getProducts(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();

        console.log(products);

        displayProducts(products);

    } catch (error) {
        console.error(error);
        productWrapper.innerHTML = `
            <p>Sorry, we could not load the products.</p>
        `;
    }
}

function displayProducts(products) {

    productWrapper.innerHTML = '';

    products.forEach((product) => {

        const {
            title,
            description,
            price,
            category,
            image,
            rating
        } = product;

        productWrapper.innerHTML += `
            <div class="product">

                <img src="${image}" alt="${title}">

                <h2>${title}</h2>

                <p>${description}</p>

                <p>Category: ${category}</p>

                <p>Price: ₦${price}</p>

                <p>Rating: ${rating.rate}</p>

                <p>Availability: In Stock</p>

                <button>Add to Cart</button>

            </div>
        `;
    });
}

getProducts(API_URL);