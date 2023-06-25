
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");


exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      role,
      age,
      contact_info,
      specialties,
      availability,
      bio,
      img
    } = req.body;
    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      return res
        .status(401)
        .json({ msg: "User with this email already exists" });
    }

    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        return res.status(401).json({ Error: err });
      }
      

      if (role == "patient" || role == "admin") {
        const User = await new UserModel({
          name,
          email,
          password: hash,
          gender,
          role,
          age,
          contact_info,
          img
        });
        User.save();
        res.status(201).json({ msg: "User registered successfully" });
      } else if (role == "doctor") {
        const User = await new UserModel({
          name,
          email,
          password: hash,
          role,
          age,
          gender,
          contact_info,
          specialties,
          availability,
          bio,
          img
        });
        User.save();
        res.status(201).json({ msg: "User registered successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
  const {email , password} = req.body;

  const User = await UserModel.findOne({email})

  if(!User){
    return res.status(404).json({msg : "User doesn't exist , Please signup"})
  }

  bcrypt.compare(password, User.password, function(err, result) {
    if(err){
        console.log(err)
        return res.status(500).json({Error : err})
    }

    if(result){
        const token =  jwt.sign({ userId: User._id,role : User.role, name : User.name }, process.env.privatekey, { expiresIn: '7d' } );
        res.cookie('token' , token)
        res.status(201).json({msg : 'User logged in successfully',token,role : User.role})
    }else{
        res.status(401).json({msg : "Invalid Credentials"})
    }
});


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





exports.UserData = async(req,res)=>{
    try {
        const id = req.userId
        console.log(id)
        const data = await UserModel.findOne({_id : id})
       
        res.status(201).json({data})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


exports.doctors = async(req,res)=>{
    try {
        const doctors = await UserModel.find({role : 'doctor'})
        res.status(201).json({doctors})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


exports.user = async(req,res)=>{
  try {
    const {id}  = req.params
    console.log('id' , id)
    const user = await UserModel.findOne({_id : id})
    res.status(201).send({
      msg : "Data",user
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


exports.updateUser = async(req,res)=>{
  try {
    const payload = req.body;
    const id = req.userId;
    const user = await UserModel.findOne({_id  :id})
    if(user){
      await UserModel.findOneAndUpdate({_id: id},{
        $set : payload
      })
      res.status(204).send({msg : "Details Updated"})
    }else{
      res.status(404).send({msg : "User not"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}