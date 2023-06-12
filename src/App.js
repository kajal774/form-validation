
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [formdata, setformdata] = useState({ username: "", email: "", password: "" });
  const [error, seterror] = useState({})
  const [issubmit, setissubmit] = useState(false)
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value })
    console.log(formdata)

  }
  const handlesubmit = (e) => {
    e.preventDefault();
    seterror(validate(formdata));
    setissubmit(true)

  }
  useEffect(() => {
    if (Object.keys(error).length === 0 && issubmit) {
      console.log(formdata)
    }

  }, [formdata])
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "username is required";
    }
    if (!values.email) {
      errors.email = "email is required";
    } 
    else if (!regex.test(values.email)) {
      errors.email = "this ia not the valid email format!"
    }
    if (!values.password) {
      errors.password = "password is required"
    } else if (values.password.length < 4) {
      errors.password = "password must be more than 4 characters"
    }
    else if (values.password.length > 10) {
      errors.password = "password cannot exceed more tha 10 characters"
    }
    return errors;



  }

  return (
    <div>
       {(Object.keys(error).length === 0 && issubmit)?<div style={{color:'green'}}>success</div>:<pre>{JSON.stringify(formdata)}</pre>}
      
      <form onSubmit={handlesubmit}>
        <label>user name</label>
        <input type='text' placeholder='enter user name' name='username' value={formdata.username} onChange={handlechange}></input>
        <p>{error.username}</p>
        <label>user email</label>
        <input type='email' placeholder='enter user email' name='email' value={formdata.email} onChange={handlechange}></input>
        <p>{error.email}</p>
        <label>password</label>
        <input type='password' placeholder='enter password' name="password" value={formdata.password} onChange={handlechange}></input>
        <p>{error.password}</p>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default App;
