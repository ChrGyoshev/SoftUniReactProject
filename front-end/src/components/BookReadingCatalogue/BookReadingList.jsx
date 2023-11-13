import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BookReadingSingle from "./BookReadingAdd";
import EditSingleBook from "./BookReadingEdit";

const BookList = () => {
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedBookId, setSelectedBookId] = useState();

  const tableElement = useRef();
  const bookBtns = useRef();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    const BASEURL = `http://localhost:8000/api/books-by-user?profile=${user.uid}`;
    fetch(BASEURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBooks((oldData) => [...oldData, ...data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  useEffect(() => {
    const initialSelectedValues = {};
    books.forEach((book) => {
      initialSelectedValues[book.id] = book.status || "In Progress";
    });
    setSelectedValues(initialSelectedValues);
  }, [books]);

  // Adding Book Modular
  function addBookHandler() {
    setShowForm(!showForm);
    tableElement.current.style.display =
      tableElement.current.style.display === "none" ? "block" : "none";

    bookBtns.current.style.display =
      bookBtns.current.style.display === "none" ? "flex" : "none";
  }

  // Edit book Modular
  function editBookHandler() {
    setEditBook(!editBook);
    tableElement.current.style.display =
      tableElement.current.style.display === "none" ? "block" : "none";

    bookBtns.current.style.display =
      bookBtns.current.style.display === "none" ? "flex" : "none";
  }

  // Makes request to delete book
  function deleteBookHandler(e) {
    const bookId = Number(e.currentTarget.getAttribute("profile"));
    const deleteURL = `http://localhost:8000/api/books-reading-list/delete/${bookId}/`;

    fetch(deleteURL, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If the deletion was successful, update the state by removing the deleted book
          setBooks((oldData) => oldData.filter((book) => book.id !== bookId));
        } else {
          console.log("Failed to delete book");
        }
      })
      .catch((error) => console.error(error));
  }

  // Makes request to edit selected book status

  async function patchBookStatus(bookId, newStatus) {
    fetch(`http://localhost:8000/api/book-reading-list/edit/${bookId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  function UpdateBooks(newBooks) {
    setBooks((oldData) => [...oldData, newBooks]);
  }

  function selectChangeHandler(e, bookId) {
    const newStatus = e.target.value;

    setSelectedValues({
      ...selectedValues,
      [bookId]: e.target.value,
    });

    // Dynamically update the className based on the new status
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          status: newStatus,
        };
      }
      return book;
    });

    setBooks(updatedBooks);

    patchBookStatus(bookId, newStatus);
  }

  // getting css class
  function getBookClass(book) {
    if (book.status) {
      return book.status.toLowerCase().replace(/ /g, "-");
    }
    return "in-progress";
  }

  return (
    <>
      {showForm && (
        <BookReadingSingle
          showForm={addBookHandler}
          user={user}
          updateBooks={UpdateBooks}
        />
      )}

      {editBook && (
        <EditSingleBook showForm={editBookHandler} bookId={selectedBookId} />
      )}
      <div className="book-btns" ref={bookBtns}>
        <button className="button-10" onClick={addBookHandler}>
          Add Book
        </button>
      </div>
      <div className="book-catalogue">
        <div className="book-data" ref={tableElement}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Remove Book</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className={getBookClass(book)}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.pages}</td>
                  <td>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={deleteBookHandler}
                      profile={book.id}
                    ></i>
                    <i
                      className="fa-solid fa-pen-to-square"
                      bookId={book.id}
                      onClick={() => {
                        editBookHandler();
                        setSelectedBookId(book.id);
                      }}
                    ></i>
                  </td>
                  <td>
                    <select
                      name="status"
                      id={book.id}
                      value={selectedValues[book.id] || "In Progress"}
                      onChange={(e) => selectChangeHandler(e, book.id)}
                    >
                      <option value="In Progress">Currently reading</option>
                      <option value="Want to read">Wish to read</option>
                      <option value="Finished">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookList;
