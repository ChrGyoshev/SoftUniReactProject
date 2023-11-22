import styles from "./BookStoreCatalogue.module.css";
import { useUser } from "../UserContext";
import { useState, useEffect, useRef } from "react";
import AddBookStore from "./AddBook";
import BookStoreSingleBookElement from "./BookStoreElement";

export default function BookStoreCatalogue() {
  const BASEURL = `http://localhost:8000/api/book-store/list/`;
  const [bookData, setBookData] = useState("");
  const [showForm, setShowForm] = useState(false);
  const pageContent = useRef();

  const [currentPage, setCurrentPage] = useState(1);

  const { user, token } = useUser();

  useEffect(() => {
    fetch(`${BASEURL}?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => setBookData(data))
      .catch((error) => console.error(error));
  }, [currentPage]);

  const fetchUpdatedData = async () => {
    try {
      const response = await fetch(`${BASEURL}?page=${currentPage}`);
      const data = await response.json();
      setBookData(data);
    } catch (error) {
      console.error(error);
    }

    showFormHandler();
  };

  function showFormHandler(e) {
    if (e) {
      e.preventDefault();
    }

    setShowForm(!showForm);
    pageContent.current.style.display =
      pageContent.current.style.display === "none" ? "flex" : "none";
  }

  return (
    <>
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
      <div className={styles.galleryInner} ref={pageContent}>
        <BookStoreSingleBookElement bookData={bookData} user={user} />
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
