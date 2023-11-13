import { useState } from "react";

const BookReadingSingle = ({ showForm, user, updateBooks }) => {
  const formInitialState = {
    title: "",
    author: "",
    profile: user.uid,
  };
  const [formData, setFormData] = useState(formInitialState);
  const Base_url = "http://localhost:8000/api/books-reading-list";

  function inputChangeHandler(e) {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();

    fetch(Base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        updateBooks(data);
        showForm();
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div className="overlay" onClick={showForm}></div>
      <div className="modular">
        <section className="form-edit-profile">
          <button className="button-close-edit-profile" onClick={showForm}>
            x
          </button>
          <h1>Add Book to your reading list</h1>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              onChange={inputChangeHandler}
              value={formData.title}
            />
            <label htmlFor="Author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter book author"
              onChange={inputChangeHandler}
              value={formData.author}
            />

            <div className="add-book-btns">
              <button
                type="submit"
                className="submit-book"
                onClick={submitHandler}
              >
                Add Book
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

export default BookReadingSingle;
