import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import "./Register.css";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";

export const History = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("cust");
    const { id } = token ? JSON.parse(token) : {};
    console.log("id", id);
    const fetchHistoryVideos = async () => {
      try {
        const res = await axios.get("/api/user/v1/historyvidios", {
          params: { q: id },
        });
        console.log(res.data);
        setVideos(res.data);
      } catch (error) {
        console.log("Error in fetchHistoryVideo", error);
      }
    };
    fetchHistoryVideos();
  }, []);
  const toVideoPlayer = (video) => {
    navigate("/video", { state: { video: video } });
  };
  console.log("video", videos);
  return (
    <div>
      <h1 className="text-primary d-flex justify-content-center ">History</h1>
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
