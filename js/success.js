document.addEventListener("DOMContentLoaded", () => {
    const customerName = localStorage.getItem("customerName");
    const thankYouMessage = document.getElementById("thank-you-message");
    const orderId = document.getElementById("order-id");

    if (customerName && thankYouMessage) {
        thankYouMessage.textContent = `Thank you, ${customerName}!`;
    }

    if (orderId) {
        const generatedOrderNumber = `KYV-${Math.floor(100000 + Math.random() * 900000)}`;
        orderId.textContent = `Order ID: ${generatedOrderNumber}`;
    }
});
