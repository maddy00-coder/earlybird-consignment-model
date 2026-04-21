const express = require("express");
const { checkout, createOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.post("/checkout", checkout);

module.exports = router;
