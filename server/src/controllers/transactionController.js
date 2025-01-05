const { validationResult, query } = require('express-validator');
const mongoose = require('mongoose');
const Transaction = require("../models/transaction");

exports.validate = (method) => {
  switch (method) {
    case 'getTransactionsByUserId': {
      return [
        query('status').optional().isString(),
        query('fromDate').optional().isISO8601(),
        query('toDate').optional().isISO8601(),
        query('type').optional().isString(),
        query('page').optional().isInt({ min: 1 }),
        query('limit').optional().isInt({ min: 1, max: 100 }),
      ];
    }
    case 'getAllTransactionsWithUserDetails': {
      return [
        query('status').optional().isString(),
        query('fromDate').optional().isISO8601(),
        query('toDate').optional().isISO8601(),
        query('type').optional().isString(),
        query('page').optional().isInt({ min: 1 }),
        query('limit').optional().isInt({ min: 1, max: 100 }),
      ];
    }
  }
};

exports.getTransactionsByUserId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, fromDate, toDate, type, page = 1, limit = 5 } = req.query;

    const match = { userId: new mongoose.Types.ObjectId(`${req.params.userId}`) };
    if (status) match.status = status;
    if (type) match.type = type;
    if (fromDate) {
      match.transactionDate = { $gte: new Date(fromDate)};
    }
    if (toDate) {
      match.transactionDate = match.transactionDate || {};
      match.transactionDate.$lte = new Date(toDate);
    }
    
    const transactions = await Transaction.aggregate([
      { $match: match },
      { $sort: { transactionDate: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    if(!transactions.length) {
        res.status(200).json({message:"No transactions are found for the given query",transactions});
    }else{
    res.status(200).json({message:"fetched transactions successfully",transactions});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

exports.getAllTransactionsWithUserDetails = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, fromDate, toDate, type, page = 1, limit = 10 } = req.query;

    const match = {};
    if (status) match.status = status;
    if (type) match.type = type;
    if (fromDate) {
      match.transactionDate = { $gte: new Date(fromDate)};
    }
    if (toDate) {
      match.transactionDate = match.transactionDate || {};
      match.transactionDate.$lte = new Date(toDate);
    }

    const transactions = await Transaction.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $sort: { transactionDate: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    if(!transactions.length) {
        res.status(200).json({message:"No transactions are found for the given query",transactions});
    }else{
    res.status(200).json({message:"fetched transactions successfully",transactions});
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions with users", error });
  }
};