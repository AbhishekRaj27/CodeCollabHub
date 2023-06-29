const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "javascript",
    },
    theme: {
      type: String,
      default: "aura",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async function () {
  const user = this;
  return jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
};

userSchema.methods.publicUser = function () {
  const user = this;
  return {
    name: user.name,
    email: user.email,
    language: user.language,
    theme: user.theme,
    createdAt: user.createdAt,
  };
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("No user exists with this email");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
