// ================= CART SYSTEM =================

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}


// Update cart number everywhere
function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}


// Add product from homepage
function addToCart(name, price) {

    let cart = getCart();

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity) + 1;

    } else {

        cart.push({
            id: Date.now(),
            name: name,
            price: Number(price),
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");
}


// Update when page loads
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});