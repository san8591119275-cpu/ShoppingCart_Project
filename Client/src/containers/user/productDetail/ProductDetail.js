 import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';
import {  FaShoppingCart } from 'react-icons/fa';

function useQuery()
{
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search),[search]);
}

function ProductDetail() {
  const navigate = useNavigate();
  const queryparams = useQuery();
  const [productDetails, setProductDetails] = useState(null);
  
  useEffect(() => {
    getProductDetails();
    //console.log(products);
  },[]);
  
  function getProductDetails() {
    //console.log(productDetails);
    axios.get("http://localhost:1217/productdetails?id=" + queryparams.get("id")).then((d) => {
      setProductDetails(d.data.proData);
    });
  }
  function SubmitData() {
    axios.post("http://localhost:1217/cart?productId=" + queryparams.get("id")).then((d) => {
      setProductDetails(d.data.catData);
      BacktoHome();
    });
  }
  function BacktoHome() {
    navigate(ROUTES.home.name)
  }
  function renderImages() {
    return productDetails?.images?.map((item) => {
      return (
        <img
          className='card-img-top '
          src={"http://localhost:1217/" + item}
          height="150"
          width="150"
         />
      );
    });
  }
  function renderProductDetails() {
    return (
      // <table className='table table-bordered table-hover table-stripped'>
      <div className='row p-2 m-2 mx-auto'>
       <div class="card text-center">
          <div class="card-header" >
            {renderImages()}
          </div>
           <div class="card-body">
            <div className='form-group row'>
              <label className='col-lg-4'>Product Name</label>
              <div className='col-lg-8'>                
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  placeholder='Name'                  
                  value={productDetails?.name}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
            <div className='form-group row'>
              <label className='col-lg-4'>Description</label>
              <div className='col-lg-8'>                
                <input
                  type='text'
                  name='description'
                  className='form-control'
                  placeholder='Description'                  
                  value={productDetails?.description}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
            <div className='form-group row'>
              <label className='col-lg-4'>Qty</label>
              <div className='col-lg-8'>                
                <input
                  type='number'
                  name='qty'
                  className='form-control'
                  placeholder='Qty'                  
                  // value={productDetails?.qty}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
            <div className='form-group row'>
              <label className='col-lg-4'>Price</label>
              <div className='col-lg-8'>                
                <input
                  type='number'
                  name='price'
                  className='form-control'
                  placeholder='Price'                  
                  value={productDetails?.price}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
        {/* <tr>
          <th>Images</th>
          <th>Product Name</th>
          <th>Description</th>
          <th>Qty</th>
          <th>price</th>
          
        </tr>
            <tr>
              
          <td>
            {renderImages()}</td>
          <td>{productDetails?.name}</td>
          <td>{productDetails?.description }</td>
          <td>{productDetails?.qty }</td>
            <td>{productDetails?.price}</td>
            </tr> */}
        </div>
        <div class="card-footer text-muted " >          
            <button className='text-white mx-auto bg-dark' onClick={() => {
             SubmitData()}}><FaShoppingCart></FaShoppingCart></button>          
          </div>
        </div>
        </div>
      // </table>
    )
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">{renderProductDetails()}</div>
      
    </div>
  );
}
export default ProductDetail;
