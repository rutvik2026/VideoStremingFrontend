
import { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import "./Register.css";
import { Form } from "react-bootstrap";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    });
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value,
        });
    }

    const handleSubmit=async(e)=>{
     e.preventDefault();
     try {
         const base_url=import.meta.env.base_url;
     const res =await axios.post(`${base_url}/api/user/v1/login`,formData);
      if(res.data.success){
        const {token,cust}=res.data;
       sessionStorage.setItem("cust", JSON.stringify(cust));
       sessionStorage.setItem("token",token);
        navigate("/home");
      }else{
        alert("Login failed, Please try again!");
      }
     } catch (error) {
      console.log("Error in Login",error);
     }
    }

  return (
    <div className="login container mt-4">
      <h1 className="mt-3 d-flex justify-content-center text-black">Login</h1>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group controlId="formemail" className="mt-3 ">
          <Form.Label className="d-flex justify-content-center text-white">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-4 ">
          <Form.Label className="d-flex justify-content-center text-white">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            name="password"
            pattern="^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
            title="Password must be at least 8 characters long and contain at least one special character."
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className="mt-4 w-100" type="submit">
          Login
        </Button>
        <Link
          to={"/register"}
          className="d-flex justify-content-center text-decoration-none mt-4"
        >
          Register
        </Link>
      </Form>
    </div>
  );
}
