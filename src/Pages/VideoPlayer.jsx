import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "./Cards1";
import axios from "axios";
import Cards2 from "./Cards2";
import "./VideoPayer.css";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [id, setId] = useState(null);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState(null);

  const video = location.state?.video || {};

  useEffect(() => {
    if (Hls.isSupported() && video.videoUrl) {
      const hls = new Hls();
      hls.loadSource(video.videoUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((level, index) => ({
          index,
          resolution: level.height + "p",
        }));
        setQualityLevels(levels);
      });

      if (selectedQuality !== null) {
        hls.currentLevel = selectedQuality;
      }

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = video.indexM3U8Url;
    }
  }, [video.videoUrl, selectedQuality]);

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
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/user/v1/getvideo", {
          params: { q: search },
        });
        console.log("retraive data sujested video data", res.data);
        setVideos(res.data.length ? res.data : []);
      } catch (error) {
        console.error("Error retrieving videos", error);
      }
    };
    fetchVideos();
  }, [search]);

  const toVideoPlayer = (video) => {
    navigate("/video", { state: { video } });
  };

  return (
    <Container fluid className="video-player-container">
      <Row>
        <Col md={8} className="video-container">
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
          {qualityLevels.length > 0 && (
            <select
              onChange={(e) => setSelectedQuality(Number(e.target.value))}
              className="quality-selector"
            >
              {qualityLevels.map(({ index, resolution }) => (
                <option key={index} value={index}>
                  {resolution}
                </option>
              ))}
            </select>
          )}
        </Col>

        <Col md={4} className="suggested-videos">
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
        </Col>
      </Row>
    </Container>
  );
};

export default VideoPlayer;
