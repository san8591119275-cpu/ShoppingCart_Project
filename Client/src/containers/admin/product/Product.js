import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



function useQuery()
{
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search),[search]);
}

function Product() {
  const queryparams = useQuery();   
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState(null);
  const [form, setForm] = useState({
    name: "",
    images: null,
    departmentId: queryparams.get("id"),
    description: "",
    qty: 10,
    price:"",
  });
  const [formError, setFormError] = useState({ name: "", images: null, description:"",qty:"" ,price:""});
  
  const onTextChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function onProductSubmit() {
    let errors = false;
    let error = { name: "", images: null,description:"",qty:"" };
    if (form.name.trim().length== 0)
    {
      errors = true;
      error = { ...error, name: "PL Enter Name!!!" };
    }
    if (form.images == null)
    {
      errors = true;
      error={...error,image:"PL Select Image!!! "}
    }
    if (form.description == null)
    {
      errors = true;
      error={...error,description:"PL Enter Description!!! "}
    }
    if (form.qty == ""|| form.qty==0)
    {
      errors = true;
      error={...error,qty:"PL Enter Qty!!! "}
    }
    if (form.price == ""|| form.price==0)
    {
      errors = true;
      error={...error,qty:"PL Enter Price!!! "}
    }
    if (errors)
    {
      setFormError(error);
    }
    else {
      setFormError(error);
      {
        productId ? updateProduct() : saveProduct();
      }
    }
  }
  function getAllProducts()
  {
    axios.get("http://localhost:1217/product?departmentId=" + queryparams.get("id")).then((d) => {
      setProducts(d.data.proData);
    });
  } 
  function resetForm() {
    setForm({ name: "", images: null,description:"",qty:10,price:"" });
  }
  useEffect(() => {
    getAllProducts();
    // console.log(products);
  }, []);
  function renderProducts()
  {
    return products?.map((item) => {
      return (
        <tr>
          <th>
            <img src={"http://localhost:1217/" + item.images[0]}
              height="150"
              width="150"
            ></img>
          </th>
          <th>{item.name}</th>
          <th>{item.description}</th>
          <th>{item.qty}</th>
          <th>{item.price }</th>
          <th>
            <button className='btn btn-danger'
              onClick={() => {
                deleteProduct(item._id);     
              }}
            >Delete</button>
          </th>         
          <th>
            <button className='btn btn-info'
              onClick={() => {                
                setProductId(item._id);
                setForm({ ...form, name: item.name,description:item.description,qty:item.qty,price:item.price });
            }}>Edit</button>
          </th>
        </tr>
      )
    })
  }
  function saveProduct()
  {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++){
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("departmentId", form.departmentId);
      formData.append("description", form.description);
      formData.append("qty", form.qty);
      formData.append("price", form.price);
      
      axios.post("http://localhost:1217/product", formData, {
        "content-type": "multipart/form-data",
      }).then(() => {
        alert("save Product");
        resetForm();
        getAllProducts();
      });
    } catch (error) {
      console.error("Failed To Submit Data")
    }
  };
  function updateProduct()
  {
    try {
      // alert("hello")
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++){
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("department", form.departmentId);
      formData.append("description", form.description);
      formData.append("qty", form.qty);
      formData.append("price", form.price);
      formData.append("id", productId);
      
      axios.put("http://localhost:1217/product", formData, {
        "content-type": "multipart/form-data",
      }).then(() => {
        alert("updated Product");
        resetForm();
        getAllProducts();
      });
    } catch (error) {
      console.error("Failed To Update Data")
    }
  }
   function deleteProduct(id)
  {
    let ans = window.confirm("Want To Delete Data");
    if (!ans) return;
     axios.delete("http://localhost:1217/product", { data: { id: id } }).then((d) => {
       getAllProducts();
     });
  }

  return (
    <div>
      <Navbar></Navbar>
       <div className='row p-2 m-2'>
        <div class="card text-center mx-auto">
  <div class="card-header" >
    {productId? "Edit Product":"New Product"}
  </div>
  <div class="card-body">
            <div className='form-group row'>
              <label className='col-lg-4'>Department Name</label>
              <div className='col-lg-8'>                
                <input
                  className='form-control'
                  disabled
                  value={queryparams.get("name")}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
            <div className='form-group row'>
              <label className='col-lg-4'>Product Name</label>
              <div className='col-lg-8'>                
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  placeholder='Name'
                  onChange={onTextChange}
                  value={form.name}
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
                  onChange={onTextChange}
                  value={form.description}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
            <div className='form-group row'>
              <label for="txtqty" className='col-lg-4'>Product Qty</label>
              <div className='col-lg-8'>                
                <input
                  id='txtqty'
                  type='number'
                  name='qty'
                  className='form-control'
                  placeholder='Name'
                  onChange={onTextChange}
                  value={form.qty}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
            <div className='form-group row'>
              <label className='col-lg-4'>price</label>
              <div className='col-lg-8'>                
                <input
                  type='number'
                  name='price'
                  className='form-control'
                  placeholder='price'
                  onChange={onTextChange}
                  value={form.price}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
             <div className='form-group row'>
              <label className='col-lg-4'>Product Image</label>
              <div className='col-lg-8'>
                <input type='file' className='form-control'
                  multiple onChange={(e) => { 
                    let files = e.target.files;
                    setForm({ ...form, images: files });
                  }}></input>
               
              </div>
            </div>
  </div>
  <div class="card-footer text-muted">
            {productId ? (
              <button className='btn btn-info' onClick={()=>{onProductSubmit()}}>Update</button>
            ) : (
                <button className='btn btn-success' onClick={()=>{onProductSubmit()}}>Save</button>
    )}
  </div>
</div>
      </div>
      <div className='border m-2 p-2'>
        <table className='table table-border table-stripe table-hover'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </div>
  )
}
export default Product;