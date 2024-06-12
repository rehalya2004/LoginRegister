const mongoose = require("mongoose")
const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken")

const LoginSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phno: {
      type: Number,
      required: true
    },
    address: {
        type: String,
        required: true
    },
})


LoginSchema.pre("save", async function(next) {
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
})

LoginSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id,name:this.name,email:this.email,address:this.address,phno:this.phno},"MRKWWRTFLAFWWTFTGINL",{expiresIn:"1d"})
  return token
};




const loginModel = mongoose.model("data",LoginSchema)

module.exports = loginModel

