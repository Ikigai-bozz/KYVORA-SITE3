const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("🚀 Kyvora Backend is Running!");
});

// ===== CREATE ORDER API =====
app.post("/api/orders", (req, res) => {

    const order = req.body;

    console.log("New Order Received:");
    console.log(order);

    const orderId = `KYV-${Date.now()}`;

    res.json({
        success: true,
        message: "Order received successfully!",
        orderId: orderId
    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});