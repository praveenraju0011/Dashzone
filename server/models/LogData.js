//login timeStamps
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");

const LogData = sequelize.define(
  "logData",
  {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamp: false,
  }
);
LogData.belongsTo(User, { foreignKey: "userId" });
User.hasMany(LogData, { foreignKey: "userId" });

module.exports = LogData;
