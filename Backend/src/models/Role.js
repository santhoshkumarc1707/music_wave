import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  roleCode: {
    type: String,
    required: true,
    unique: true,
  },
});

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

export default Role;