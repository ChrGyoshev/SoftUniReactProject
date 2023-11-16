import styles from "./BookStoreCatalogue.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AddBookStore from "./AddBook";

export default function BookStoreCatalogue() {
  const [showForm, setShowForm] = useState(false);
  const pageContent = useRef();

  function showFormHandler(e) {
    e.preventDefault();
    setShowForm(!showForm);
    pageContent.current.style.display =
      pageContent.current.style.display === "none" ? "flex" : "none";
  }

  return (
    <>
      <button onClick={showFormHandler}>Add Book</button>
      {showForm && <AddBookStore showForm={showFormHandler} />}
      <div className={styles.gallery} ref={pageContent}>
        <div className={styles.content}>
          <Link to="/" className={styles.galleryRedirectToDetails}>
            <img
              src="https://images.ctfassets.net/usf1vwtuqyxm/24YWmI4UcyoMwj7wdKrEcL/374de1941927db12bd844fb197eab11f/English_Harry_Potter_3_Epub_9781781100233.jpg?w=914&q=70&fm=jpg"
              alt=""
            />
            <h3>Harry Potter</h3>
            <p>Best Book ever Made</p>
            <h6>19.90$</h6>
            <p>J.K Rowling</p>
          </Link>
          <Link to="sing-in">
            <button>Buy Now</button>
          </Link>
        </div>
      </div>
    </>
  );
}
