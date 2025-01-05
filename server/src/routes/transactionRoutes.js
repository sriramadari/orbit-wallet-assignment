const express = require("express");
const { getTransactionsByUserId, getAllTransactionsWithUserDetails } = require("../controllers/transactionController");
const router = express.Router();

router.get("/:userId", getTransactionsByUserId);
router.get("/", getAllTransactionsWithUserDetails);

module.exports = router;
