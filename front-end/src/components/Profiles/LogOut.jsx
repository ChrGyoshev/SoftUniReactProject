import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigate("sign-in");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <span className="profile-btns" onClick={handleLogout}>
      Logout
      <i className="fa-solid fa-arrow-right-from-bracket nav-user-ico"></i>
    </span>
  );
};

export default LogOut;
