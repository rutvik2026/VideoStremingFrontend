import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export const Upload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [thumbnail,setThumbnail]=useState(null);
  const cust = sessionStorage.getItem("cust");
  const { id,name } = cust ? JSON.parse(cust) : {}; // Handle null case
 const base_url=import.meta.env.VITE_BASE_URL;
  console.log("User ID:", id);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a video file before uploading.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    // Ensure the file is appended correctly
    data.append("channelId", id);
    data.append("channelName", name);
    if(file){
      data.append("video", file); 
    }else{
      alert("select video file 1st");
    }
    if(thumbnail){
      data.append("avtar", thumbnail);
    }else{
      alert("select thumbnail 1stly");
    }
     console.log("frontend data",data);
    try {
   
      const res = await axios.post(`${base_url}/api/user/v1/uploadvideo`, // Ensure correct API URL
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Video uploaded successfully:", res.data);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <Container className="d-flex justify-content-center align-items-center  w-100 h-100">
        <Form
          onSubmit={handleUpload}
          className="border border-primary rounded-4 mt-5 p-4"
        >
          <h1 className="text-primary text-center">Upload Video</h1>

          {/* Title Input */}
          <Form.Group controlId="formTitle" className="mt-3">
            <Form.Label className="mt-2 text-primary text-center">
              Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={formData.title}
              name="title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Form.Group>

          {/* Description Input */}
          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label className="mt-2 text-primary text-center">
              Description
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Give video description"
              value={formData.description}
              name="description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formThumbnail" className="mt-3">
            <Form.Label className="mt-2 text-primary text-center">
              Thumbnail
            </Form.Label>
            <Form.Control
              type="file"
              name="formThumbnail"
              placeholder="Give thumbnail of video"
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formVideo" className="mt-3">
            <Form.Label className="mt-2 text-primary text-center">
              Video
            </Form.Label>
            <Form.Control
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </Form.Group>

          {/* Upload Button */}
          <Button type="submit" variant="primary" className="mt-4 w-100">
            Upload
          </Button>
        </Form>
      </Container>
    </div>
  );
};
