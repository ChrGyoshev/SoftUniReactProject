import { useState, useEffect, useRef } from "react";
import { useUser } from "../UserContext";
import useClickOutside from "../hooks/useClickOutside";
import ErrorBox from "../ErrorsBox";

export default function AddBookStore({
  AddBookShowHideForm,
  user,
  fetchUpdatedData,
}) {
  const { token } = useUser();
  const BASE_URL = `https://react-app-book-buzz.onrender.com/api/book-store/list/`;

  const [errors, setErrors] = useState([]);
  const errorBoxRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    cover: "",
    owner: user.uid,
  });

  function formHandler(e) {
    setFormData((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    fetch(BASE_URL, request)
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorData) => {
            const errorMsg = Object.entries(errorData).map(
              ([field, errors]) => `${field} : ${errors}`
            );
            setErrors(errorMsg);
          });
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(() => fetchUpdatedData())
      .catch((error) => console.error(error));
  }

  const resetErrors = () => {
    setErrors([]);
  };

  useClickOutside(errorBoxRef, resetErrors);

  return (
    <>
      {errors.length > 0 && (
        <ErrorBox {...{ resetErrors, errors, errorBoxRef }} />
      )}
      <div className="overlay" onClick={AddBookShowHideForm}></div>
      <div className="modular">
        <section className="form-edit-profile">
          <button
            className="button-close-edit-profile"
            onClick={AddBookShowHideForm}
          >
            x
          </button>
          <h1>Add Book for Sale</h1>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={formHandler}
            />
            <label htmlFor="Author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter book author"
              value={formData.author}
              onChange={formHandler}
            />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              maxLength="1200"
              id="description"
              name="description"
              placeholder="Enter book description"
              value={formData.description}
              onChange={formHandler}
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter Price"
              value={formData.price}
              onChange={formHandler}
            />

            <label htmlFor="cover">Book Cover:</label>
            <input
              type="text"
              id="cover"
              name="cover"
              placeholder="Enter Book URL image"
              value={formData.cover}
              onChange={formHandler}
            />

            <div className="add-book-btns">
              <button
                type="button"
                className="submit-book"
                onClick={submitHandler}
              >
                Add Book
              </button>
              <button
                type="button"
                className="submit-book"
                onClick={AddBookShowHideForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
