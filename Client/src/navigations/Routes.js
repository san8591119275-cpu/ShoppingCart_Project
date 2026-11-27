import About from "../containers/about/About";
import Department from "../containers/admin/department/Department";
import Product from "../containers/admin/product/Product";
import University from "../containers/admin/university/University";
import Contact from "../containers/contact/Contact";
import Login from "../containers/login/Login";
import Register from "../containers/register/Register";
import Cart from "../containers/user/cart/Cart";
import CheckoutForm from "../containers/user/cart/CheckoutForm";
import UserDepartment from "../containers/user/department/UserDepartment";
import Home from "../containers/user/home/Home";
import UserProduct from "../containers/user/product/UserProduct";
import ProductDetail from "../containers/user/productDetail/ProductDetail";

const ROUTES = {
   about: {
      name: "/about",
      component:<About/>
   },
    contact: {
      name: "/contact",
      component:<Contact/>
   },
     register: {
      name: "/register",
      component:<Register/>
   },
      login: {
      name: "/login",
      component:<Login/>
   },
      universityAdmin: {
      name: "/university",
      component:<University/>
   },
      departmentAdmin: {
      name: "/departmentAdmin",
      component:<Department/>
   },
      productAdmin: {
      name: "/productAdmin",
      component:<Product/>
   },
      home: {
      name: "/",
      component:<Home/>
   },
      department: {
      name: "/department",
      component:<UserDepartment/>
   },
      product: {
      name: "/product",
      component:<UserProduct/>
   },
      productDetail: {
      name: "/productDetail",
      component:<ProductDetail/>
   },
   Cart: {
      name: "/cartdetails",
      component:<Cart></Cart>
  },
  CheckoutForm:{
   name:"/Cart",
   component:<CheckoutForm></CheckoutForm>
  }
};
export default ROUTES; 