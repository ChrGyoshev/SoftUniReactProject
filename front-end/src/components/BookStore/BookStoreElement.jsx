import { Link } from "react-router-dom";
import styles from "./BookStoreCatalogue.module.css";

export default function BookStoreSingleBookElement({ bookData }) {
  if (!bookData || bookData.results.length === 0) {
    return <div>No books available.</div>;
  }
  const books = bookData.results;

  return (
    <div>
      {Object.values(books).map((book) => (
        <div className={styles.content} key={book.id}>
          <Link to="/" className={styles.galleryRedirectToDetails}>
            <img
              src="https://images.ctfassets.net/usf1vwtuqyxm/24YWmI4UcyoMwj7wdKrEcL/374de1941927db12bd844fb197eab11f/English_Harry_Potter_3_Epub_9781781100233.jpg?w=914&q=70&fm=jpg"
              alt=""
            />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <h6>19.90$</h6>
            <p>J.K Rowling</p>
          </Link>
          <Link to="sing-in">
            <button>Buy Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
