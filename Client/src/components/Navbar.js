import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ROUTES from "../navigations/Routes";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let usr = localStorage.getItem("id");
    if (usr) setUser(usr);
  }, []);

  function renderMenu() {
    if (user) {
      return (
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link className="nav-link" to={ROUTES.universityAdmin.name}>
              University Management
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={ROUTES.home.name}>
              User Management
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={ROUTES.home.name}>
              Order Management
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.Cart.name +"?id="+localStorage.id }>
              <FaShoppingCart></FaShoppingCart>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.home.name}>
              <li class="fa-solid fa-cart-shopping"></li>
            </Link>
            
          </li>
        </ul>
      );
    } else {
      return <ul class="navbar-nav mr-auto"></ul>;
    }
  }

  function renderButtons() {
    if (user) {
      return (
        <div>
          
          <a
            class="btn btn-outline-danger my-2 my-sm-0 m-1"
            onClick={() => {
              localStorage.clear();
              navigate(ROUTES.login.name);
            }}
          >
            Logout
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <Link
            class="btn btn-outline-success my-2 my-sm-0 m-1"
            to={ROUTES.login.name}
          >
            Login
          </Link>
          <Link
            class="btn btn-outline-success my-2 my-sm-0"
            to={ROUTES.register.name}
          >
            Register
          </Link>
          
        </div>
      );
    }
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {renderMenu()}
          {renderButtons()}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
