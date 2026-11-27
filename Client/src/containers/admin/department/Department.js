import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

function useQuery()
{
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search),[search]);
}

function Department() {
  const queryparams = useQuery();
  const Navigate = useNavigate();
  const [departmentId, setDepartmentId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    image: null,
    universityId: queryparams.get("id"),
  });
  const [formError, setFormError] = useState({ name: "", image: null });
  const [departments, setDepartments] = useState(null);
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function onDepartmentSubmit() {
    let errors = false;
    let error = { name: "", image: null };
    if (form.name.trim().length== 0)
    {
      errors = true;
      error = { ...error, name: "PL Enter Name!!!" };
    }
    if (form.image == null)
    {
      errors = true;
      error={...error,image:"PL Select Image!!! "}
    }
    if (errors)
    {
      setFormError(error);
    }
    else {
      setFormError(error);
      {
        departmentId? updateDepartment(): saveDepartment()
      }
    }
  }
  function getAll()
  {
    axios.get("http://localhost:1217/department?universityId=" + queryparams.get("id")).then((d) => {
      setDepartments(d.data.depData);
    });
  }
  function deleteDepartment(id)
  {
    let ans = window.confirm("Want To Delete Data");
    if (!ans) return;
    axios.delete("http://localhost:1217/department", { data: { id: id } }).then((c) => {
      getAll();
    }).catch((e) => {
      alert(e.response?.data.message);
    });
  }
  function resetForm() {
    setForm({ name: "", image: null });
  }
  useEffect((c) => {
    getAll();
    // console.log(departments);
  }, []);
  function renderDepartments()
  {
    return departments?.map((item) => {
      return (
        <tr>
          <th>
            <img src={"http://localhost:1217/" + item.image}
              height="150"
              width="150"
            ></img>
          </th>
          <th>{item.name}</th>
          <th>
            <button className='btn btn-info'
              onClick={() => {
                Navigate(ROUTES.productAdmin.name +
                  "?id=" +
                  item._id +
                  "&name=" +
                  item.name
                );
              }}
            >Add Product</button>
          </th>
          <th>
            <button className='btn btn-danger' onClick={() => {
              deleteDepartment(item._id);
            }}>Delete</button>
          </th>
          <th>
            <button className='btn btn-info'
              onClick={() => {                
                setDepartmentId(item._id);
                setForm({ ...form, name: item.name });
            }}>Edit</button>
          </th>
        </tr>
      )
    })
  }
  function saveDepartment()
  {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", form.universityId);
      
      axios.post("http://localhost:1217/department", formData, {
        "content-type": "multipart/form-data",
      }).then((d) => {
        alert("data saved");
        resetForm();
      });
    } catch (error) {
      console.error("Failed To Submit Data")
    }
  };
  function updateDepartment()
  {
    try {
      const formData = new FormData();
      formData.append("id", departmentId);
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", form.universityId);
      
      axios.put("http://localhost:1217/department", formData, {
        "content-type": "multipart/form-data",
      }).then((d) => {
        alert("data updated");
        resetForm();
      });
    } catch (error) {
      console.error("Failed To Update Data")
    }
  }

  return (
    <div>
      <Navbar></Navbar>
       <div className='row p-2 m-2'>
        <div class="card text-center mx-auto">
  <div class="card-header" >
    {departmentId? "update Department":"New Department"}
  </div>
  <div class="card-body">
            <div className='form-group row'>
              <label className='col-lg-4'>University Name</label>
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
              <label className='col-lg-4'>Department Name</label>
              <div className='col-lg-8'>                
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  placeholder='Name'
                  onChange={changeHandler}
                  value={form.name}
                ></input>
                </div>
                <p className='text-danger'></p>           
            </div>
             <div className='form-group row'>
              <label className='col-lg-4'>Department Image</label>
              <div className='col-lg-8'>
                <input type='file' className='form-control'
                  onChange={(e) => { 
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}></input>
                <p className='text-danger'>{formError.image }</p>
              </div>
            </div>
  </div>
  <div class="card-footer text-muted">
            {departmentId ? (
              <button className='btn btn-info' onClick={()=>{onDepartmentSubmit()}}>Update</button>
            ) : (
                <button className='btn btn-success' onClick={()=>{onDepartmentSubmit()}}>Save</button>
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
              <th>Add Product</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </div>
  )
}
export default Department;