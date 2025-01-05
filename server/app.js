require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/db");
const userRoutes = require("./src/routes/userRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");
const generateUsers = require("./src/scripts/generateUsers");

const app = express();
app.use(express.json());
app.use(cors()); // Add CORS middleware

connectDB();

// for the first time to generate users and transactions
// generateUsers(); 

app.get("/", async (req, res) => {
    res.send("hi there");
});
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));