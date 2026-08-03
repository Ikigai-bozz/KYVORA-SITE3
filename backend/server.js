    const express = require("express");
    const cors = require("cors");
    const fs = require("fs");
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

    // Read existing orders
    const orders = JSON.parse(
    fs.readFileSync("orders.json", "utf8")
    );

    console.log("New Order Received:");
    console.log(order);

    const orderId = `KYV-${Date.now()}`;

    const newOrder = {
    orderId,
    ...order,
    createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);

    fs.writeFileSync(
    "orders.json",
    JSON.stringify(orders, null, 2)
    );

    res.json({
        success: true,
        message: "Order received successfully!",
        orderId: orderId
    });

    });

    app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    });