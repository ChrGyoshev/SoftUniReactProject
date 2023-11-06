import { useRef, useState, useEffect } from "react";
import { auth } from "../firebase";

export default function Test() {
  // const imageInput = useRef(null);
  // const [username, setUsername] = useState("");

  // const uploadImage = async () => {
  //   let image = imageInput.current.files[0];
  //   // let userId = user.uid;
  //   let userId = "YPlOVZ8FuGRe6wc0zedllaqAtb52";
  //   const url = `http://127.0.0.1:8000/api/edit/${userId}/`;
  //   let name = username;

  //   let formData = new FormData();
  //   formData.append("profile_picture", image);
  //   formData.append("username", name);

  //   let newImage = await fetch(url, {
  //     method: "PATCH",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const formInitialState = {
    title: "",
    author: "",
    profile: "",
  };

  const [formData, setFormData] = useState(formInitialState);
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser !== null) {
        setUser(currentUser);
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
        // Handle the data from the successful response

        setBooks(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }, [user]);

  const inputChangeHandler = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formData.profile = user.uid;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("http://localhost:8000/api/books-reading-list", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the data from the successful response
        console.log(data);

        setBooks((oldData) => [...oldData, data]);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };
  return (
    <>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={inputChangeHandler}
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={formData.author}
          onChange={inputChangeHandler}
        />
        <button onClick={submitHandler}>SUBMIT BABY</button>
      </form>

      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h3>Title: {book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Cover: {book.cover}</p>
            <p>Pages: {book.pages}</p>
            <p>Status: {book.status}</p>
            <p>Profile: {book.profile}</p>
          </div>
        ))}
      </div>
    </>
  );
}
