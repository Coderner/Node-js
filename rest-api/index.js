const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

//Routes

//html like
app.get("/users",(req,res)=>{
    const html = `
    <ul>
      ${users.map((user)=> `<li>${user?.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

//api
app.get("/api/users",(req,res)=>{
    res.json(users);
});

app.use(express.urlencoded({extended:false}));

app.post("/api/users",(req,res)=>{
    const val = req.body;
    console.log(val);
    users.push({
        id: users.length+1,
        first_name : val.first_name,
        last_name: val.last_name,
        email: val.email,
        gender: val.gender,
        job_title: val.job_title
    });
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err, data)=>{
        return res.json({status:"success", id:users.length})
    })
});

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user?.id===id);
    if(user===undefined)
      res.json("User not found!");
    res.json(user);
});


app.patch("/api/users/:id", (req,res)=>{
    const id = Number(req.params.id);

    const index = users.findIndex((user)=>user?.id===id);

    if(index===-1)
        return res.json(`No user with id ${id} found!`);

    const val = req.body;

    console.log(users[index]);
    console.log(val);
    console.log(val);
    console.log({...users[index],...val});

    users[index] = {...users[index],...val};

    console.log(users[index]);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
         res.send(`user with id ${id} updated successfully`);
    });


});

app.delete("/api/users/:id", (req,res)=>{
    const id = Number(req.params.id);

    const index = users.findIndex((user)=>user?.id===id);

    console.log(index);

    if(index===-1)
        return res.json(`No user with id ${id} found!`);

    console.log(users.splice(index,1));

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json(`user with id ${id} deleted successfully!`);
    })
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