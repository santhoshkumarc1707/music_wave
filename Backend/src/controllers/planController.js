import Plan from "../models/Plan.js";



// ========================================
// GET /api/plan
// Get all plan
// ========================================

export const getplan = async (req, res) => {
  try {
    const plan = await Plan.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: plan.length,
      data: plan,
    });
  } catch (error) {
    console.error("Failed to get plan:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// GET /api/plan/:id
// Get plan by ID
// ========================================

export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "plan not found",
      });
    }

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("Failed to get plan:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// POST /api/plan
// Create plan
// ========================================

export const createplan = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      features,
      isActive,
    } = req.body;

    // Check name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "plan name is required",
      });
    }

    // Check duplicate plan
    const existingplan = await plan.findOne({
      name: name.trim(),
    });

    if (existingplan) {
      return res.status(409).json({
        success: false,
        message: "plan already exists",
      });
    }

    // Create plan
    const plan = await Plan.create({
      name: name.trim(),
      description,
       price,
      duration,
      features,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "plan created successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Failed to create plan:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// PUT /api/plan/:id
// Update plan
// ========================================

export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "plan not found",
      });
    }

    const {
      name,
      description,
      price,
      duration,
      features,
      isActive,
    } = req.body;

    plan.name = name ?? plan.name;
    plan.description = description ?? plan.description;
    plan.image = image ?? plan.image;
    plan.color = color ?? plan.color;
    plan.isActive = isActive ?? plan.isActive;

    await plan.save();

    res.status(200).json({
      success: true,
      message: "plan updated successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Failed to update plan:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// DELETE /api/plan/:id
// Delete plan
// ========================================

export const deleteplan = async (req, res) => {
  try {
    const plan = await plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "plan not found",
      });
    }

    await plan.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "plan deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete plan:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


