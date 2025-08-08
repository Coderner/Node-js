const User = require("../models/user");

async function handleGetAllUsers(req, res){
     const allDbUsers = await User.find({});
     res.json(allDbUsers);
}

async function handleGetUserById(req,res){
    const id = req.params.id;
    const user = await User.findById(id);
    if(user===undefined)
      res.json("User not found!");
    res.json(user);
}

async function handleUpdateUserById(req,res){
    const body = req.body;
    await User.findByIdAndUpdate(id,{lastName:"Updated"});
    return res.status(201).json({msg:"updated successfully!"});
}

async function handleDeleteUserById(req,res){
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).json({msg:"deleted successfully!"});
}

async function handleCreateNewUser(req,res){
    const body = req.body;
   
    if(!body || !body.first_name || !body.email){
        return res.status(400).json({err:"First Name and Email are required fields"});
    }

    const result = await User.create({
       firstName : body.first_name,
       lastName: body.last_name,
       email: body.email,
       gender: body.gender,
       jobTitle: body.job_title
    });

    console.log(result);

    return res.status(201).json({message:"User created successfully"});
}

module.exports = {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser}