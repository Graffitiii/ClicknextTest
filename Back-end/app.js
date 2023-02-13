require("dotenv").config();
require("./config/database").connect();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const express = require("express");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require('cors');


const app = express();
app.use(cors())
app.use(express.json());

// Logic goes here
const User = require("./model/user");
app.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;
    console.log(req.body);
    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;
    console.log(req.body)
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

const auth = require("./middleware/auth");

app.post("/Home", auth, (req, res) => {
  return res.status(200).json({ 'message': "Welcome 🙌 " });

});
app.post("/refresh", async (req, res) => {
  
  return res.status(200).json(user);
});

app.post("/Deposite", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { acc_id, money } = req.body;
    console.log(req.body)
    // Validate user input
    if (!(money)) {
      return res.status(400).send("input is required");
    }

    // Validate if user exist in our database
    const finduser = await User.findOne({ acc_id });
    if (!finduser) {
      return res.status(400).send("Wrong accID");
    }
    
    const filter = { acc_id: acc_id };
    const update = { $inc :{ money: money } }; 
    let doc = await User.findOneAndUpdate(filter, update);
    doc.acc_id;
    doc.money; 
    
    doc = await User.findOne(filter);
    doc.money; 

    return res.status(200).json(finduser);
  } catch (err) {
    console.log(err);
  }
});

app.post("/Withdraw", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { acc_id, money } = req.body;
    console.log(req.body)
    // Validate user input
    if (!(money)) {
      return res.status(400).send("input is required");
    }

    // Validate if user exist in our database
    const finduser = await User.findOne({ acc_id });
    if (!finduser) {
      return res.status(400).send("Wrong accID");
    }
    
    const filter = { acc_id: acc_id };
    const update = { $inc :{ money: - money } }; 
    let doc = await User.findOneAndUpdate(filter, update);
    doc.acc_id;
    doc.money; 
    
    doc = await User.findOne(filter);
    doc.money; 

    return res.status(200).json(finduser);
  } catch (err) {
    console.log(err);
  }
});



app.post("/Transfer", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { acc_id1, acc_id2, money} = req.body;
    console.log(req.body)
    // Validate user input
    if (!(money)) {
      return res.status(400).send("input is required");
    }
    

    // Validate if user exist in our database
    const finduser1 = await User.findOne({ acc_id:acc_id1 });
    if (!finduser1) {
      return res.status(400).send("Wrong accID 1");
    }
    const finduser2 = await User.findOne({ acc_id:acc_id2 });
    if (!finduser1) {
      return res.status(400).send("Wrong accID 2");
    }
    
    const filter = { acc_id: acc_id1 };
    const update = { $inc :{ money: - money }}; 
    let doc = await User.findOneAndUpdate(filter, update);
    doc.acc_id;
    doc.money; 
    
    doc = await User.findOne(filter);
    doc.money; 
    
    //update user2
    const filter1 = { acc_id: acc_id2 };
    const update1 = { $inc :{ money: money } }; 
    doc = await User.findOneAndUpdate(filter1, update1);
    doc.acc_id;
    doc.money; 
    
    doc = await User.findOne(filter1);
    doc.money;

    return res.status(200).json(finduser1);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;