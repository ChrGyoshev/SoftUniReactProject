import { useState, useEffect, useRef } from "react";

export default function AddBookStore({ showForm, user }) {
  console.log(user);

  return (
    <>
      <div className="overlay" onClick={showForm}></div>
      <div className="modular">
        <section className="form-edit-profile">
          <button className="button-close-edit-profile" onClick={showForm}>
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
            />
            <label htmlFor="Author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter book author"
            />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter book description"
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter Price"
            />

            <label htmlFor="cover">Book Cover:</label>
            <input
              type="text"
              id="cover"
              name="cover"
              placeholder="Enter Book URL image"
            />

            <div className="add-book-btns">
              <button type="button" className="submit-book" onClick={showForm}>
                Add Book
              </button>
              <button type="button" className="submit-book" onClick={showForm}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
