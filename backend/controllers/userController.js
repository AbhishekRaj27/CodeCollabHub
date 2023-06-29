const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");

/*
 * @desc Register user
 * @route POST /api/users/register
 * @access Public
 * */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("One or more fields missing");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already registered with this email");
    }

    const newUser = new User(req.body);
    await newUser.save();
    const token = await newUser.generateToken();
    const user = newUser.publicUser();

    res.status(201).send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

/*
 * @desc Login user
 * @route POST /api/users/login
 * @access Public
 * */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findByCredentials(email, password);
    const token = await checkUser.generateToken();
    const user = checkUser.publicUser();

    res.status(200).send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

/*
 * @desc Get user data
 * @route GET /api/users/me
 * @access Private
 * */
const getUser = async (req, res) => {
  res.status(200).json(req.user);
};

/*
 * @desc Update user data
 * @route PUT/users/updateUser
 * @access Private
 * */
const updateUser = async (req, res) => {
  const newDetails = req.body;

  try {
    await User.updateOne(req.user, { $set: newDetails });
    res.send({ data: "Success!", title: "Details updated" });
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

/*
 * @desc Update password
 * @route PUT/users/change-password
 * @access Private
 * */
const updatePassword = async (req, res) => {
  const passwords = req.body;

  try {
    const user = await User.findById(req.user._id);
    console.log(user);

    const isMatch = await bcrypt.compare(
      passwords.currentPassword,
      user.password
    );
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }
    user.password = passwords.newPassword;
    await user.save();

    res.status(201).send({ title: "Success!", data: "Password changed" });
  } catch (e) {
    res.status(400).send({ title: "Error!", data: e.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  updatePassword,
};
