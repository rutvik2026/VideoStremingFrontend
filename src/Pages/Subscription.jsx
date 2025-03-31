import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import "./Register.css";
import { useNavigate } from "react-router-dom";
export const Subscription = () => {
  const [channels, setChannel] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const [selectedChannel,setSelectedChannel]=useState();
  
  useEffect(() => {
    const cust = sessionStorage.getItem("cust");
    const { id } = cust ? JSON.parse(cust) : {};

    const fetchChannel = async () => {
      try {
         const base_url=import.meta.env.VITE_BASE_URL;
        const res = await axios.get(`${base_url}/api/user/v1/subscription`, {
          params: { userId: id },
        });
        console.log(res.data);
        setChannel(res.data);
      } catch (error) {
        console.log("Error in fetchChsnnels", error);
      }
    };
    fetchChannel();
  }, []);
  const toGetVideo = async (channelId) => {
    setSelectedChannel(channelId);
    try {
      const base_url=import.meta.env.VITE_BASE_URL;
      const res = await axios.get(`${base_url}/api/user/v1/yourvidios`, {
        params: { q: channelId },
      });
      setVideos(res.data);
      console.log("videos", res.data);
    } catch (error) {
      console.log("Error in toGetVideo", error);
    }
  };
  const toVideoPlayer = (video) => {
    navigate("/video", { state: { video: video } });
  };
  return (
    <div>
      <h1 className="text-primary d-flex justify-content-center ">
        Your Subscription
      </h1>
      {channels.length > 0 ? (
        channels.map((channel) => (
          <div
            key={channel.id}
            onClick={() => {
              toGetVideo(channel._id);
            }}
          >
            <div
              style={{
                border:
                  selectedChannel === channel._id
                    ? "2px solid blue"
                    : "2px solid transparent",
                padding: "10px",
                cursor: "pointer",
              }}
              className="subscribe"
            >
              <Cards
                id={channel._id}
                channelName={channel.name}
                Img={channel.avtar}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      <h1 className="text-primary d-flex justify-content-center ">Videos</h1>
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
