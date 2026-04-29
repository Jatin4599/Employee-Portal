const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "mysql",
  user: "employeeuser",
  password: "StrongPass123!",
  database: "employee_db"
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/employees", (req, res) => {
  const { name, role } = req.body;

  db.query(
    "INSERT INTO employees (name, role) VALUES (?, ?)",
    [name, role],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: "Employee Added" });
      }
    }
  );
});

app.put("/employees/:id", (req, res) => {
  const { name, role } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE employees SET name=?, role=? WHERE id=?",
    [name, role, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: "Employee Updated" });
      }
    }
  );
});

app.delete("/employees/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM employees WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: "Employee Deleted" });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});

// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// let employees = [];

// app.get("/", (req,res)=>{
//  res.send("Backend Running");
// });

// app.get("/employees",(req,res)=>{
//  res.json(employees);
// });

// app.post("/employees",(req,res)=>{
//  employees.push(req.body);
//  res.send("Employee Added");
// });

// app.listen(5000,()=>{
//  console.log("Server Running on 5000");
// });