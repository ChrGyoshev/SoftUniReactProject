import NavBar from "./components/Navbar";
import Main from "./components/Home";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DeleteProfile from "./components/DeleteProfile";
import ProfileDetails from "./components/ProfileDetails";
import BookList from "./components/BookReadingCatalogue/BookReadingList";
import BookStoreCatalogue from "./components/BookStore/BookStoreCatalogue";
import Test from "./components/test";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <section className="page-wrapper">
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/profile-delete" element={<DeleteProfile />} />
          <Route path="/catalogue/book-list" element={<BookList />} />
          <Route
            path="/catalogue/book-store"
            element={<BookStoreCatalogue />}
          />
          <Route path="/test" element={<Test />} />
        </Routes>
      </section>
      <footer>
        <p>&copy; 2023 Christiyan Gyoshev - All rights Reserved</p>
      </footer>
    </>
  );
}

export default App;
