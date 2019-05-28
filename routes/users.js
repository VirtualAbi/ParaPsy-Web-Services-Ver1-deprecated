const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

//User Model
const User = require("../models/User");

//Login Page
router.get("/login", (req, res) => res.send("login"));

//Register Page
router.get("/register", (req, res) => res.send("Register"));

//Register Handle
router.post("/register", (req, res) => {
  const { name, email, phone, dob, location, password1, password2 } = req.body;
  let errors = [];

  //Check Fields
  if (
    !name ||
    !email ||
    !phone ||
    !dob ||
    !location ||
    !password1 ||
    !password2
  ) {
    errors.push({ msg: "Please fill in all fields " });
  }

  //Check Password length
  if (password1.length < 6) {
    errors.push({ msg: "Password must be atleast 6 Characters" });
  }

  if (errors.length > 0) {
    res.send("RENDER");
  } else {
    //Validation Passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        //User esists
        errors.push({ msg: "Email is already registered" });
        res.send("RENDER");
      } else {
            const newUser = new User({
                name,
                email,
                phone,
                dob,
                location,
                password1,
                password2
            });

            //Hash Password
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;
                
                //Set password to hashed
                newUser.password = hash;
                //Save user
                newUser.save()
                       .then(user => res.redirect('/users/login'))
                       .catch(err => console.log(err))
            }))
      }
    });
  }
});

module.exports = router;
