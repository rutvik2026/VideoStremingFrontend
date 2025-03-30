import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState} from "react";
import Container from "react-bootstrap/esm/Container";
import axios from "axios"; 




export const Register = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avtar: null,
  });
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "files" ? files[0] : value,
    }));
  };
  const register = async () => {
    const data = new formData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.avtar) {
      data.append("avtar", formData.avtar);
    }
    try {
      const response = await axios.post("/api/user/v1/register", data);
      if (response.data.succes) {
        console.log("user register succesfully");
        
      } else {
        console.log("user is already exist!");
        alert("user already exist please login");
       
      }
    } catch (error) {
      if (error.response) {
        console.log("server respoding with", error.response.message);
        alert("Registration failled");
      } else {
        console.log("error during registration", error);
        alert("Registration failed");
      }
    }
  };
  return (
    <>
    
      <Container className="d-flex flex-column w-20 h-40 ">
        <h1>Register</h1>

        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleChange}
          required
          placeholder="Enter Name"
        ></input>
        <label>Profile Picture</label>
        <input
          type="file"
          value={formData.avtar || ""}
          name="avtar"
          placeholder="Select Profilr Picture"
          onChange={handleChange}
          required
        ></input>
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          name="email"
          required
          placeholder="Enter Email"
          onChange={handleChange}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={formData.password}
          name="password"
          required
          placeholder="Enter Password"
          onChange={handleChange}
        ></input>
        <Button onClick={register} verient="primary">
          Register
        </Button>
       
      </Container>
      
    </>
  );
};
