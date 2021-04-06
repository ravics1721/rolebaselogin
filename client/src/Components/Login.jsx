import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "./request";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          history.push("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="all-center">
      <form onSubmit={handleLogin}>
        <h1 className="text-center mb-5">Login To Application</h1>
        <div class="mb-3 row ">
          <label for="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
