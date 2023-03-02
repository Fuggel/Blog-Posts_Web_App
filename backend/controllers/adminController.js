require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const Admin = require("../models/adminModel");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ username });
  } catch (err) {
    return next(new HttpError("Logging in failed, please try again.", 500));
  }

  if (!existingAdmin) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 403)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingAdmin.password);
  } catch (err) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 403)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingAdmin.id, username: existingAdmin.username },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Logging in failed, please try again.", 500));
  }

  res.json({
    userId: existingAdmin.id,
    username: existingAdmin.username,
    token,
  });
};

module.exports = { login };
