const mongoose = require("mongoose")

const Auth = mongoose.Schema(
  {
    username:{
      type:String,
      required:true,
      max:255
    },
    email:{
      type:String,
      required:true,
      max:255
    },
    password:{
      type:String,
      required:true,
      max:1025
    }
  }
)

module.exports = mongoose.model("Auth",Auth)