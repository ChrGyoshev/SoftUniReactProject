import { Link } from "react-router-dom";
import { HideNavBar } from "../assets/js/HideNavbar";
import { profileHandler } from "../assets/js/DropDownBtns";
import { useUser } from "./UserContext";
import LogOut from "./Profiles/LogOut";

const NavBar = () => {
  const { user } = useUser();

  const handlerDropDownBtns = (e) => {
    let element = e.currentTarget;
    profileHandler(element);
  };

  return (
    <>
      <nav>
        <div className="allMenu ">
          <ul className="ul">
            <Link to="/">
              <li className="lia">
                <span className="li">Home</span>
              </li>
            </Link>
            <li className="lia" onClick={handlerDropDownBtns}>
              <span className="li">Catalogue</span>
              <Link to={"/catalogue/book-store/1"}>
                <span className="profile-btns">Book Store</span>
              </Link>

              {user ? (
                <Link to={"catalogue/book-list"}>
                  <span className="profile-btns">Reading List</span>
                </Link>
              ) : null}
            </li>

            {user ? (
              <>
                <li className="lia" onClick={handlerDropDownBtns}>
                  <span className="li">Profile </span>
                  <Link to={"profile-details"}>
                    <span className="profile-btns">
                      Details{" "}
                      <i className="fa-regular fa-user nav-user-ico"></i>
                    </span>
                  </Link>
                  <LogOut />
                </li>
              </>
            ) : (
              <li className="lia" onClick={handlerDropDownBtns}>
                <span className="li">Sign</span>
                <Link to={"sign-in"}>
                  <span className="profile-btns">
                    Sign In <i className="fa-regular fa-user nav-user-ico"></i>
                  </span>
                </Link>
                <Link to="sign-up">
                  <span className="profile-btns">
                    Sign Up <i className="fa-regular fa-user nav-user-ico"></i>
                  </span>
                </Link>
              </li>
            )}

            <Link to="/about">
              <li className="lia">
                <span className="li">About</span>
              </li>
            </Link>
          </ul>
          <div className="Menu2">
            <svg
              version="1.1"
              id="menulogo"
              x="0px"
              y="0px"
              width="40px"
              height="36px"
              viewBox="0 0 40 36"
              onClick={HideNavBar}
            >
              <rect
                className="rect1"
                fill="#FFF"
                width="40"
                height="5.392"
              ></rect>
              <rect
                className="rect2"
                x="0"
                y="12"
                fill="#FFF"
                width="40"
                height="5.393"
              ></rect>
              <rect
                className="rect3"
                x="0"
                y="24"
                fill="#FFF"
                width="40"
                height="5.393"
              ></rect>
            </svg>
            <div className="Menu hover"></div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
