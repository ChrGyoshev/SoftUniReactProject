import styles from "./BookStoreCatalogue.module.css";
import { useUser } from "../UserContext";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddBookStore from "./AddBook";
import BookStoreSingleBookElement from "./BookStoreElement";
import useClickOutside from "../hooks/useClickOutside";
import BookStoreEditBook from "./BookStoreEditBook";
import ErrorBox from "../ErrorsBox";
import LoadingSpinner from "../Profiles/spinner";

export default function BookStoreCatalogue() {
  const BASEURL = `https://react-app-book-buzz.onrender.com/api/book-store/catalogue/`;
  const { user } = useUser();
  const { page } = useParams();
  const [bookData, setBookData] = useState("");
  const [currentBook, setCurrentBook] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [addBookModular, setAddBookModular] = useState(false);
  const [editBookModular, setEditBookModular] = useState(false);
  const [errors, setErrors] = useState([]);
  const errorBoxRef = useRef();
  const pageContent = useRef();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASEURL}?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setBookData(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  const fetchUpdatedData = async (fromPageRender) => {
    try {
      const response = await fetch(`${BASEURL}?page=${currentPage}`);
      const data = await response.json();
      if (response.ok) {
        setBookData(data);
        if (!fromPageRender) {
          AddBookShowHideForm();
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

  function AddBookShowHideForm(e) {
    if (e) {
      e.preventDefault();
    }
    setAddBookModular(!addBookModular);
    pageContent.current.style.display =
      pageContent.current.style.display === "none" ? "flex" : "none";
  }

  function EditBookShowHideForm(book) {
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/catalogue/book-store/${newPage}`);
  };

  return (
    <>
      {loading ? (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {errors.length > 0 && (
            <ErrorBox {...{ resetErrors, errors, errorBoxRef }} />
          )}

          {user && (
            <button
              className={styles.AddBookStore}
              onClick={AddBookShowHideForm}
            >
              Add Book
            </button>
          )}

          {addBookModular && (
            <AddBookStore
              {...{ AddBookShowHideForm, user, fetchUpdatedData }}
            />
          )}

          {editBookModular && (
            <BookStoreEditBook
              {...{ EditBookShowHideForm, currentBook, PageRender }}
            />
          )}

          <div className={styles.galleryInner} ref={pageContent}>
            <BookStoreSingleBookElement
              {...{ bookData, user, EditBookShowHideForm, PageRender }}
            />
          </div>
          {bookData.count > 6 && (
            <div className={styles.paginator}>
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={!bookData.previous}
              >
                Previous
              </button>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!bookData.next}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
