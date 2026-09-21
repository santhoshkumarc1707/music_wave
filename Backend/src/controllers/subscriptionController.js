import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

// ========================================
// GET /api/subscriptions
// Get all subscriptions
// ========================================

export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user", "name username email")
      .populate("plan")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    console.error("Failed to get subscriptions:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// GET /api/subscriptions/me
// Get logged-in user's subscription
// ========================================

export const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: "Active",
    })
      .populate("plan")
      .populate("user", "name username email");

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found",
      });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error("Failed to get my subscription:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// POST /api/subscriptions
// Create subscription
// ========================================

export const createSubscription = async (req, res) => {
  try {
    const {
      plan,
      amount,
      endDate,
      autoRenew,
    } = req.body;

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: "Plan is required",
      });
    }

    // Check plan exists
    const existingPlan = await Plan.findById(plan);

    if (!existingPlan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    // Check existing active subscription
    const existingSubscription = await Subscription.findOne({
      user: req.user._id,
      status: "Active",
    });

    if (existingSubscription) {
      return res.status(409).json({
        success: false,
        message: "You already have an active subscription",
      });
    }

    const subscription = await Subscription.create({
      user: req.user._id,
      plan,
      startDate: new Date(),
      endDate,
      amount: amount ?? existingPlan.price,
      paymentStatus: "Pending",
      status: "Active",
      autoRenew: autoRenew ?? false,
    });

    const result = await Subscription.findById(subscription._id)
      .populate("plan")
      .populate("user", "name username email");

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Failed to create subscription:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// PUT /api/subscriptions/:id
// Update subscription
// ========================================

export const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    const {
      endDate,
      autoRenew,
      status,
      paymentStatus,
    } = req.body;

    if (endDate !== undefined) {
      subscription.endDate = endDate;
    }

    if (autoRenew !== undefined) {
      subscription.autoRenew = autoRenew;
    }

    if (status !== undefined) {
      subscription.status = status;
    }

    if (paymentStatus !== undefined) {
      subscription.paymentStatus = paymentStatus;
    }

    await subscription.save();

    const result = await Subscription.findById(subscription._id)
      .populate("plan")
      .populate("user", "name username email");

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Failed to update subscription:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// DELETE /api/subscriptions/:id
// Cancel subscription
// ========================================

export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    // Don't actually delete it.
    // Mark it as cancelled.
    subscription.status = "Cancelled";
    subscription.autoRenew = false;

    await subscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      data: subscription,
    });
  } catch (error) {
    console.error("Failed to cancel subscription:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};