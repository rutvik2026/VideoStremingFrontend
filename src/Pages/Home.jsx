import { useEffect, useState } from "react"
import "./Register.css";
import axios from "axios";
import Cards from "./Cards";

import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [search,setSearch]=useState();
    const [videos,setVideos]=useState([]);
    const navigate=useNavigate();
    const base_url=import.meta.env.VITE_BASE_URL;
   useEffect(()=>{
     const fetchVideo=async()=>{
      try {
      const res = await axios.get(`${base_url}/api/user/v1/getvideo`,{
        params:{q:search}
      });
      setVideos(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error during video retraiveing",error);
    }
     }
     fetchVideo();
   },[search]);
   const toVideoPlayer=(video)=>{
      navigate("/video",{state:{video:video}});
   }
  return (
    <div className="ms-4  w-100 h-100">
      <div className="d-flex  w-100 h-25">
        <div>
          <input
            type="text"
            name="searchbar"
            placeholder="Search videos"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="mt-3 custom-input "
          />

          <div className=" d-flex flex-wrap mt-3 ">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.id} className="video-card ms-3 mt-3" onClick={()=>{toVideoPlayer(video);}}>
                  <Cards
                    id={video._id}
                    Img={video.thumbnail || ""}
                    title={video.title}
                    description={
                      video.description || "No description available"
                    }
                    channelName={video.channelName}
                  ></Cards>
                </div>
              ))
            ) : (
              <p>No videos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

