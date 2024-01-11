import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <Spinner animation="border" role="status" className="spinner">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingSpinner;
