import Role from "../models/Role.js";

const roles = [
  { name: "Super Admin", roleCode: "SUPER_ADMIN" },
  { name: "Admin", roleCode: "ADMIN" },
  { name: "Artist", roleCode: "ARTIST" },
  { name: "Premium User", roleCode: "PREMIUM_USER" },
  { name: "Free User", roleCode: "FREE_USER" },
];

const seedRoles = async () => {
  for (const role of roles) {
    const exists = await Role.findOne({ roleCode: role.roleCode });

    if (!exists) {
      await Role.create(role);
      console.log(`${role.name} created`);
    }
  }
};

export default seedRoles;