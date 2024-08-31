const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../db/user");
const router = express.Router();
const bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
const JWT_SECRET = 'NAYANANILKADAM'

const fetchuser = require('../middleware/fetchuser')
//route1:to create user
router.post("/createuser",
 [body("name").isLength({ min: 3 }), 
 body("email").isEmail()],

 
  async (req, res) => {
    //if there are errors it will give bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exist already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let success = false
      return res.status(400).json({ error: "sorry user with this mail id alredy exists" });
    }

    const salt = await bcrypt.genSalt(10)
    const secpass = await bcrypt.hash(req.body.password,salt)


    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password:secpass
    });
    const data = {
      user:{
        id:user.id
      }
    }
    const jstdata = jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success, jstdata})

  }
);

//route2 :to login user
router.post("/login",
[
  body('email','enter valid email').isEmail(),
  body("password",'password cannot be blank').exists() 
], async(req,res)=>
{ 
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}= req.body
    try{

      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({errors:"please enter the valid credentials"})
      }
     
      const passwordcompare = await bcrypt.compare(password,user.password)
      if(!passwordcompare){
        success =false
        return  res.status(400).json({success, errors:"please enter the valid credentials"})
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({ success, authtoken })

      
      

    }
    catch(error){
      console.log(error.message);
      res.status(500).send("internal server error")

    }
})

//route3:to get the user
router.post('/getuser', fetchuser, async(req,res)=>
{
  try {
    let userID = req.user.id
    const user = await User.findById(userID).select("-password")
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).send("internal server error")
    
  }

}
)


module.exports = router;
