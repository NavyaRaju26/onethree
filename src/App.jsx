import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [students,setStudents] = useState([]);

  const getStudents = () => {
    fetch("https://onethree-mkiz.onrender.com/students")
    .then(res => res.json())
    .then(data => setStudents(data));
  };

  const addStudent = () => {

    fetch("https://onethree-mkiz.onrender.com/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email})
    })
    .then(()=> {
      setName("");
      setEmail("");
      getStudents();
    });

  };

  useEffect(()=>{
    getStudents();
  },[]);

  return (

    <div className="container">

      <h1>Student Registration</h1>

      <div className="form-box">

        <input
          value={name}
          placeholder="Enter Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          value={email}
          placeholder="Enter Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button onClick={addStudent}>
          Add Student
        </button>

      </div>

      <h2>Student List</h2>

      {students.map((s)=>(
        <div key={s.id}>
          {s.name} - {s.email}
        </div>
      ))}

    </div>
  );
}

export default App;
