document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        window.location.href = "shop.html";
        return;
    }

    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");
    const placeOrderButton = document.getElementById("place-order-btn");

    if (!checkoutItems || !checkoutTotal || !placeOrderButton) {
        return;
    }

    let total = 0;
    const deliveryFees = {
    Lagos: 10,
    Ogun: 15,
    Oyo: 18,
    "FCT Abuja": 20,
    Rivers: 22,
    Kano: 25,
    default: 30
};

let shippingFee = 0;

const stateSelect = document.getElementById("customer-state");

stateSelect.addEventListener("change", () => {

    shippingFee = deliveryFees[stateSelect.value] || deliveryFees.default;

    document.getElementById("delivery-fee").textContent = shippingFee;

    checkoutTotal.textContent = total + shippingFee;

});

    cart.forEach((item) => {
        total += item.price * item.quantity;

        checkoutItems.innerHTML += `
            <div class="summary-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${item.price * item.quantity}</span>
            </div>
        `;
    });

    document.getElementById("subtotal").textContent = total;
    document.getElementById("delivery-fee").textContent = shippingFee;
    checkoutTotal.textContent = total + shippingFee;

    placeOrderButton.addEventListener("click", () => {

    const name = document.getElementById("customer-name").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const city = document.getElementById("customer-city").value.trim();
    const state = document.getElementById("customer-state").value;

    const payment = document.querySelector('input[name="payment"]:checked').value;

    // Validate Name
    if (name.length < 3 || !/^[a-zA-Z\s]+$/.test(name)) {
        alert("Please enter a valid full name.");
        return;
    }

    // Validate Email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate Phone
    if (!/^[0-9]{10,15}$/.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    // Required fields
    if (!address || !city || !state) {
        alert("Please complete all required fields.");
        return;
    }

    // Payment Methods
    if (payment === "paypal") {
        alert("PayPal payments are coming soon.");
        return;
    }

    if (payment === "card") {
        alert("Card payments are coming soon.");
        return;
    }

    if (payment === "bank") {
        alert(
`Bank Transfer

Bank: Kyvora Bank

Account Name:
KYVORA TECHNOLOGIES

Account Number:
1234567890

Your order will be confirmed after payment.`
        );
    }

    // Save customer information
    localStorage.setItem("customerName", name);
    localStorage.setItem("customerEmail", email);
    localStorage.setItem("customerPhone", phone);
    localStorage.setItem("customerAddress", address);
    localStorage.setItem("customerCity", city);
    localStorage.setItem("customerState", state);

    localStorage.removeItem("cart");

    window.location.href = "success.html";

});

});
