const User = require('../model/user');
const bcrypt = require("bcrypt");

const signup = (req,res)=>{
  res.render("signup" , {message:null});
}

const loginPage = (req,res)=>{
  res.render("login",{message:null});
}

const register = async (req,res)=>{
  try{
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.render("signup",{message:"User already exits, please try login"})
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
      name,
      email,
      password:hashPassword,
    })
    return res.render("login",{ message:"User create sucessfully"
    })

  }catch(err){
    console.log(err);
     return res.render("signup",{ message:"User can not be created due to server issue, please contact support"})
  }
}

const login = async(req,res)=>{
  try{
    const {email,password} = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
      return res.render("signup",{message:"User not found , please create account first"})
    }
    const passwordMatch = await bcrypt.compare(password,existingUser.password);
    if(passwordMatch){
       req.session.Userid = existingUser._id;
       req.session.isAuth = true; 
      res.redirect("/home");
    }
    else{
      return res.render("login",{message:"password does not match,please try again"})
    }
  }
  catch(err){
    res.render("login",{message:"something went wrong,please try again"})
  }
  
}

const allUser = async(req,res)=>{
  User.find()
  .then((response)=>{
    res.json(response)
  })
  .catch((error)=>{
    res.json(error)
  })
}

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect("/home");
    }
    res.redirect("/home");
  });
};


module.exports = {
  signup,
  loginPage,
  register,
  login,
  allUser,
  logout,
  
}