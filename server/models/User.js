const result = require("./Result");
const express = require("express");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    result: [
      {
        type: mongoose.Types.ObjectId,
        ref: "result",
      },
    ],
  },
  { timetamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
