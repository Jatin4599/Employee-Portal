import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://4.224.48.22:5000";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch Employees
  const fetchEmployees = async () => {
    const res = await axios.get(`${API}/employees`);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !role) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await axios.put(`${API}/employees/${editId}`, { name, role });
      setEditId(null);
    } else {
      await axios.post(`${API}/employees`, { name, role });
    }

    setName("");
    setRole("");
    fetchEmployees();
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/employees/${id}`);
    fetchEmployees();
  };

  // Edit
  const handleEdit = (emp) => {
    setName(emp.name);
    setRole(emp.role);
    setEditId(emp.id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Employee Portal</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={styles.td}>{emp.id}</td>
              <td style={styles.td}>{emp.name}</td>
              <td style={styles.td}>{emp.role}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.actionBtn, backgroundColor: "#4CAF50" }}
                  onClick={() => handleEdit(emp)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.actionBtn, backgroundColor: "#f44336" }}
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "200px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#333",
    color: "white",
    padding: "10px",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  actionBtn: {
    padding: "5px 10px",
    margin: "0 5px",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default App;