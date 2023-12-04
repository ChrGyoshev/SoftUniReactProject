import React from "react";

const DeleteBook = ({ token, setBooks, bookID }) => {
  const deleteURL = `http://localhost:8000/api/books-reading-list/delete/${bookID}/`;

  const handleDelete = () => {
    fetch(deleteURL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          
          setBooks((oldData) => oldData.filter((book) => book.id !== bookID));
        } else {
          console.log("Failed to delete book");
        }
      })
      .catch((error) => console.error(error));
  };

  return  <i
  className="fa-solid fa-trash-can"
  onClick={handleDelete}
></i>;
};

export default DeleteBook;
