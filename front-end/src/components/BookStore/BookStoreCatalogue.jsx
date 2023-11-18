import styles from "./BookStoreCatalogue.module.css";
import { useUser } from "../UserContext";
import { useState, useEffect, useRef } from "react";
import AddBookStore from "./AddBook";
import BookStoreSingleBookElement from "./BookStoreElement";

export default function BookStoreCatalogue() {
  const [bookData, setBookData] = useState("");
  const [showForm, setShowForm] = useState(false);
  const pageContent = useRef();
  const BASEURL = `http://localhost:8000/api/book-store/list/`;
  const [currentPage, setCurrentPage] = useState(1);

  const user = useUser();

  useEffect(() => {
    fetch(`${BASEURL}?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => setBookData(data))
      .catch((error) => console.error(error));
  }, [currentPage]);

  const fetchUpdatedData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASEURL}?page=${currentPage}`);
      const data = await response.json();
      setBookData(data);
    } catch (error) {
      console.error(error);
    }
  };

  function showFormHandler(e) {
    e.preventDefault();
    setShowForm(!showForm);
    pageContent.current.style.display =
      pageContent.current.style.display === "none" ? "flex" : "none";
  }

  return (
    <>
      <button onClick={showFormHandler}>Add Book</button>
      {showForm && <AddBookStore showForm={showFormHandler} user={user} />}
      <div className={styles.gallery} ref={pageContent}>
        <BookStoreSingleBookElement bookData={bookData} user={user} />
      </div>
      <div>
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
