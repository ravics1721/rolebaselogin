import React from "react";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  return (
    <div>
      <div className="all-center">
        <h1 className="">Welcome to role base auth system</h1>
        <div className="d-flex flex-row">
          <button
            onClick={(e) => history.push("/login")}
            className="btn  btn-dark m-5"
          >
            Login 😃
          </button>
          <button
            onClick={(e) => history.push("/register")}
            className="btn btn-info m-5"
          >
            Register 🙏
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
