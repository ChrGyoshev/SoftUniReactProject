import NavBar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import SignIn from "./components/Profiles/SignIn";
import SignUp from "./components/Profiles/SignUp";
import DeleteProfile from "./components/Profiles/DeleteProfile";
import ProfileDetails from "./components/Profiles/ProfileDetails";
import BookList from "./components/BookReadingCatalogue/BookReadingList";
import BookStoreCatalogue from "./components/BookStore/BookStoreCatalogue";
import AddBookStore from "./components/BookStore/AddBook";
import ElementDetails from "./components/BookStore/BookStoreElementDetails";
import BuyBook from "./components/BookStore/BuyBook";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <section className="page-wrapper">
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile-details" element={<ProfileDetails />} />
            <Route path="/profile-delete" element={<DeleteProfile />} />
            <Route path="/catalogue/book-list" element={<BookList />} />
            <Route path="/catalogue/book-store/:page" element={<BookStoreCatalogue />} />
            <Route path="/catalogue/book-store/add" element={<AddBookStore />} />
            <Route path="/catalogue/book-store/details/:id" element={<ElementDetails />} />
            <Route path="/catalogue/book-store/buy/:id" element={<BuyBook />} />
          </Routes>
        </UserProvider>
      </section>
      <Footer />
    </>
  );
}

export default App;
