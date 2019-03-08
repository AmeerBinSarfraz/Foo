const User = require("../models/users.models.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret_key = require("../middleware/verify_jwt_token.middleware").secret_key;
const jwtToken = jwt.sign({ something: "something" }, secret_key, { expiresIn: "365d" });
const Transaction = require('mongoose-transactions');
const useDB = true;
const transaction = new Transaction(useDB);

const mongoose = require("../../config/database.config");


// Create and Save a new User
exports.create = async (req, res) => {

  // Create a User
  const user = new User(req.body);

  // const session = mongoose.startSession();
  // session.startTransaction();

  try {
    // Save User in database
    const newUser = await user.save();
    const saveTransaction = await transaction.saveOperations();
    console.log(saveTransaction);

    if (saveTransaction) {
      return res.status(200).json({
        success: true,
        data: newUser,
        token: jwtToken
      });
    }
  } catch (error) {
    const rolled = await transaction.rollback();
    console.log(rolled);

    if (rolled) {
      return res.status(200).json({
        success: false,
        message: error.message || "Some error occurred while; creating the User. "
      });
    }
  }
};

// user login and matching bcrypt pass
exports.login = async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      username: req.body.username
    });
    if (findUser) {
      return res.status(200).send({
        success: true,
        tokenType: 'jwt',
        token: jwtToken
      })
    } else {
      return res.status(200).send({
        success: false,
        message: 'user not found'
      })
    }
  } catch (err) {
    next(err.message);
  }
}

// Retrieve and return all Users from the database.
exports.findAll = async (req, res, next) => {
  try {
    const allUsersRecord = await User.find();
    if (!allUsersRecord.length) {
      return res.status(200).json({
        success: false,
        message: 'record not found'
      })
    } else {
      return res.status(200).json({
        success: true,
        data: allUsersRecord
      })
    }
  } catch (err) {
    next(err.message)
  }
};

// Find User and update it with the request body
exports.update = async (req, res, next) => {
  try {
    const updateUser = await User.update({
      _id: req.params.userId,
      $set: req.body
    });
    if (updateUser) {
      return res.status(200).json({
        success: true,
        message: 'user updated successfully',
        data: updateUser
      })
    }
  } catch (err) {
    next(err.message);
  }
};

// Delete a user with the specified userId in the request
exports.delete = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndRemove(req.params.userId);
    if (deleteUser) {
      return res.status(200).json({
        success: true,
        message: "User deleted successfully!"
      });
    }
  } catch (err) {
    next(err.message)
  }
};

// Find a single users with a UserId
exports.findOneUser = async (req, res, next) => {
  try {
    const singleUserRecord = await User.findOne({
      _id: req.params.userId
    });
    if (!singleUserRecord) {
      return res.status(200).json({
        success: false,
        message: 'user not found with id ' + req.params.userId
      })
    } else {
      return res.status(200).json({
        success: true,
        data: singleUserRecord
      })
    }
  } catch (err) {
    next(err);
  }
};
