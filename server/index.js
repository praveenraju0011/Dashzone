require("dotenv").config();
const express = require("express");
const cors = require("cors");


const sequelize = require("./config/db");
const User = require("./models/User");
const LogData = require("./models/LogData");

const app = express();

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const logDetailsRoute = require("./routes/logDetails");

  async function dbConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    
    console.log("Post gre Database connected successfully.");
  } catch (err) {
    console.log(err);
  }
}

dbConnection();

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/logDetails", logDetailsRoute);

app.listen(process.env.PORT || 2000, () => {
  console.log("server running on", process.env.PORT);
});
