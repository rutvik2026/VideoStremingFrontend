
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
function Cards(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.Img} alt="thumbnail" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.channelName}</Card.Text>
        
      </Card.Body>
    </Card>
  );
}
Cards.propTypes = {
  title: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired, 
  channelName: PropTypes.string.isRequired,
  Img: PropTypes.string.isRequired, 
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
};
export default Cards;
