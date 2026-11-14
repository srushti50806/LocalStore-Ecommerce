const products = [

    {
        id: 1,
        name: "Fresh Apples",
        category: "Fruits",
        price: 120,
        rating: 5,
        description: "Fresh and juicy premium quality apples.",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 2,
        name: "Fresh Bananas",
        category: "Fruits",
        price: 60,
        rating: 4,
        description: "Naturally sweet and fresh bananas.",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 3,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        price: 40,
        rating: 5,
        description: "Farm fresh red tomatoes.",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 4,
        name: "Fresh Broccoli",
        category: "Vegetables",
        price: 80,
        rating: 5,
        description: "Fresh green broccoli packed with nutrients.",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 5,
        name: "Fresh Milk",
        category: "Dairy",
        price: 60,
        rating: 5,
        description: "Pure and fresh dairy milk.",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 6,
        name: "Cheddar Cheese",
        category: "Dairy",
        price: 180,
        rating: 4,
        description: "Creamy and delicious cheddar cheese.",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 7,
        name: "Fresh Bread",
        category: "Bakery",
        price: 45,
        rating: 4,
        description: "Soft and freshly baked bread.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 8,
        name: "Chocolate Cake",
        category: "Bakery",
        price: 350,
        rating: 5,
        description: "Rich and delicious chocolate cake.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 9,
        name: "Orange Juice",
        category: "Beverages",
        price: 90,
        rating: 4,
        description: "Refreshing natural orange juice.",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 10,
        name: "Cold Coffee",
        category: "Beverages",
        price: 110,
        rating: 5,
        description: "Refreshing chilled coffee drink.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 11,
        name: "Premium Rice",
        category: "Groceries",
        price: 80,
        rating: 5,
        description: "High quality premium rice.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 12,
        name: "Wheat Flour",
        category: "Groceries",
        price: 55,
        rating: 4,
        description: "High quality wheat flour for everyday cooking.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
    }

];


// ======================================================
// PRODUCT DISPLAY
// ======================================================

let displayedProducts = [...products];


function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");

    if (!container) {
        console.log("Product container not found!");
        return;
    }

    container.innerHTML = "";


    const productCount =
        document.getElementById("productCount");


    if (productCount) {

        productCount.textContent =
            `Showing ${productList.length} products`;

    }


    if (productList.length === 0) {

        container.innerHTML = `

            <div class="no-products">

                <div>🔍</div>

                <h2>
                    No products found
                </h2>

                <p>
                    Try searching for something else.
                </p>

            </div>

        `;

        return;
    }


    productList.forEach(product => {

        const stars =
            "⭐".repeat(product.rating);


        const productCard =
            document.createElement("div");


        productCard.className =
            "product-card";


        productCard.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.description}
                </p>


                <div class="rating">
                    ${stars}
                </div>


                <div class="product-bottom">

                    <strong>
                        ₹${product.price}
                    </strong>


                    <div class="product-actions">

                        <button
                            type="button"
                            class="view-details-btn"
                            onclick="viewProduct(${product.id})"
                        >
                            View Details
                        </button>


                        <button
                            type="button"
                            class="add-product-btn"
                        >
                            + Add
                        </button>

                    </div>

                </div>

            </div>

        `;


        // Add button functionality

        const addButton =
            productCard.querySelector(
                ".add-product-btn"
            );


        addButton.addEventListener(
            "click",
            function () {

                addProductToCart(product.id);

            }
        );


        container.appendChild(productCard);

    });

}


// ======================================================
// VIEW PRODUCT DETAILS
// ======================================================

function viewProduct(productId) {

    window.location.href =
        `product-details.html?id=${productId}`;

}


// ======================================================
// CART
// ======================================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ======================================================
// ADD PRODUCT TO CART
// ======================================================

function addProductToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    let cart = getCart();


    const existingProduct =
        cart.find(
            item =>
                Number(item.id) ===
                Number(product.id)
        );


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        `${product.name} added to cart!`
    );

}


// ======================================================
// UPDATE CART COUNT
// ======================================================

function updateCartCount() {

    const cart = getCart();


    const totalItems =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(item.quantity || 0);

            },
            0
        );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }

}


// ======================================================
// SEARCH
// ======================================================

function searchProducts() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {
        return;
    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    displayedProducts =
        products.filter(product => {

            const name =
                product.name.toLowerCase();


            const category =
                product.category.toLowerCase();


            const description =
                product.description.toLowerCase();


            return (
                name.includes(search) ||
                category.includes(search) ||
                description.includes(search)
            );

        });


    displayProducts(
        displayedProducts
    );

}


// ======================================================
// FILTER
// ======================================================

function filterProducts() {

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (!categoryFilter) {
        return;
    }


    const category =
        categoryFilter.value;


    if (category === "all") {

        displayedProducts =
            [...products];

    } else {

        displayedProducts =
            products.filter(
                product =>
                    product.category === category
            );

    }


    displayProducts(
        displayedProducts
    );

}


// ======================================================
// SORT
// ======================================================

function sortProducts() {

    const sortFilter =
        document.getElementById(
            "sortFilter"
        );


    if (!sortFilter) {
        return;
    }


    const sort =
        sortFilter.value;


    if (sort === "low") {

        displayedProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    else if (sort === "high") {

        displayedProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    else if (sort === "rating") {

        displayedProducts.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    else {

        displayedProducts =
            [...products];

    }


    displayProducts(
        displayedProducts
    );

}


// ======================================================
// CATEGORY FROM URL
// ======================================================

function loadCategoryFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get("category");


    if (!category) {
        return;
    }


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (!categoryFilter) {
        return;
    }


    categoryFilter.value =
        category;


    filterProducts();

}


// ======================================================
// SEARCH EVENT
// ======================================================

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        searchProducts
    );

}


// ======================================================
// INITIALIZE
// ======================================================

displayProducts(products);

updateCartCount();

loadCategoryFromURL();