const crypto = require("crypto");
const Order = require("../models/Order");

function normalizeCategory(name = "") {
  const value = name.toLowerCase();

  if (value.includes("coffee") || value.includes("dry") || value.includes("chocolate")) {
    return "Groceries";
  }

  if (value.includes("soap") || value.includes("cream") || value.includes("lipstick") || value.includes("perfume")) {
    return "Beauty";
  }

  if (value.includes("watch") || value.includes("bag") || value.includes("shoe")) {
    return "Fashion";
  }

  return "Essentials";
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch orders right now." });
  }
}

async function createOrder(req, res) {
  try {
    const {
      userId,
      productName,
      quantity = 1,
      price,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      status = "Pending",
      notes = "",
    } = req.body;

    if (!productName?.trim() || !customerName?.trim() || !customerEmail?.trim()) {
      return res.status(400).json({ message: "Product, customer name, and email are required." });
    }

    const numericPrice = Number(price);
    const numericQuantity = Number(quantity) || 1;

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ message: "Please provide a valid price." });
    }

    const order = await Order.create({
      userId: userId || null,
      productName: productName.trim(),
      category: normalizeCategory(productName),
      quantity: numericQuantity,
      price: numericPrice,
      total: numericPrice * numericQuantity,
      status,
      customerName: customerName.trim(),
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone: customerPhone?.trim() || "",
      shippingAddress: shippingAddress?.trim() || "",
      notes: notes?.trim() || "",
      orderGroup: crypto.randomUUID(),
    });

    return res.status(201).json({
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create the order right now." });
  }
}

async function checkout(req, res) {
  try {
    const { userId, customerName, customerEmail, customerPhone, shippingAddress, notes, items } = req.body;

    if (!customerName?.trim() || !customerEmail?.trim() || !shippingAddress?.trim()) {
      return res.status(400).json({ message: "Please complete the checkout details." });
    }

    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const orderGroup = crypto.randomUUID();
    const preparedOrders = items.map((item) => {
      const quantity = Number(item.qty || item.quantity || 1) || 1;
      const price = Number(item.price);

      if (!item.name?.trim() || !Number.isFinite(price) || price <= 0) {
        throw new Error("One or more cart items are invalid.");
      }

      return {
        userId: userId || null,
        orderGroup,
        productName: item.name.trim(),
        category: normalizeCategory(item.name),
        quantity,
        price,
        total: price * quantity,
        status: "Pending",
        customerName: customerName.trim(),
        customerEmail: customerEmail.toLowerCase().trim(),
        customerPhone: customerPhone?.trim() || "",
        shippingAddress: shippingAddress.trim(),
        notes: notes?.trim() || "",
      };
    });

    const createdOrders = await Order.insertMany(preparedOrders);

    return res.status(201).json({
      message: "Checkout completed successfully.",
      orderGroup,
      orders: createdOrders,
    });
  } catch (error) {
    if (error.message === "One or more cart items are invalid.") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Unable to complete checkout right now." });
  }
}

module.exports = {
  checkout,
  createOrder,
  getOrders,
};
