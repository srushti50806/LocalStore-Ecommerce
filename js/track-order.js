// ================= ORDER TRACKING =================

function getLatestOrder() {

    return JSON.parse(
        localStorage.getItem("latestOrder")
    );

}


// ================= TRACK ORDER =================

function trackOrder() {

    const input =
        document.getElementById("orderIdInput");

    const message =
        document.getElementById("tracking-message");

    const tracking =
        document.getElementById("orderTracking");


    const enteredId =
        input.value.trim().toUpperCase();


    if (enteredId === "") {

        message.textContent =
            "Please enter your Order ID.";

        message.className =
            "tracking-error";

        return;

    }


    const order =
        getLatestOrder();


    if (!order || order.orderId !== enteredId) {

        message.textContent =
            "Order not found. Please check your Order ID.";

        message.className =
            "tracking-error";

        tracking.innerHTML = "";

        return;

    }


    message.textContent =
        "Order found successfully!";

    message.className =
        "tracking-success";


    displayTracking(order);

}


// ================= DISPLAY TRACKING =================

function displayTracking(order) {

    const tracking =
        document.getElementById("orderTracking");


    tracking.innerHTML = `

        <div class="tracking-card">

            <div class="tracking-card-header">

                <div>

                    <span>
                        Order ID
                    </span>

                    <h2>
                        ${order.orderId}
                    </h2>

                </div>

                <div class="order-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ₹${order.total}
                    </strong>

                </div>

            </div>


            <div class="tracking-line">

                <div class="tracking-step active">

                    <div class="tracking-icon">
                        ✓
                    </div>

                    <strong>
                        Order Placed
                    </strong>

                    <span>
                        Order received
                    </span>

                </div>


                <div class="tracking-step active">

                    <div class="tracking-icon">
                        ✓
                    </div>

                    <strong>
                        Confirmed
                    </strong>

                    <span>
                        Order confirmed
                    </span>

                </div>


                <div class="tracking-step active">

                    <div class="tracking-icon">
                        ✓
                    </div>

                    <strong>
                        Preparing
                    </strong>

                    <span>
                        Being prepared
                    </span>

                </div>


                <div class="tracking-step">

                    <div class="tracking-icon">
                        4
                    </div>

                    <strong>
                        Out for Delivery
                    </strong>

                    <span>
                        Coming to you
                    </span>

                </div>


                <div class="tracking-step">

                    <div class="tracking-icon">
                        5
                    </div>

                    <strong>
                        Delivered
                    </strong>

                    <span>
                        Order delivered
                    </span>

                </div>

            </div>


            <div class="tracking-order-details">

                <h3>
                    Delivery Details
                </h3>

                <p>
                    <strong>Name:</strong>
                    ${order.customer.name}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${order.customer.address},
                    ${order.customer.city} -
                    ${order.customer.pincode}
                </p>

                <p>
                    <strong>Payment:</strong>
                    ${order.paymentMethod.toUpperCase()}
                </p>

            </div>


            <div class="tracking-products">

                <h3>
                    Ordered Products
                </h3>

                ${order.items.map(item => `

                    <div class="tracking-product">

                        <span>
                            ${item.name}
                            × ${item.quantity}
                        </span>

                        <strong>
                            ₹${item.price * item.quantity}
                        </strong>

                    </div>

                `).join("")}

            </div>

        </div>

    `;

}


// ================= INITIALIZE =================

updateCartCount();