import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
// import Subscription from "../models/Subscription.js";


// ========================================
// GET /api/payments
// Get all payments
// ========================================

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("subscription")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });

  } catch (error) {
    console.error("Failed to get payments:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// GET /api/payments/:id
// Get payment by ID
// ========================================

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("user", "name email")
      .populate("subscription");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });

  } catch (error) {
    console.error("Failed to get payment:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// POST /api/payments/create
// Create mock payment
// ========================================

export const createPayment = async (req, res) => {
  try {
    const { userId, planId, paymentMethod } = req.body;

    // Validate required fields
    if (!userId || !planId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "userId, planId and paymentMethod are required",
      });
    }


    // Check user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // Check plan
    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }


    // Validate payment method
    const allowedMethods = [
      "UPI",
      "Card",
      "NetBanking",
      "Wallet",
      "PayPal",
    ];

    if (!allowedMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }


    // Generate mock transaction ID
    const transactionId =
      "MOCK_TXN_" +
      Date.now() +
      "_" +
      Math.floor(Math.random() * 10000);


    // Create payment
    const payment = await Payment.create({
      user: userId,
      amount: plan.price,
      currency: "INR",
      paymentMethod,
      transactionId,
      paymentGateway: "MockGateway",
      paymentStatus: "Pending",
    });


    res.status(201).json({
      success: true,
      message: "Mock payment created successfully",
      data: {
        paymentId: payment._id,
        transactionId: payment.transactionId,
        amount: payment.amount,
        currency: payment.currency,
        paymentMethod: payment.paymentMethod,
        paymentStatus: payment.paymentStatus,
        planId: plan._id,
        planName: plan.name,
      },
    });

  } catch (error) {
    console.error("Failed to create payment:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error: error.message,
    });
  }
};


// ========================================
// POST /api/payments/confirm
// Confirm mock payment
// ========================================

export const confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "paymentId is required",
      });
    }


    // Find payment
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }


    // Prevent paying twice
    if (payment.paymentStatus === "Success") {
      return res.status(400).json({
        success: false,
        message: "Payment already completed",
      });
    }


    // Mock payment succeeds
    payment.paymentStatus = "Success";

    await payment.save();


    res.status(200).json({
      success: true,
      message: "Payment successful",
      data: payment,
    });

  } catch (error) {
    console.error("Failed to confirm payment:", error);

    res.status(500).json({
      success: false,
      message: "Failed to confirm payment",
      error: error.message,
    });
  }
};


// ========================================
// GET /api/payments/user/:userId
// Get user's payment history
// ========================================

export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.params.userId,
    })
      .populate("subscription")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });

  } catch (error) {
    console.error("Failed to get user payments:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// PUT /api/payments/:id/fail
// Mark payment as failed
// ========================================

export const failPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }


    if (payment.paymentStatus === "Success") {
      return res.status(400).json({
        success: false,
        message: "Successful payment cannot be marked as failed",
      });
    }


    payment.paymentStatus = "Failed";

    await payment.save();


    res.status(200).json({
      success: true,
      message: "Payment marked as failed",
      data: payment,
    });

  } catch (error) {
    console.error("Failed to update payment:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// POST /api/payments/webhook
// Mock webhook
// ========================================

export const paymentWebhook = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    if (!paymentId || !status) {
      return res.status(400).json({
        success: false,
        message: "paymentId and status are required",
      });
    }


    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }


    const allowedStatuses = [
      "Pending",
      "Success",
      "Failed",
      "Refunded",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }


    payment.paymentStatus = status;

    await payment.save();


    res.status(200).json({
      success: true,
      message: "Payment webhook processed",
      data: payment,
    });

  } catch (error) {
    console.error("Payment webhook failed:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};