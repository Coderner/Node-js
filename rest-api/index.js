const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
const connectMongoDb  = require("./connection");
const userRouter = require("./routes/user");

//connection

connectMongoDb("mongodb://127.0.0.1:27017/app-1")
.then(()=>console.log("MongoDB Connected!"))
.catch((err)=>{
    console.log("Could not connect due to error: ",err);
});


//middleware

app.use(express.urlencoded({extended:false}));

//Routes

app.use("/api/users",userRouter);


app.listen(PORT, ()=>{
    console.log(`Server started successfully at Port ${PORT}`);
});