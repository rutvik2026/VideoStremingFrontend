import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import "./Register.css";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";

export const YourVideo = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("cust");
    const { id } = token ? JSON.parse(token) : {};
    console.log("id", id);
    const fetchYourVideos = async () => {
      try {
        const res = await axios.get("/api/user/v1/yourvidios", {
          params: { q: id },
        });
        console.log(res.data);
        setVideos(res.data);
      } catch (error) {
        console.log("Error in fetchYourVideo", error);
      }
    };
    fetchYourVideos();
  }, []);
  const toVideoPlayer = (video) => {
    navigate("/video", { state: { video: video } });
  };
  console.log("video", videos);
  return (
    <div>
      <h1 className="text-primary d-flex justify-content-center">MY Videos</h1>
      <div className=" d-flex flex-wrap mt-3 ">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="video-card ms-3 mt-3"
              onClick={() => {
                toVideoPlayer(video);
              }}
            >
              <Cards
                id={video._id}
                Img={video.thumbnail || ""}
                title={video.title}
                description={video.description || "No description available"}
                channelName={video.channelName}
              ></Cards>
            </div>
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>
    </div>
  );
};
