// ================= CHECKOUT =================

function getCheckoutCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ================= DISPLAY ORDER =================

function displayCheckout() {

    const cart = getCheckoutCart();

    const container =
        document.getElementById("checkout-items");

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const totalElement =
        document.getElementById("checkout-total");


    if (!container) return;


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `
            <p class="empty-checkout">
                Your cart is empty.
            </p>
        `;

        subtotalElement.textContent = "₹0";
        totalElement.textContent = "₹0";

        return;
    }


    let subtotal = 0;


    cart.forEach(item => {

        const quantity =
            Number(item.quantity);

        const price =
            Number(item.price);

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        container.innerHTML += `

            <div class="checkout-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <span>
                        × ${quantity}
                    </span>

                </div>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

        `;

    });


    const delivery = 40;

    const total = subtotal + delivery;


    subtotalElement.textContent =
        `₹${subtotal}`;

    totalElement.textContent =
        `₹${total}`;

}


// ================= PLACE ORDER =================

const checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const cart = getCheckoutCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add products first."
                );

                return;
            }


            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const city =
                document.getElementById("city").value.trim();

            const pincode =
                document.getElementById("pincode").value.trim();


            // Phone validation

            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            // Pincode validation

            if (!/^[0-9]{6}$/.test(pincode)) {

                alert(
                    "Please enter a valid 6-digit pincode."
                );

                return;
            }


            // Calculate total

            let subtotal = 0;


            cart.forEach(item => {

                subtotal +=
                    Number(item.price) *
                    Number(item.quantity);

            });


            const delivery = 40;

            const total = subtotal + delivery;


            // Generate order ID

            const orderId =
                "FM" +
                Date.now().toString().slice(-8);


            // Get payment method

            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                ).value;


            // Save order

            const order = {

                orderId: orderId,

                customer: {

                    name: name,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    pincode: pincode

                },

                paymentMethod: payment,

                items: cart,

                subtotal: subtotal,

                delivery: delivery,

                total: total,

                date: new Date().toLocaleString()

            };


            localStorage.setItem(
                "latestOrder",
                JSON.stringify(order)
            );


            // Clear cart

            localStorage.removeItem("cart");


            // Go to success page

            window.location.href =
                "order-success.html";

        }
    );

}


// Initialize

displayCheckout();

updateCartCount();