const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto").randomBytes(256).toString("hex");

module.exports.register = (req, res, next) => {
  if (!req.body.email) {
    res.json({ success: false, message: "No email provided" });
  } else if (!req.body.username) {
    res.json({ success: false, message: "No username provided" });
  } else if (!req.body.name) {
    res.json({ success: false, message: "No name provided" });
  } else if (!req.body.password) {
    res.json({ success: false, message: "No password provided" });
  } else {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err, data) {
      if (err) {
        if (err.code === 11000) {
          res.json({
            success: false,
            message: "Username or Email already exists"
          });
        } else if (err.errors.email) {
          res.json({ success: false, message: err.errors.email.message });
        } else if (err.errors.username) {
          res.json({ success: false, message: err.errors.username.message });
        } else if (err.errors.name) {
          res.json({ success: false, message: err.errors.name.message });
        } else if (err.errors.password) {
          res.json({ success: false, message: err.errors.password.message });
        } else {
          res.json({ success: false, message: err });
        }
      } else {
        res.json({ success: true, message: "Account Registered" });
      }
    });
  }
};

module.exports.checkEmail = (req, res, next) => {
  if (!req.params.email) {
    res.json({ success: false, message: "No Email Provided" });
  } else {
    User.findOne({ email: req.params.email }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (user) {
        res.json({ success: false, message: "Email is already taken" });
      } else {
        res.json({ success: true, message: "Email is available" });
      }
    });
  }
};

module.exports.checkUsername = (req, res, next) => {
  if (!req.params.username) {
    res.json({ success: false, message: "No username provided" });
  } else {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (user) {
        res.json({ success: false, message: "Username is already taken" });
      } else {
        res.json({ success: true, message: "Username is available" });
      }
    });
  }
};

module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    res.json({ success: false, message: "No Email Provided" });
  } else if (!req.body.password) {
    res.json({ success: false, message: "No Password Provided" });
  } else {
    User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!user) {
        res.json({ success: false, message: "User not found" });
      } else {
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({ success: false, message: "Password Invalid" });
        } else {
          const token = jwt.sign({ userId: user._id }, crypto, {
            expiresIn: "24h"
          });
          res.json({
            success: true,
            token: token,
            message: "Success!!",
            user: { username: user.username }
          });
        }
      }
    });
  }
};

module.exports.message = (req, res, next) => {
  if (!req.params.username) {
    res.json({ success: false, message: "No username provided" });
  } else {
    User.findOne({ username: req.params.username })
      .select("name photo")
      .exec((err, user) => {
        if (err) {
          res.json({ success: false, message: err });
        } else if (!user) {
          res.json({ success: false, message: "User does not exist" });
        } else {
          res.json({ success: true, user: user });
        }
      });
  }
};

module.exports.sendMessage = (req, res, next) => {
  if (!req.params.id) {
    res.json({ success: false, message: "No user id provided" });
  } else if (!req.body.message) {
    res.json({ success: false, message: "No message field provided" });
  } else {
    User.findOne({ _id: req.params.id })
      .select("messages")
      .exec((err, user) => {
        if (err) {
          res.json({ success: false, message: err });
        } else if (!user) {
          res.json({ success: false, message: "User not found" });
        } else if (user) {
          user.messages.push({ message: req.body.message, date: Date.now() });
          user.save((err,data)=>{
            if(err){
              res.json({success:false , message:err});
            }else{
              res.json({success:true, message: "Message sent successfully"});
            }
          })
        }
      });
  }
};


module.exports.deleteMessage = (req,res,next) =>{
  if(!req.params.username){
    res.json({success: false , message: "No username provided"});
  }else if (!req.query.messageId){
    res.json({success:false, message:"No message id provided"});
  }else{
    User.findOne({username: req.params.username}).select('messages').exec((err,user)=>{
      if(err){
        res.json({success:false, message:err});
      }else{
        const index = user.messages.indexOf(req.query.messageId);
        user.messages.splice(index);
        user.save((err,data)=>{
          if(err){
            res.json({success:false, message:err});
          }else{
            res.json({success:true, message: "Message deleted successfully"});
          }
        })
      }
    })
  }
}
module.exports.headers = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.json({ success: false, message: "No token provided" });
  } else {
    jwt.verify(token, crypto, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: "Token Invalid" + err });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports.profile = (req, res, next) => {
  User.findOne({ _id: req.decoded.userId })
    .select("username email messages photo")
    .exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!user) {
        res.json({ success: false, message: "User not found" });
      } else {
        res.json({ success: true, user: user });
      }
    });
};
