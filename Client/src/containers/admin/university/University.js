import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import ROUTES from '../../../navigations/Routes';

function University() {
  const Navigate = useNavigate();
  const [universities, setUniversities] = useState(null);
  const [universityId, setUniversityId] = useState(null);
  const [form, setForm] = useState({name:"",image:null});
  const [formError, setFormError] = useState({ name: "", image: null });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
   useEffect(() => {
    getAll();
    console.log(universities);
  }, []);
  function getAll() {
    axios.get("http://localhost:1217/university").then((d) => {
      setUniversities(d.data.uniData);
    });
  }    
  function renderUniversities() {
    return universities?.map((item) => {
      
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
            <button className='btn btn-success' onClick={() => {
              Navigate(ROUTES.departmentAdmin.name + "?id=" + item._id + "&name=" + item.name);
            }}>Add Department</button>
          </th>
          <th>
            <button className='btn btn-danger' onClick={() => { deleteUniversity(item._id) }}>Delete</button>
          </th>
          <th>
            <button className='btn btn-info' onClick={() => {
              setUniversityId(item._id);
              setForm({...form, name: item.name });
            }}
            >Edit</button>
          </th>
        </tr>
      )
    }); 
  }
  function deleteUniversity(id)
  {
    let ans = window.confirm('Want to delete data?');
    if (!ans) return;
    axios.delete("http://localhost:1217/university", { data: { id: id } }).then(() => {
      getAll();
    }).catch((e) => {
      alert(e.response?.data?.message);
    });
  } 
  
  function onUniversitySubmit()
  {
    let errors = false;
    let error ={ name:"", image:null};
    if (form.name.trim().length == 0)
    {
      errors = true;
      error = { ...error, name: "PL Enter Name!!!" };
    }
    if (form.image == null)
    {
      errors = true;
      error = { ...error, image: "PL Select Image!!!" };
    }
    if (errors)
    {
      setFormError(error)
    }
    else
    {
      setFormError(error)
      {
        universityId ? updateUniversity() : saveUniversity();
      }
    };
  }
  function saveUniversity() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      axios.post("http://localhost:1217/university", formData, {
        "content-type": "multipart/form-data",
      })
        .then((d) => {
          alert("data Saved");
          resetForm();
          getAll();
        });
    } catch (error) {
      console.error("failed to submitdata");
    }
  }
  function updateUniversity() {
    try {
      const formData = new FormData();
      formData.append("id", universityId);
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      axios.put("http://localhost:1217/university", formData, {
        "content-type": "multipart/form-data",
      })
        .then((d) => {
          alert("data updated");
          getAll();
        });
    } catch (error) {
      console.error("failed to updatedata");
    }
  }
  function resetForm() {
    setForm({ name: "", image: null });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className='row p-2 m-2'>
        <div class="card text-center mx-auto">
  <div class="card-header" >
    {universityId? "Edit University":"New University"}
  </div>
  <div class="card-body">
            <div className='form-group row'>
              <label for='txtname' className='col-lg-4'>University Name</label>
              <div className='col-lg-8'>                
                <input id='txtname' type='text' name='name' className='form-control' placeholder='Name' onChange={changeHandler} value={form.name}></input>
                <p className='text-danger'>{formError.name }</p>
              </div>
            </div>
             <div className='form-group row'>
              <label className='col-lg-4'>University Image</label>
              <div className='col-lg-8'>
                <input type='file' className='form-control'
                  onChange={(e) => { 
                    let file = e.target.files[0]
                    setForm({ ...form, image: file });
                  }}></input>
                <p className='text-danger'>{formError.image }</p>
              </div>
            </div>
  </div>
  <div class="card-footer text-muted">
            {universityId ? (
              <button className='btn btn-info' onClick={()=>{onUniversitySubmit()}}>Update</button>
            ) : (
                <button className='btn btn-success' onClick={()=>{onUniversitySubmit()}}>Save</button>
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
              <th>Add Department</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderUniversities()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default University;