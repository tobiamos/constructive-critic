const mongoose = require("mongoose");
const User = require("../models/user");

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
          if(err.code === 11000){
              res.json({success:false, message:"Username or Email already exists"});
          }else if(err.errors.email){
              res.json({success:false, message:err.errors.email.message});
          }else if(err.errors.username){
              res.json({success:false, message:err.errors.username.message});
          }else if(err.errors.name){
              res.json({success:false, message:err.errors.name.message});
          }else if(err.errors.password){
              res.json({success:false, message:err.errors.password.message});
          }
          else{
            res.json({success:false, message: err});
          }
        
      } else {
        res.json({ success: true, message: "Account Registered" });
      }
    });
  }
};


module.exports.checkEmail = (req,res,next) =>{
  if(!req.params.email){
    res.json({success:false, message: "No Email Provided"});
  }else{
    User.findOne({email : req.params.email},(err,user)=>{
      if(err){
        res.json({success:false, message: err});
      }else if (user){
        res.json({success: false, message: "Email is already taken"});
      }else{
        res.json({success: true, message: "Email is available"});
      }
    })
  }
}

module.exports.checkUsername = (req,res,next) =>{
  if(!req.params.username){
    res.json({success:false , message: "No username provided"});
  }else{
    User.findOne({username : req.params.username}, (err, user)=>{
      if(err){
        res.json({success:false, message: err});
      }else if(user){
        res.json({success: false, message: "Username is already taken"});

      }else{
        res.json({success:true, message: "Username is available"});
      }
    })
  }
}