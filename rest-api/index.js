const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

//connection

mongoose.connect("mongodb://127.0.0.1:27017/app-1")
.then(()=>console.log("MongoDB Connected!"))
.catch((err)=>{
    console.log("Could not connect due to error: ",err);
})

//schema

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender:{
        type:String
    },
}, {
    timestamps:true
});

//model

const User = mongoose.model("User",userSchema);

//Routes

//html like
app.get("/users",async(req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
      ${allDbUsers.map((user)=> `<li>${user?.firstName} - ${user?.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

//api
app.get("/api/users",async(req,res)=>{
    const allDbUsers = await User.find({});
    res.json(allDbUsers);
});

app.use(express.urlencoded({extended:false}));

app.post("/api/users",async(req,res)=>{
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
});

app.get("/api/users/:id",async(req,res)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    if(user===undefined)
      res.json("User not found!");
    res.json(user);
});


app.patch("/api/users/:id", async(req,res)=>{
    const id = req.params.id;
    await User.findByIdAndUpdate(id,{lastName:"Updated"});
    return res.status(201).json({msg:"updated successfully!"});
});

app.delete("/api/users/:id", async(req,res)=>{
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).json({msg:"deleted successfully!"});
});

//alternate way

// app.route("/api/users/:id")
// .get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user?.id===id);
//     res.json(user);
// })
// .patch((req,res)=>{
//     const id = Number(req.params.id);
//     res.send(`user with id ${id} updated successfully`);
// })
// .delete((req,res)=>{
//     const id = Number(req.params.id);
//     res.send(`user with id ${id} deleted successfully!`);
// });

app.listen(PORT, ()=>{
    console.log(`Server started successfully at Port ${PORT}`);
});