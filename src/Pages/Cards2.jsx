import "./Register.css";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
function Cards2(props) {
  return (
    <Card style={{ width: "10rem" }}>
      <div className="d-flex bg-white">
        <Card.Img variant="top" src={props.Img} alt="thumbnail" />
        <Card.Body className="bg-white">
          <div >
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.channelName}</Card.Text>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}
Cards2.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  Img: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default Cards2;
