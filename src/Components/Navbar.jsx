import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import {
  FaHome,
  FaUpload,
  FaHistory,
  FaRegClock,
  FaPlay,
  FaThumbsUp,
} from "react-icons/fa"; // Icons for mobile navbar

const Navigation = () => {
  return (
    <>
      {/* Sidebar for Desktop */}
      <Navbar className="bg-black d-none d-md-flex flex-column sidebar">
        <Container fluid className="flex-column">
          <Nav className="flex-column">
            <Navbar.Brand className="text-primary mt-2 fs-2">
              RBTube
            </Navbar.Brand>
            <Nav.Link to="/home" className="text-primary mt-5 fs-3">
              Home
            </Nav.Link>
            <Nav.Link to="/upload" className="text-primary mt-3 fs-3">
              Upload
            </Nav.Link>
            <Nav.Link href="/subscription" className="text-primary mt-3 fs-3">
              Subscriptions
            </Nav.Link>
            <Nav.Link href="/history" className="text-primary mt-3 fs-3">
              History
            </Nav.Link>
            <Nav.Link href="/watchlater" className="text-primary mt-3 fs-3">
              Watch Later
            </Nav.Link>
            <Nav.Link href="/yourvideos" className="text-primary mt-3 fs-3">
              Your Videos
            </Nav.Link>
            <Nav.Link href="/likedvideos" className="text-primary mt-3 fs-3">
              Liked Videos
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Bottom Navbar for Mobile */}
      <Navbar className="bg-black text-white d-flex d-md-none fixed-bottom">
        <Container className="d-flex justify-content-around">
          <Nav.Link href="/home" className="text-white fs-4">
            <FaHome />
          </Nav.Link>
          <Nav.Link href="/upload" className="text-white fs-4">
            <FaUpload />
          </Nav.Link>
          <Nav.Link href="/history" className="text-white fs-4">
            <FaHistory />
          </Nav.Link>
          <Nav.Link href="/watchlater" className="text-white fs-4">
            <FaRegClock />
          </Nav.Link>
          <Nav.Link href="/yourvideos" className="text-white fs-4">
            <FaPlay />
          </Nav.Link>
          <Nav.Link href="/likedvideos" className="text-white fs-4">
            <FaThumbsUp />
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
