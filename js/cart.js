// ================= CART =================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ================= SAVE CART =================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ================= DISPLAY CART =================

function displayCart() {

    const cart = getCart();

    const cartContainer =
        document.getElementById("cart-items");

    const itemCount =
        document.getElementById("cart-item-count");

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const totalElement =
        document.getElementById("cart-total");


    if (!cartContainer) return;


    cartContainer.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Add some products to your cart
                    and they will appear here.
                </p>

                <a
                    href="products.html"
                    class="btn primary-btn"
                >
                    Start Shopping
                </a>

            </div>

        `;


        itemCount.textContent = "0 items";

        subtotalElement.textContent = "₹0";

        totalElement.textContent = "₹0";

        return;
    }


    // DISPLAY PRODUCTS

    let subtotal = 0;

    let totalItems = 0;


    cart.forEach((item, index) => {

        const quantity =
            Number(item.quantity);


        const price =
            Number(item.price);


        const itemTotal =
            price * quantity;


        subtotal += itemTotal;

        totalItems += quantity;


        cartContainer.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-icon">
                    🛍️
                </div>


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${price} each
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>

                    <span>
                        ${quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>


                <strong class="item-total">
                    ₹${itemTotal}
                </strong>


                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    🗑️
                </button>

            </div>

        `;

    });


    const delivery = 40;

    const total = subtotal + delivery;


    itemCount.textContent =
        `${totalItems} items`;


    subtotalElement.textContent =
        `₹${subtotal}`;


    totalElement.textContent =
        `₹${total}`;

}


// ================= INCREASE =================

function increaseQuantity(index) {

    const cart = getCart();


    cart[index].quantity =
        Number(cart[index].quantity) + 1;


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ================= DECREASE =================

function decreaseQuantity(index) {

    const cart = getCart();


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ================= REMOVE =================

function removeItem(index) {

    const cart = getCart();


    cart.splice(index, 1);


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ================= INITIALIZE =================

displayCart();

updateCartCount();