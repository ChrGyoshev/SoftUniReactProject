import { useParams, useNavigate } from "react-router-dom";
import styles from "./BookStoreElementDetails.module.css";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";

const ElementDetails = () => {
  const { id } = useParams();
  const { token } = useUser();
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
        setTotalLikes(result.likes);
      })
      .catch((error) => console.log(error));

    fetch(`http://localhost:8000/api/book-store/like-list/${id}/`, {
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
        setIsLiked(result.isLiked);
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
      .then(() => {
        setIsLiked(!isLiked);
        setTotalLikes((prevTotalLikes) =>
          isLiked ? prevTotalLikes - 1 : prevTotalLikes + 1
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
            <div className={styles["like-btn-wrapper"]}>
              <button
                className={`${styles["likes-btn"]} ${
                  isLiked ? styles.active : ""
                }`}
                onClick={toggleLike}
              >
                <i className="fa fa-heart"></i>
                {isLiked ? "Unlike" : "Like"}
                <span>{totalLikes}</span>
              </button>
            </div>

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
                <button
                  onClick={() =>
                    navigate(`/catalogue/book-store/buy/${bookData.id}`)
                  }
                >
                  Buy now
                </button>

                <div>
                  <button onClick={() => navigate(-1)}>Cancel</button>
                </div>
                <div></div>
              </article>
            </article>
          </article>
        </article>
      </section>
    </>
  );
};

export default ElementDetails;
