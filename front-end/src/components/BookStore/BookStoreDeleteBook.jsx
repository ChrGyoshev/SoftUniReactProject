import styles from "./BookStoreDeleteBook.module.css";
import { useUser } from "../UserContext";
import { useState } from "react";
import LoadingSpinner from "../Profiles/spinner";

export default function BookStoreDeleteBook({
  showDeleteBox,
  bookId,
  PageRender,
}) {
  const BASE_URL = `https://react-app-book-buzz.onrender.com/api/book-store/delete/${bookId}/`;
  const { token } = useUser();

  function DeleteBookHandler(e) {
    e.preventDefault();

    fetch(BASE_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Error deleting");
        }
        PageRender();
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div
        className={`overlay ${styles.deleteBoxOverlay}`}
        onClick={showDeleteBox}
      >
        <div className="delete-wrapper">
          <h2>Are you sure you want to delete your listing?</h2>
          <section className="delete-card">
            <h3>
              <i
                className={`fa-solid fa-triangle-exclamation ${styles.deleteBoxIcon}`}
              >
                Warning
              </i>
              <p>By deleting you can't undo this action.</p>
            </h3>
          </section>
          <button className="profile-delete" onClick={DeleteBookHandler}>
            Delete
          </button>

          <a className="profile-cancel" onClick={showDeleteBox}>
            Cancel
          </a>
        </div>
      </div>
    </>
  );
}
