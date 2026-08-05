import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";

const seedSuperAdmin = async () => {
  const role = await Role.findOne({ name: "Super Admin" });

  if (!role) {
    console.log("Super Admin role not found");
    return;
  }

  const exists = await User.findOne({
    email: "admin@musicwave.com",
  });

  if (exists) {
    console.log("Super Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Super Admin",
    username: "superadmin",
    email: "admin@musicwave.com",
    phone: "9999999999",
    password: hashedPassword,

    gender: "male", // or "female" / "non-binary"

    dob: {
      day: "01",
      month: "01",
      year: "1995",
    },

    roleId: role._id,

    emailVerified: true,

    status: "Active", 
  });

  console.log("Super Admin Created");
};

export default seedSuperAdmin;