import { useState } from "react";
const EditSingleBook = ({
  showForm,
  bookId,
  updateBooksOnPatch,
  books,
  token,
}) => {
  const BASE_URL = `http://localhost:8000/api/book-reading-list/edit/${bookId}/`;
  const specificBook = books.find((book) => book.id === bookId);

  const [formData, setFormData] = useState({
    title: specificBook.title !== null ? specificBook.title : "",
    author: specificBook.author !== null ? specificBook.author : "",
    cover: specificBook.cover !== null ? specificBook.cover : "",
    pages: specificBook.pages !== null ? specificBook.pages : "",
  });

  function inputChangeHandler(e) {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function SubmitHandler(e) {
    e.preventDefault();
    const submitData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) =>
          key !== "" && value !== "" && (key !== "pages" || !isNaN(value))
      )
    );

    fetch(BASE_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        updateBooksOnPatch(data);
        showForm();
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <>
      <div className="overlay" onClick={showForm}></div>
      <div className="modular">
        <section className="form-edit-profile">
          <button className="button-close-edit-profile" onClick={showForm}>
            x
          </button>
          <h1>Edit book</h1>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={inputChangeHandler}
            />
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Enter book author"
              value={formData.author}
              onChange={inputChangeHandler}
            />
            <label htmlFor="cover">Add Book Cover:</label>
            <input
              type="text"
              id="cover"
              name="cover"
              placeholder="Enter book cover URL path"
              value={formData.cover}
              onChange={inputChangeHandler}
            />

            <label htmlFor="number">Current Page:</label>
            <input
              type="number"
              id="pages"
              name="pages"
              placeholder="Im currently on page..."
              value={formData.pages}
              onChange={inputChangeHandler}
            />
            <div className="edit-book-btns">
              <button
                type="submit"
                className="submit-book"
                onClick={SubmitHandler}
              >
                Edit Book
              </button>
              <button type="submit" className="submit-book" onClick={showForm}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default EditSingleBook;
