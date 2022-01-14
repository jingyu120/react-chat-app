import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();

  const submitForm = async () => {
    try {
      console.log(email, password);
      await createUserWithEmailAndPassword(auth, email, password);
      const data = { name, email, birthday, gender };
      axios.post("http://localhost:3001/createUser", data);
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="form">
      <h1>Registration</h1>

      <label>Name</label>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(event) => {
          setName(event.target.value);
        }}
        required
      />
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        required
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        required
      />
      <label>Birthday</label>
      <input
        type="date"
        placeholder="Enter birthday"
        onChange={(event) => {
          setBirthday(event.target.value);
        }}
        required
      />
      <label>Gender</label>
      <select
        value={gender}
        onChange={(event) => {
          setGender(event.target.value);
        }}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
}