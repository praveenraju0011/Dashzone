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

const getUsers = async (req, res) => {
  try {
    let users = await User.findAll({ order: [["id", "ASC"]] });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const loggedUser = req.user.id;
    const filteredData = users.filter((user) => {
      return loggedUser !== user.id;
    });

    res.status(200).json({ users: filteredData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    await user.update(updatedData);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    const deletedUser = user.toJSON();

    await user.destroy();
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUsers, getUserById, deleteUser };
