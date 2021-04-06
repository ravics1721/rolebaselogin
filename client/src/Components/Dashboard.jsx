import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getDashboard } from "./request";

const Dashboard = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getDashboard(token)
        .then((res) => {
          if (res.status === 200) {
            setMessage(res.data.message);
            setUser(res.data.user);
          }
        })
        .catch((err) => {
          setMessage(`Errror: ${err.message}`);
        });
    } else {
      history.push("/login");
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  function logout() {
    localStorage.removeItem("token");
    history.push("/");
  }
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-8">
          <h1 className="text-success">{message}</h1>
        </div>
        <div className="col-4">
          <button onClick={logout} className="btn btn-warning">
            Logout
          </button>
        </div>
      </div>
      <h2>
        Name: <span className="text-primary">{user?.name}</span>
      </h2>
      <h2>
        Email: <span className="text-primary">{user?.email}</span>
      </h2>
      <h3>
        Role: <span className="text-danger">{user?.role?.toUpperCase()}</span>
      </h3>
    </div>
  );
};

export default Dashboard;
