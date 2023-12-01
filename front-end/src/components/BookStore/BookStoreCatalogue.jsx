import styles from "./BookStoreCatalogue.module.css";
import { useUser } from "../UserContext";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddBookStore from "./AddBook";
import BookStoreSingleBookElement from "./BookStoreElement";
import useClickOutside from "../hooks/useClickOutside";
import BookStoreEditBook from "./BookStoreEditBook";

export default function BookStoreCatalogue() {
  const BASEURL = `http://localhost:8000/api/book-store/list/`;
  const [bookData, setBookData] = useState("");
  const [currentBook, setCurrentBook] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editBookModular, setEditBookModular] = useState(false);
  const [errors, setErrors] = useState([]);
  const errorBoxRef = useRef();
  const pageContent = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASEURL}?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => setBookData(data))
      .catch((error) => console.error(error));
  }, [currentPage]);

  const fetchUpdatedData = async (fromPageRender) => {
    try {
      const response = await fetch(`${BASEURL}?page=${currentPage}`);
      const data = await response.json();
      if (response.ok) {
        setBookData(data);
        if (!fromPageRender) {
          showFormHandler();
        }
      } else {
        console.log("Error fetching datass:", data.detail);
        const errorMsg = Object.entries(data).map(
          ([field, errors]) => `${field} : ${errors}`
        );
        setErrors(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  function showFormHandler(e) {
    if (e) {
      e.preventDefault();
    }
    setShowForm(!showForm);
    pageContent.current.style.display =
      pageContent.current.style.display === "none" ? "flex" : "none";
  }

  function EditBookHandler(book) {
    setEditBookModular(!editBookModular);
    setCurrentBook(book);
    pageContent.current.style.display =
      pageContent.current.style.display === "none" ? "flex" : "none";
  }

  function PageRender() {
    fetchUpdatedData(true);
  }

  const resetErrors = () => {
    setErrors([]);
    navigate("/");
  };

  useClickOutside(errorBoxRef, resetErrors);

  return (
    <>
      {errors.length > 0 && (
        <div className="overlay-errors">
          <div className="error-box" ref={errorBoxRef}>
            <button className="button-close-edit-profile" onClick={resetErrors}>
              x
            </button>
            <h2>Something went wrong</h2>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>
                  {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {user && (
        <button className={styles.AddBookStore} onClick={showFormHandler}>
          Add Book
        </button>
      )}
      {showForm && (
        <AddBookStore
          showForm={showFormHandler}
          user={user}
          updatePage={fetchUpdatedData}
        />
      )}

      {editBookModular && (
        <BookStoreEditBook
          editBook={EditBookHandler}
          book={currentBook}
          updatePage={PageRender}
        />
      )}

      <div className={styles.galleryInner} ref={pageContent}>
        <BookStoreSingleBookElement
          {...{ bookData, user, EditBookHandler, PageRender }}
        />
      </div>
      <div className={styles.paginator}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={!bookData.previous}
        >
          Previous
        </button>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!bookData.next}
        >
          Next
        </button>
      </div>
    </>
  );
}
