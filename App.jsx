import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);

  const addStudent = () => {
    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }).then(() => getStudents());
  };

  const getStudents = () => {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="container">

      <h1>Student Registration</h1>

      <div className="form-box">
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      <h2>Student List</h2>

      <div className="list">
        {students.map((s) => (
          <div className="card" key={s.id}>
            <p><b>Name:</b> {s.name}</p>
            <p><b>Email:</b> {s.email}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;