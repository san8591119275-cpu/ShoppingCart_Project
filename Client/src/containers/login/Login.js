import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigations/Routes";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function onUserSubmit() {
    let errors = false;
    let error = { email: "", password: "" };

    if (form.email.trim().length == 0) {
      errors = true;
      error = { ...error, email: "Email Empty !!!" };
    }
    if (form.password.trim().length == 0) {
      errors = true;
      error = { ...error, password: "Password Empty !!!" };
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      loginRequest();
    }
  }

  function loginRequest() {
    try {
      axios
        .post("http://localhost:1217/login", form)
        .then((d) => {
          localStorage.setItem("id", d.data.id);
          localStorage.setItem("role", d.data.role);
          if (d.data.role == "admin") navigate(ROUTES.universityAdmin.name);
          else navigate(ROUTES.home.name);
        })
        .catch((e) => {
          alert("wrong username / pwd");
        });
    } catch (error) {
      alert("Unable to login user");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4">Email</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.email}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Password</label>
              <div className="col-lg-8">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.password}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              onClick={() => {
                onUserSubmit();
              }}
              className="btn btn-info"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
