import mongoose from "mongoose";
import Joi from "joi";

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      enum: ["Super Admin", "Admin", "User"],
    },

    roleCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      enum: ["SUPER_ADMIN", "ADMIN", "USER"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    permissions: [
      {
        module: {
          type: String,
          required: true,
        },

        actions: [
          {
            type: String,
            enum: [
              "create",
              "read",
              "update",
              "delete",
              "approve",
              "upload",
              "download",
              "manage",
            ],
          },
        ],
      },
    ],

    status: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index
roleSchema.index({ roleCode: 1 });
roleSchema.index({ roleName: 1 });

// Joi Validation
const validateRole = (role) => {
  const schema = Joi.object({
    roleName: Joi.string()
      .valid("Super Admin", "Admin", "User")
      .required(),

    roleCode: Joi.string()
      .valid("SUPER_ADMIN", "ADMIN", "USER")
      .required(),

    description: Joi.string().allow("", null),

    permissions: Joi.array().items(
      Joi.object({
        module: Joi.string().required(),
        actions: Joi.array().items(
          Joi.string().valid(
            "create",
            "read",
            "update",
            "delete",
            "approve",
            "upload",
            "download",
            "manage"
          )
        ),
      })
    ),

    status: Joi.boolean(),
  });

  return schema.validate(role);
};

const Role = mongoose.model("Role", roleSchema);

export { Role, validateRole };