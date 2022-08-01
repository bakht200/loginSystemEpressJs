const express = require("express");
const route = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/dbConfig.js");
const userMidleware = require("../middleware/user.js");
const { validateRegister, islogedin } = require("../middleware/user.js");

const model = require("../models/server.js");

const userDb = model.userModel;

////signup

route.post("/signup", validateRegister, async (req, res) => {
  const user = await userDb.findOne({ where: { email: req.body.email } });

  if (user) {
    return res.status(409).send({ message: "Email exist" });
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(409).send({ message: err });
      } else {
        var insertQuery = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
        };
        created_user = userDb.create(insertQuery);
        res.status(200).send({ message: "Registered!" });
      }
    });
  }
});

///login

route.post("/login", async (req, res) => {
  const user = await userDb.findOne({ where: { email: req.body.email } });
  if (user) {
    const { password } = req.body;
    console.log(password);
    console.log(user.password);

    bcrypt.compare(password, user.password, (error, results) => {
      if (error) {
        return res.status(400).send({ message: "Password not matched" });
      }
      if (results) {
        const token = jwt.sign(
          {
            first_name: user.first_name,
            userId: user.id,
          },
          "SECRETKEY",
          { expiresIn: "7d" }
        );

        return res.status(200).send({
          message: "logedIn",
          token,
          user: user,
        });
      } else {
        return res.status(200).send({
          message: "Invalid username or password",
        });
      }
    });
  } else {
    return res.status(400).send({ message: "User not found" });
  }
});

//secretroute

route.get("/secretroute", islogedin, (req, res) => {
  console.log(req.user);
  res.send("this is secret route");
});

module.exports = route;
