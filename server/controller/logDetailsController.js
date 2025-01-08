const LogData = require("../models/LogData");
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

const log = async (req, res) => {
  try {
    const loggedUserId = req.user.id;

    const { data } = req.body;
    const decryptedPayload = decryptPayload(data);
    const { logType } = decryptedPayload;

    const logEntry = LogData.create({
      userId: loggedUserId,
      type: logType,
    });

    res.status(200).json({
      message: `User ${logType} log successfully recorded.`,
      logEntry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLogData = async (req, res) => {
  try {
    const loggedUserId = req.user.id;

    const userLogData = await LogData.findAll({
      where: { userId: loggedUserId },
      order: [["_id", "ASC"]],
    });

    res.status(200).json({ userLogData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { log, getLogData };
