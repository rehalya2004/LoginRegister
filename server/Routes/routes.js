const express = require("express")
const loginModel = require("../Models/models")
const cors = require("cors")
const router = express.Router()
router.use(express.json())
router.use(cors())
router.use(express.urlencoded({extended: true}))
const bcrypt = require ("bcryptjs")

router.get("/",cors(),(req,res) => {
  res.send(`Hello World`)
})

router.post("/login",async(req,res)=>{

    try{
        const {email,password} = req.body
        if(!email || !password){

            return res.status(400).json("not exist")
            
        }

        const existEmail = await loginModel.findOne({email:email})
        if(existEmail){
            const isMatch = await bcrypt.compare(password, existEmail.password);
            if(!isMatch){

                return res.status(400).json("not exist")
                
            }else{
                
                const token = existEmail.generateAuthToken();
                res.json({"msg":"exist","data":token})

            }
        }else{
            return res.status(400).json("not exist")
        }
        
    }catch(e){
       res.json("not exist")
    }
})

router.post("/signup",async(req,res)=>{
    const {name,email,password,phno,address} = req.body

    if(!name || !email || !password || !phno|| !address){
        return res.status(472).json({error: "Plz fill the field properly"})
    }else{
        try{
            const existEmail = await loginModel.findOne({email:email})
            if(!existEmail){
                res.json("not exist")
                const user = new loginModel({name,email,password,phno,address})
                await user.save();
   
            }else{
                res.json("exist")
            }
        }catch(e){
           res.json("not exist")
        }
    }

    
})



module.exports = router