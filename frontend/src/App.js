import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchEmployees = () => {
    axios.get("http://localhost:5000/employees")
      .then((res) => {
        setEmployees(res.data);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = () => {
    axios.post("http://localhost:5000/employees", {
      name,
      role
    }).then(() => {
      setName("");
      setRole("");
      fetchEmployees();
    });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => fetchEmployees());
  };

  const startEdit = (emp) => {
    setName(emp.name);
    setRole(emp.role);
    setEditId(emp.id);
  };

  const updateEmployee = () => {
    axios.put(`http://localhost:5000/employees/${editId}`, {
      name,
      role
    }).then(() => {
      setName("");
      setRole("");
      setEditId(null);
      fetchEmployees();
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Portal</h1>

      <h2>{editId ? "Edit Employee" : "Add Employee"}</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br /><br />

      {editId ? (
        <button onClick={updateEmployee}>Update Employee</button>
      ) : (
        <button onClick={addEmployee}>Add Employee</button>
      )}

      <hr />

      <h2>Employee List</h2>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.role}{" "}
            <button onClick={() => startEdit(emp)}>Edit</button>{" "}
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
// function App() {
//   return (
//     <div>
//       <h1>Employee Portal</h1>
//     </div>
//   );
// }

// export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
