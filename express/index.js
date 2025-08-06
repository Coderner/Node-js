const express = require("express");

const app = express();

app.get("/", (req,res) =>{
    res.end("Hello This is home page");
});

app.get("/about", (req,res) =>{
    res.end("This is about page");
});

app.listen(8000, () => console.log("Server started successfully at port 8000"));