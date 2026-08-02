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
    const shippingFee = 10;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        checkoutItems.innerHTML += `
            <div class="summary-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${item.price * item.quantity}</span>
            </div>
        `;
    });

    checkoutTotal.textContent = total + shippingFee;

    placeOrderButton.addEventListener("click", () => {
        const name = document.getElementById("customer-name").value.trim();
        const email = document.getElementById("customer-email").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const address = document.getElementById("customer-address").value.trim();

        if (!name || !email || !phone || !address) {
            alert("Please complete all fields.");
            return;
        }

        localStorage.setItem("customerName", name);
        localStorage.removeItem("cart");
        window.location.href = "success.html";
    });
});
