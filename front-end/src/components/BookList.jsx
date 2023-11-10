import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BookReadingSingle from "./BookReadingSingle";

const BookList = () => {
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});

  const tableElement = useRef();

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
    // Initialize selectedValues based on book status from the book state
    const initialSelectedValues = {};
    books.forEach((book) => {
      initialSelectedValues[book.id] = book.status || "In Progress";
    });
    setSelectedValues(initialSelectedValues);
  }, [books]);

  function addBookHandler() {
    setShowForm(!showForm);
    tableElement.current.style.display =
      tableElement.current.style.display === "none" ? "block" : "none";
  }

  function deleteBookHandler(e) {
    const bookId = Number(e.currentTarget.getAttribute("profile"));
    console.log(typeof bookId);
    console.log(typeof books[0].id);
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
      <div className="book-data" ref={tableElement}>
        <button onClick={addBookHandler}>Add Book</button>
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
    </>
  );
};

export default BookList;
