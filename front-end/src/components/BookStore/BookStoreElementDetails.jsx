import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./BookStoreElementDetails.module.css";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";

const ElementDetails = () => {
  const { id } = useParams();
  const { user, token } = useUser();
  const [bookData, setBookData] = useState("");
  const BASE_URL = `http://localhost:8000/api/book-store/${id}/`;
  const LIKE_URL = `http://localhost:8000/api/book-store/like/${id}/`;
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.message}`);
        }
        return response.json();
      })

      .then((result) => {
        setBookData(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleLike = (e) => {
    e.preventDefault();
    fetch(LIKE_URL, {
      method: isLiked ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.message}`);
        }

        return response.json();
      })
      .then((result) => {
        setIsLiked(!isLiked);
        setTotalLikes((prevTotalLikes) =>
          isLiked ? Number(prevTotalLikes) - 1 : Number(prevTotalLikes) + 1
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <section className={styles["book-details-wrapper"]}>
        <article className={styles["book-details"]}>
          <div className={styles["book-details-image"]}>
            <img src={bookData.cover} alt="" />
          </div>
          <article className={styles["book-details-text"]}>
            <h1 className={styles["book-details-title"]}>{bookData.title}</h1>
            <h2 className={styles["book-details-author"]}>{bookData.author}</h2>
            <div className={styles["book-details-description"]}>
              <p className={styles.description}>
                {bookData.description
                  ? bookData.description
                  : "No description available"}
              </p>
            </div>
            <article className={styles["book-details-price"]}>
              <h1 className={styles["book-details-price-tag"]}>
                {`Price: ${bookData.price} лв`}
              </h1>
              <article className={styles["book-details-button-wrapper"]}>
                <div>
                  <button>Buy now</button>
                </div>
                <div>
                  <button onClick={() => navigate(-1)}>Cancel</button>
                </div>
              </article>
              <button onClick={toggleLike}>
                {isLiked ? "Unlike" : "Like"}
              </button>
              <span>Total Likes: {Number(totalLikes)}</span>
            </article>
          </article>
        </article>
      </section>
    </>
  );
};

export default ElementDetails;