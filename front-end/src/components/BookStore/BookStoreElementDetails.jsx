import { useParams } from "react-router-dom";
import styles from "./BookStoreElementDetails.module.css";
import { useEffect, useState } from "react";

const ElementDetails = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState();
  const BASE_URL = `http://localhost:8000/api/book-store/${id}/`;

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.message}`);
        }
        return response.json();
      })

      .then((result) => setBookData(result))
      .catch((error) => console.log(error));
  }, []);
  return <></>;
};

export default ElementDetails;
