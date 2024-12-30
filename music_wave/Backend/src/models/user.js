import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

// Counter schema for auto-incrementing IDs
const counterSchema = new mongoose.Schema({
  model: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  month: { type: String, required: true },
  date: { type: String, required: true },
  year: { type: String, required: true },
  profileImg: {
    data: { type: String },
    contentType: { type: String },
  },
  likedSongs: { type: [String], default: [] },
  album: { type: [String], default: [] },
  isAdmin: { type: Boolean, default: false },
  id: { type: Number, unique: true },
});

// Middleware to auto-increment the ID
userSchema.pre("save", async function (next) {
  if (!this.isNew || this.id) return next();

  try {
    const counter = await Counter.findOneAndUpdate(
      { model: "User" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
};

// Validate user data using Joi
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    month: Joi.string().required(),
    date: Joi.string().required(),
    year: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "non-binary").required(),
    profileImg: Joi.object({
      data: Joi.string(),
      contentType: Joi.string(),
    }).optional(),
  });
  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

// Export User model and validateUser function directly
export { User, validateUser };
