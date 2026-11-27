import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigations/Routes";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function onUserSubmit() {
    let errors = false;
    let error = { firstName: "", lastName: "", email: "", password: "" };
    if (form.firstName.trim().length == 0) {
      errors = true;
      error = { ...error, firstName: "First Name Empty !!!" };
    }
    if (form.lastName.trim().length == 0) {
      errors = true;
      error = { ...error, lastName: "Last Name Empty !!!" };
    }
    if (form.email.trim().length == 0) {
      errors = true;
      error = { ...error, email: "Email Empty !!!" };
    }
    if (form.password.trim().length == 0) {
      errors = true;
      error = { ...error, password: "Password Empty !!!" };
    }
    if (form.confirmPassword.trim().length == 0) {
      errors = true;
      error = { ...error, confirmPassword: "Confirm Password Empty !!!" };
    }
    if (form.password != form.confirmPassword) {
      errors = true;
      error = {
        ...error,
        confirmPassword: "Password and Confirm Password must be same !!!",
      };
    }
    if (!(form.password.length > 5 && form.password.length <= 12)) {
      errors = true;
      error = { ...error, password: "Password length bt 5 to 12 chars !!!" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
     // saveUser();
     checkDuplicateEmail();
    }
  }

  function saveUser() {
    try {
      
      //  alert(form.firstName);
      axios
        .post("http://localhost:1217/register", form)
        .then((d) => {
         
        
          alert(d.data.message);
          navigate(ROUTES.login.name);
        
            alert(d.data.message);
        
        })
        .catch((e) => {

        
            //console.log(e.d.data);
          alert("Email Id Already Exit!!");
         
        });
    } catch (error) {
      alert("Unable to register user");
    }
  }
  

  return (
    <div>
      <Navbar />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header">New User</div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4">First Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.firstName}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Last Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.lastName}</p>
              </div>
            </div>
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
            <div className="form-group row">
              <label className="col-lg-4">Confirm Password</label>
              <div className="col-lg-8">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.confirmPassword}</p>
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
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
