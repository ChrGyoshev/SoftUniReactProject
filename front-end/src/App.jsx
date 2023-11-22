import NavBar from "./components/Navbar";
import Main from "./components/Home";
import About from "./components/About";
import SignIn from "./components/Profiles/SignIn";
import SignUp from "./components/Profiles/SignUp";
import DeleteProfile from "./components/Profiles/DeleteProfile";
import ProfileDetails from "./components/Profiles/ProfileDetails";
import BookList from "./components/BookReadingCatalogue/BookReadingList";
import BookStoreCatalogue from "./components/BookStore/BookStoreCatalogue";
import AddBookStore from "./components/BookStore/AddBook";
import Test from "./components/test";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <>
      <section className="page-wrapper">
        <NavBar />
        <UserProvider>
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
            <Route
              path="/catalogue/book-store/add"
              element={<AddBookStore />}
            />
            <Route path="/test" element={<Test />} />
          </Routes>
        </UserProvider>
      </section>
      <footer>
        <p>&copy; 2023 Christiyan Gyoshev - All rights Reserved</p>
      </footer>
    </>
  );
}

export default App;
