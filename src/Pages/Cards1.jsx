import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Cards({ Id,title, channelName, description, videoRef,likedCount ,channelId}) {
  const [isDiscription, setIsDiscription] = useState(false);
  const cust=sessionStorage.getItem("cust");
  const {id}=cust? JSON.parse(cust) : {};
 const base_url=import.meta.env.VITE_BASE_URL;
  const navigate =useNavigate();
  const handleDiscription = () => {
    setIsDiscription(!isDiscription);
  };
  const handleLike=async()=>{
    try {
      if(id){
        const res = await axios.post(`${base_url}/api/user/v1/like`, {userId:id,videoId:Id});
      console.log(res.data);
       if (!res.data.sucess) {
         alert("You are already Liked to this channel");
       } else {
         alert("You are liked to this video");
       }
      }else{
        alert("please log in to like this ");
        navigate("/login");
      }
    } catch (error) {
      console.log("error in handleLike",error);
    }
  };
  const handleWatchLater=async()=>{
      try {
        if(id){
          const res = await axios.post("/api/user/v1/watchlater", {
          userId: id,
          videoId:Id,
        });
        console.log(res.data);
         if (!res.data.sucess) {
           alert("You are remove this vidio from watch Later");
         } else {
           alert("You have add this video to watch Later");
         }
        }else{
          alert("please log in to add watchlater this ");
          navigate("/#/login");
        }
      } catch (error) {
        console.log("Error in handleWatchLeter",error);
      }
  };
  const handleSubscribe=async()=>{
    try {

     if(id){
        const res=await axios.post("/api/user/v1/subscribe",{userId:id,channelId:channelId});
      console.log(res.data);
      if(!res.data.sucess){
        alert("You are already subscribed to this channel");
      }else{
        alert("You have subscribed to this channel");
      }
     }else{
       alert("please log in to subscribe this ");
        navigate("/#/login");
     }
    } catch (error) {
      console.log("Error in handleSubscribe",error);
    }
  };
  console.log("liked",likedCount);
  return (
    <Card style={{ width: "50rem" }}>
      {/* <video className="card-img-top" controls>
        <source src={indexM3u8} type="video/mp4" />
        Your browser does not support the video tag.
      </video>*/}
      <video ref={videoRef} controls />;
      <Card.Body>
        <Card.Title onClick={handleDiscription}>{title}</Card.Title>
        {isDiscription ? <Card.Text>{description}</Card.Text> : ""}
        

        
        <div className="d-flex m-2">
          <div>
            <Button varient="dark" onClick={handleLike} className="m-2">
              LIKE
            </Button>
            <Card.Text className="ms-2">{likedCount}</Card.Text>
          </div>
          <Button varient="dark" onClick={handleWatchLater} className="m-2">
            WatchLater
          </Button>
        </div>
        <Card.Text>{channelName}</Card.Text>
        <Button variant="primary" onClick={handleSubscribe}>
          Subscribe
        </Button>
      </Card.Body>
    </Card>
  );
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, // Used for both image and video
  videoRef: PropTypes.string.isRequired,
  Id:PropTypes.string.isRequired,
  likedCount:PropTypes.string.isRequired,
  channelId:PropTypes.string.isRequired,
};


export default Cards;
