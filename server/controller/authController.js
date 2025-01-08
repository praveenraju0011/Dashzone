const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CryptoJS = require("crypto-js");

require("dotenv").config();

const secretKey = process.env.JSON_SECRET_KEY;
const decryptPayload = (encryptedPayload) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPayload, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      throw new Error("Decryption failed or returned empty string.");
    }

    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Invalid encrypted payload or decryption error.");
  }
};

const registerUser = async (req, res) => {
  try {
    const { data } = req.body;
    const decryptedPayload = decryptPayload(data);

    const { name, email, password, gender } = decryptedPayload;

    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: "Some fields are empty" });
    }

    const ifUserExist = await User.findOne({ where: { email } });

    if (ifUserExist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const saltKey = 10;
    const hashPassword = await bcrypt.hash(password, saltKey);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      gender,
    });

    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { data } = req.body;
    const decryptedPayload = decryptPayload(data);
    const { email, password } = decryptedPayload;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Either email or password is empty" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found/registered" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid email/password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login success", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
