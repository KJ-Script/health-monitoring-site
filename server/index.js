const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
const ResultModel = require("./models/Result");
const cors = require("cors");
const { updateMany } = require("./models/Result");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://keti:test123@wiki.ghfxak6.mongodb.net/health?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.post("/createUser", async (req, res) => {
  console.log("Creating Account");
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user.status);
  console.log("Account Created,--- I think");
});

app.post("/validate", async (req, res) => {
  const user = await UserModel.findOne({
    phone: req.body.phone,
    password: req.body.password,
  });

  if (user) {
    console.log("Account exists");
    return res.json({ status: "ok", user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/submit", async (req, res) => {
  console.log("submitting");
  const result = req.body;
  console.log(result)
  console.log("result", result);
  const newResult = new ResultModel(result);
  await newResult.save();
  console.log("New Result will be", newResult)
  res.json(newResult);
  console.log("submitted,--- I think");
});

app.get("/accepttData", async (req, res) => {
  console.log("Data");
});

app.post("/update", async (req, res) => {
  console.log("trying to Update");
  const userId = req.body.id;
  const update = req.body.result;

  console.log("displaying userID", userId);
  console.log("displaying Update", update);

  UserModel.findByIdAndUpdate(
    userId,
    { $push: { result: update} },
    {'new': true}, 
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        console.log("updated array", result);
        res.json(result);
      }
    }
  );
});

app.get("/display", (req, res) => {
  ResultModel.find({})
    .populate("user")
    .exec((err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
});

app.post('/displayResults', (req, res) => {
  const id = req.body.id    
  console.log("Id:",id)
  UserModel.findById(id).populate("result").exec((err, result) => {
    if(err) {
      console.log(err)
    } else {
      console.log("result: ", result)
      res.json(result)
    }
  } )
});

app.listen(8080, (req, res) => {
  console.log("Server is Online");
});
