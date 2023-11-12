const EditSingleBook = ({ showForm }) => {
  return (
    <>
      <div className="overlay" onClick={showForm}></div>
      <div className="modular">
        <section className="form-edit-profile">
          <button className="button-close-edit-profile" onClick={showForm}>
            x
          </button>
          <h1>Add Book to your reading list</h1>

          <div className="edit-book-btns">
            <button type="submit" className="submit-book">
              Edit Book
            </button>
            <button type="submit" className="submit-book" onClick={showForm}>
              Cancel
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditSingleBook;
