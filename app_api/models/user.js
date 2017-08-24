const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");



function emailLengthChecker (email){
    if(!email){
        return false;
    }
    else{
        if(email.length < 5 || email.length > 30){
            return false
        }
        else{
            return true;
        }
    }
}

function passwordLengthChecker(password) {
  if (!password) {
    return false;
  } else if (password.length < 6 || password.length > 35) {
    return false;
  } else {
    return true;
  }
}

function usernameLengthChecker(username) {
  if (!username) {
    return false;
  } else if (username.length < 3 || username.length > 15) {
    return false;
  } else {
    return true;
  }
}

function nameLengthChecker(name) {
  if (!name) {
    return false;
  } else if (name.length < 4 || name.length > 20) {
    return false;
  } else {
    return true;
  }
}

function validPassword(password){
    if(!password){
        return false;
    }else{
    const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/)
    return regex.test(password);
    }
}

function validUsername(username){
    if(!username){
        return false;
    }else{
        const regex = new RegExp(/^[a-zA-Z0-9]+$/);
        return regex.test(username);
    }
}

function validEmail(email){
    if(!email){
        return false;
    }
    else{
        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return regex.test(email);
    }

}

function validName(name){
    if(!name){
        return false;
    }else{
        const regex = new RegExp(/^[a-zA-Z\s]*$/);
        return regex.test(name);
    }
}


const emailValidators = [
  {
    validator: emailLengthChecker,
    message: "Email must be at least 5 characters but not more than 30"
  },
  {
      validator: validEmail,
      message: "Email must be a valid email"
  }
];

const usernameValidators = [
  {
    validator: usernameLengthChecker,
    message: "Username must be at least 3 characters but not more than 15"
  },
  {
      validator: validUsername,
      message: "Username must contain only alphabets and numbers"
  }
];

const nameValidators = [
  {
    validator: nameLengthChecker,
    message: "Name must be at least 4 characters but not more than 20"
  },
  {
      validator: validName,
      message: "Name must contain only alphabets"
  }
];

const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: "Password must be at least 6 characters but not more than 35"
  },
  {
      validator: validPassword,
      message: "Password must have at least one Uppercase, lowercase, number and special character"
  }
];

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: emailValidators
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: usernameValidators
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
    validate: nameValidators
  },
  password: { type: String, required: true, validate: passwordValidators },
  photo: { type: String }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
