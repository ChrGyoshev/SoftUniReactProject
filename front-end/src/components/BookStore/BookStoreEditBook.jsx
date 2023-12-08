import styles from "./BookStoreEditBook.module.css";
import { useState } from "react";
import { useUser } from "../UserContext";

export default function BookStoreEditBook({
  EditBookShowHideForm,
  currentBook,
  PageRender,
}) {
  const BASE_URL = `http://localhost:8000/api/book-store/edit/${currentBook.id}/`;
  const { token } = useUser();
  const [formData, setFormData] = useState({
    title: currentBook.title,
    author: currentBook.author,
    description: currentBook.description,
    price: currentBook.price,
    cover: currentBook.cover,
    owner: token.uid,
  });

  function formChangeHandler(e) {
    setFormData((oldData) => ({ ...oldData, [e.target.name]: e.target.value }));
  }

  function submitHandler() {
    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };
    fetch(BASE_URL, request)
      .then((response) => {
        response.json();
      })
      .then(() => {
        PageRender();
        EditBookShowHideForm();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="overlay" onClick={EditBookShowHideForm}></div>
      <div className="modular">
        <section className="form-edit-profile">
          <button
            className="button-close-edit-profile"
            onClick={EditBookShowHideForm}
          >
            x
          </button>
          <h1>Edit your listing:</h1>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={formChangeHandler}
            />

            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              value={formData.author}
              onChange={formChangeHandler}
            />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={formChangeHandler}
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={formChangeHandler}
            />

            <label htmlFor="cover">Book cover:</label>
            <input
              type="text"
              name="cover"
              id="cover"
              value={formData.cover}
              onChange={formChangeHandler}
            />
          </form>

          <button className={styles.EditBookBtn} onClick={submitHandler}>
            Edit Listing
          </button>
        </section>
      </div>
    </>
  );
}
