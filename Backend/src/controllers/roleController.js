import Role from "../models/Role.js";

// =======================
// GET ALL ROLES
// GET /api/roles
// =======================
export const getRoles = async (req, res) => {
  
  try {
    const roles = await Role.find().sort({createdAt:-1})
    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles,
  
    });
  } catch (error) {
    console.error("Failed to get roles:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =======================
// GET ROLE BY ID
// GET /api/roles/:id
// =======================
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    console.error("Failed to get role:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =======================
// CREATE ROLE
// POST /api/roles
// =======================
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Role.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Role already exists",
      });
    }

    const role = await Role.create({
      name,
    });

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    console.error("Failed to create role:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =======================
// UPDATE ROLE
// PUT /api/roles/:id
// =======================
export const updateRole = async (req, res) => {
  try {
    const { name } = req.body;

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    console.error("Failed to update role:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =======================
// DELETE ROLE
// DELETE /api/roles/:id
// =======================
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete role:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};