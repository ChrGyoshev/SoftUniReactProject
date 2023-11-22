import { Link } from "react-router-dom";
import styles from "./BookStoreCatalogue.module.css";

export default function BookStoreSingleBookElement({ bookData, user }) {
  if (!bookData || bookData.results.length === 0) {
    return <div>No books available.</div>;
  }
  const books = bookData.results;

  return (
    <div className={styles.gallery}>
      {Object.values(books).map((book) => (
        <div className={styles.content} key={book.id}>
          <Link to="/" className={styles.galleryRedirectToDetails}>
            <img src={book.cover} alt="" />

            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <h6>{book.price}$</h6>
            <p>{book.author}</p>
          </Link>
          <Link to="sing-in">
            <button>Buy Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
