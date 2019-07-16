const express=require("express")

const router = express.Router()
const Auth=require("../Models/Auth")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


router.get("/",(req,res)=>{
  res.send("Hello")
})

router.post("/register", async(req,res)=>{
  
  const emailExist= await Auth.findOne({email:req.body.email})

  if(emailExist) { return res.status(403).send("Email Already Exists")}
  

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password,salt)
  
  
  const auth =new Auth(
    {
      username:req.body.username,
      email:req.body.email,
      password:hashedPassword
    }
  );
  try{
    auth.save()
    res.send({user:auth._id})

  }catch(err){
    res.json({message:err})
  } 

})


router.post("/login",async(req,res)=>
{

  const user= await Auth.findOne({email:req.body.email})

  if(!user) { return res.status(400).send("Email Not Found")}

  const validpass = await bcrypt.compare(req.body.password,user.password)
  if(!validpass) return res.status(400).send("Invalid Password")


  const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)


  res.header("jwt-token",token).send({success:"Logged In Successfully", jwt:token})




})



module.exports = router;