document.addEventListener("DOMContentLoaded", () => {

    const customerName = localStorage.getItem("customerName") || "Customer";
    const customerAddress = localStorage.getItem("customerAddress") || "";
    const customerCity = localStorage.getItem("customerCity") || "";
    const customerState = localStorage.getItem("customerState") || "";
    const paymentMethod = localStorage.getItem("paymentMethod") || "Cash on Delivery";

    const total = localStorage.getItem("orderTotal") || "0";

    document.getElementById("thank-you-message").textContent =
        `Thank you, ${customerName}! Your order has been received.`;

    const generatedOrderNumber =
        "KYV-" + new Date().getFullYear() + "-" +
        Math.floor(100000 + Math.random() * 900000);

    document.getElementById("order-id").textContent =
        `Order ID: ${generatedOrderNumber}`;

    document.getElementById("customer-name").textContent =
        customerName;

    document.getElementById("payment-method").textContent =
        paymentMethod;

    document.getElementById("delivery-address").textContent =
        `${customerAddress}, ${customerCity}, ${customerState}`;

    document.getElementById("order-total").textContent =
        total;

});