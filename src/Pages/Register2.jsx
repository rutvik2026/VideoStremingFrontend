import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avtar: null,
  });

  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data=new FormData();
    data.append("name",formData.name);
    data.append("password",formData.password);
    data.append("email",formData.email);
    if (formData.avtar) {
        data.append("avtar",formData.avtar);
    }
     try {
       const base_url=import.meta.env.VITE_BASE_URL;
       console.log("base urk 23",base_url,data);
        const res = await axios.post(`${base_url}/api/user/v1/register`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Axios will automatically set the boundary
            },
          }
        );
        if (res.data.success) {
          alert("Registered successfully");
          navigate("/login");
        } else {
          alert("User already exist ,Please login.");
          navigate("/login");
        }
     } catch (error) {
        console.log("error during Registration1",error);
     }
    
  };

  return (
    <Container className="container register mt-3">
      <h1 className="m-3 d-flex justify-content-center text-white">
        Registration Form
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="m-3">
          <Form.Label className="m-3 d-flex justify-content-center text-white">
            Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoto" className="m-3">
          <Form.Label className="m-3 d-flex justify-content-center text-white">
            Profile Photo
          </Form.Label>
          <Form.Control
            type="file"
            name="avtar"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="m-3">
          <Form.Label className="m-3 d-flex justify-content-center text-white">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="m-3">
          <Form.Label className="m-3 d-flex justify-content-center text-white">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter Password"
            pattern="^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
            title="Password must be at least 8 characters long and contain at least one special character."
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" verient="primary" className="mt-4 w-100">
          Register
        </Button>
        <Link
          className="m-3 d-flex justify-content-center text-decoration-none"
          to={"/login"}
        >
          Go To Login
        </Link>
      </Form>
    </Container>
  );
};

export default Register2;
