import { Link } from "react-router-dom";
import styles from "./BookStoreCatalogue.module.css";
import { useState, useRef } from "react";
import BookStoreDeleteBook from "./BookStoreDeleteBook";
import BookStoreEditBook from "./BookStoreEditBook";

export default function BookStoreSingleBookElement({
  bookData,
  user,
  EditBookHandler,
  PageRender,
}) {
  const [deleteBook, setDeleteBook] = useState(false);
  const [editBook, setEditBook] = useState(false);
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
        {editBook && (
          <BookStoreEditBook
            showEditBox={showEditBox}
            bookId={bookId}
            PageRender={PageRender}
          />
        )}
        {Object.values(books).map((book) => (
          <div className={styles.content} key={book.id}>
            {user && book.owner === user.uid && (
              <div className={styles.bookStoreBtns}>
                <i
                  className="fa-solid fa-pen-to-square bookEditBtn"
                  onClick={() => EditBookHandler(book)}
                ></i>

                <i
                  className={`fa-solid fa-trash-can ${styles.trashCan}`}
                  onClick={() => showDeleteBox(book.id)}
                ></i>
              </div>
            )}
            <div className={styles.cardContent}>
              <Link
                to={`details/${book.id}`}
                className={styles.galleryRedirectToDetails}
              >
                <img src={book.cover} alt="" />

                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <h6>{book.price}$</h6>
                <p>{book.author}</p>
              </Link>
            </div>
            <div className={styles.buyNow}>
              <Link to="sing-in">
                <button>Buy Now</button>
              </Link>
            </div>
          </div>
        ))}
        {deleteBook && (
          <BookStoreDeleteBook
            showDeleteBox={showDeleteBox}
            bookId={bookId}
            PageRender={PageRender}
          />
        )}
      </div>
    </>
  );
}
