const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
      default:"/images/avatar.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }

  },
  { timestamps: true }
);
  
userSchema.pre("save",async function(next){
    const user = this;

    if(!user.isModified("password")) return next();

   try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.salt = salt;
    user.password = hashedPassword;

    next();
  } catch (err) {
    next(err);
  }
});


const user = mongoose.model("user",userSchema);
module.exports = user;  