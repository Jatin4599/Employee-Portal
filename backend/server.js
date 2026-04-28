const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let employees = [];

app.get("/", (req,res)=>{
 res.send("Backend Running");
});

app.get("/employees",(req,res)=>{
 res.json(employees);
});

app.post("/employees",(req,res)=>{
 employees.push(req.body);
 res.send("Employee Added");
});

app.listen(5000,()=>{
 console.log("Server Running on 5000");
});