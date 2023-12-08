import { Link } from "react-router-dom";
import styles from "./BookStoreCatalogue.module.css";
import { useState, useRef } from "react";
import BookStoreDeleteBook from "./BookStoreDeleteBook";

export default function BookStoreSingleBookElement({
  bookData,
  user,
  EditBookShowHideForm,
  PageRender,
}) {
  const [deleteBook, setDeleteBook] = useState(false);
  const [bookId, setBookId] = useState();
  const gallerySection = useRef();

  function showDeleteBox(book) {
    setBookId(book);
    setDeleteBook(!deleteBook);
  }

  if (!bookData || bookData.results?.length === 0) {
    return (
      <div className={styles.NoBooksAvailable}>No books available for sale</div>
    );
  }

  const books = bookData.results;

  return (
    <>
      <div className={styles.gallery} ref={gallerySection}>
        {Object.values(books).map((book) => (
          <div className={styles.content} key={book.id}>
            {user && book.owner.id === user.uid && (
              <div className={styles.bookStoreBtns}>
                <i
                  className="fa-solid fa-pen-to-square bookEditBtn"
                  onClick={() => EditBookShowHideForm(book)}
                ></i>

                <i
                  className={`fa-solid fa-trash-can ${styles.trashCan}`}
                  onClick={() => showDeleteBox(book.id)}
                ></i>
              </div>
            )}
            <div className={styles.cardContent}>
              <Link
                to={`/catalogue/book-store/details/${book.id}`}
                className={styles.galleryRedirectToDetails}
              >
                <img src={book.cover} alt="" />
                <h3>{book.title}</h3>
                <h6>{book.price} лв</h6>
                <p>{book.author}</p>
                {book.owner.email && <p>Seller: {book.owner.email}</p>}
              </Link>
            </div>
            <div className={styles.buyNow}>
              <Link to={`/catalogue/book-store/buy/${book.id}`}>
                <button>Buy Now</button>
              </Link>
            </div>
          </div>
        ))}
        {deleteBook && (
          <BookStoreDeleteBook {...{ showDeleteBox, bookId, PageRender }} />
        )}
      </div>
    </>
  );
}
