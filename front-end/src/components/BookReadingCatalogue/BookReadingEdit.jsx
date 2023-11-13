const EditSingleBook = ({ showForm, bookId }) => {
 
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
            />
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Enter book author"
            />
            <label htmlFor="cover">Add Book Cover:</label>
            <input
              type="text"
              id="cover"
              name="cover"
              placeholder="Enter book cover URL path"
            />

            <label htmlFor="number">Current Page:</label>
            <input
              type="number"
              id="number"
              name="number"
              placeholder="Im currently on page..."
            />
            <div className="edit-book-btns">
              <button type="submit" className="submit-book">
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
