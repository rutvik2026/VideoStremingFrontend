import Navigation from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import {HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Register2 from "./Pages/Register2";
import { Login } from "./Pages/Login";
import "./App.css";
import Protected from "./Components/Protected";
import { Home } from "./Pages/Home.jsx";
import { Upload } from "./Pages/Upload.jsx";
import VideoPlayer from "./Pages/VideoPlayer";
import { Liked } from "./Pages/Liked";
import { WatchLater } from "./Pages/WatchLater";
import History  from "./Pages/History";
import { YourVideo } from "./Pages/YourVideos";
import { Subscription } from "./Pages/Subscription";
import { AuthProvider } from "./Components/AuthController";
function App() {
  

  
  const handleLogout=()=>{
    sessionStorage.removeItem("token");
  } 

  return (
    <>
      <AuthProvider>
      <Router>
        
          <Navigation onLogout={handleLogout} classname="sidebar" />
       
        <Routes>
          <Route
            path="/home"
            element={
             
                <div className="content w-100 h-100">
                  <Home />
                </div>
          
            }
          />
          <Route
            path="/upload"
            element={
              <Protected>
                <div className="content">
                  <Upload />
                </div>
              </Protected>
            }
          />
          <Route
            path="/video"
            element={
           
                <div className="content">
                  <VideoPlayer />
                </div>
             
            }
          />
          <Route
            path="/likedvideos"
            element={
              <Protected>
                <div className="content">
                  <Liked />
                </div>
              </Protected>
            }
          />
          <Route
            path="/watchlater"
            element={
              <Protected>
                <div className="content">
                  <WatchLater />
                </div>
              </Protected>
            }
          />
          <Route
            path="/history"
            element={
              <Protected>
                <div className="content">
                  <History />
                </div>
              </Protected>
            }
          />
          <Route
            path="/yourvideos"
            element={
              <Protected>
                <div className="content">
                  <YourVideo />
                </div>
              </Protected>
            }
          />
          <Route
            path="/subscription"
            element={
              <Protected>
                <div className="content">
                  <Subscription />
                </div>
              </Protected>
            }
          />
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register2 />} />
        </Routes>
      </Router>
      </AuthProvider>
    </>
  );
}

export default App;
