import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BookReadingSingle from "./BookReadingSingle";

const BookList = () => {
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  function UpdateBooks(newBooks) {
    setBooks((oldData) => [...oldData, newBooks]);
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
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
                <td>
                  <i
                    class="fa-solid fa-trash-can"
                    onClick={deleteBookHandler}
                    profile={book.id}
                  ></i>
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
