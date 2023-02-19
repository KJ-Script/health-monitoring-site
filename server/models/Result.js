const user = require("./User");
const express = require("express");
const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema({
  heartBeat: {
    type: Number,
    required: true,
  },

  bloodLevel: {
    type: Number,
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
}, {timestamps: true});

const ResultModel = mongoose.model("result", ResultSchema);

module.exports = ResultModel;
