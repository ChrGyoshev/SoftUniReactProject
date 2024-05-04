import { useParams, useNavigate } from "react-router-dom";
import styles from "./BuyBook.module.css";
import { useUser } from "../UserContext";
import { useState } from "react";


export default function BuyBook() {
  const { id } = useParams();
  const { token } = useUser();
  const BASE_URL = `http://localhost:8000/api/book-store/buy/${id}/`;
  const [isBuyed, setIsBuyed] = useState(false);
  const navigate = useNavigate();
  

  function buyHandler(e) {
    e.preventDefault();
    fetch(BASE_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("error");
        }
        setIsBuyed(true);
        setTimeout(() => {
          navigate("/catalogue/book-store/1");
        }, 4000);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="modular">
        <article className={styles["buy-book-article"]}>
          {isBuyed ? (
            <div className={styles["buy-book-done"]}>
              <p>
                Thank you for your purchase. Your book is on its way to you!
              </p>
              <img
                src="https://media2.giphy.com/media/FIhD2GIgRiAVEdaoDb/giphy.gif?cid=ecf05e478e6kts5si4m0byu61cath1xc4bbn1ppsnyxosqai&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                alt=""
              />
            </div>
          ) : (
            <div className={styles["buy-book-confirmation"]}>
              <p>Are you sure you want to buy this book?</p>
              <button onClick={buyHandler}>confirm</button>
              <button onClick={() => navigate(-1)}>Cancel</button>
            </div>
          )}
        </article>
      </div>
    </>
  );
}
