import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "./Cards1";
import axios from "axios";
import Cards2 from "./Cards2";
import "./VideoPayer.css"; // Import the CSS file

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const [search, setSearch] = useState();
  const [videos, setVideos] = useState([]);
  const video = location.state?.video || "";
  const navigate = useNavigate();
  const [id, setId] = useState();

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(video.indexM3U8Url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = video.indexM3U8Url;
    }
  }, [video.indexM3U8Url]);
  useEffect(() => {
    setId(video._id);
    if (video.title.length == 1) {
      setSearch(video.title);
    } else if (video.title.length == 2) {
      const str = video.title;
      const res = str.slice(0, 2);
      setSearch(res);
    } else {
      const str = video.title;
      const res = str.slice(0, 3);
      setSearch(res);
    }
  }, [video.title, video._id]);
  useEffect(() => {
    const makeHistory = async () => {
      try {
        const cust = sessionStorage.getItem("cust");
        const { id } = cust ? JSON.parse(cust) : {};
        const res = await axios.post("/api/user/v1/history", {
          userId: id,
          videoId: video._id,
        });
        console.log(res.data);
      } catch (error) {
        console.log("Error in makeHistory", error);
      }
    };
    makeHistory();
  }, [video._id]);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get("/api/user/v1/getvideo", {
          params: { q: search },
        });

        console.log("retraive data sujested video data", res.data);
        if (Array.isArray(res.data) && res.data.length === 0) {
          setSearch("");
        } else {
          setVideos(res.data);
        }
        console.log("retraive data2", res.data);
        console.log("video", videos);
      } catch (error) {
        console.log("Error retrieving video", error);
      }
    };
    fetchVideo();
  }, [search]);

  const toVideoPlayer = (video) => {
    navigate("/video", { state: { video: video } });
  };

  return (
    <div className="video-player-container container-fluid">
      <div className="row">
        {/* Video Player Section */}
        <div className="col-12 col-md-8 video-container">
          <Cards
            Id={video._id}
            indexM3u8={video.indexM3U8Url}
            title={video.title}
            videoRef={videoRef}
            description={video.description || "No description available"}
            channelName={video.channelName}
            likedCount={video.likedVideos}
            channelId={video.channelId}
          />
        </div>

        {/* Suggested Videos Section */}
        <div className="col-12 col-md-4 suggested-videos">
          {videos.length > 0 ? (
            videos
              .filter((video) => id !== video._id)
              .map((video) => (
                <div
                  key={video.id}
                  className="video-card"
                  onClick={() => toVideoPlayer(video)}
                >
                  <Cards2
                    id={video._id}
                    Img={video.thumbnail || ""}
                    title={video.title}
                    description={
                      video.description || "No description available"
                    }
                    channelName={video.channelName}
                  />
                </div>
              ))
          ) : (
            <p>No videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
