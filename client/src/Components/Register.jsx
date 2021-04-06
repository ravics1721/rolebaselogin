import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "./request";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    console.log({ name, email, password, role });
    registerUser(name, email, role, password)
      .then((res) => {
        if (res.status === 200) {
          setMessage(res.data.message);
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        setError(`Error: ${err.message}`);
      });
  };
  return (
    <div className="all-center">
      <form onSubmit={handleRegister}>
        <h1 className="text-center mb-5">Register To Application</h1>
        {message && <h2 className="alert alert-success m-1">{message}</h2>}
        {error && <h2 className="alert alert-danger m-1">{error}</h2>}
        <div class="mb-3 row ">
          <label for="name">Name:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
        </div>
        <div class="mb-3 row ">
          <label for="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <div class="mb-3 row ">
          <label for="role">Role</label>
          <select
            onChange={(e) => setRole(e.target.value)}
            name="role"
            id="role"
            required
          >
            <option value="">--Select--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="mb-3 row">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <div class="mb-3 row">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
