const User = require("../models/user");
const Transaction = require("../models/transaction");

const generateUser = async () => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({ name: `User${i}`, phoneNumber: `958112041${i}` });
  }
  const createdUsers = await User.insertMany(users);

  const transactions = [];
  createdUsers.forEach((user) => {
    for (let i = 0; i < 5; i++) {
      transactions.push({
        status: ["success", "pending", "failed"][Math.floor(Math.random() * 3)],
        type: ["debit", "credit"][Math.floor(Math.random() * 2)],
        transactionDate: new Date(),
        amount: Math.floor(Math.random() * 1000) + 1,
        userId: user._id,
      });
    }
  });

  await Transaction.insertMany(transactions);
  console.log("users generated successfully");
};

module.exports = generateUser;
