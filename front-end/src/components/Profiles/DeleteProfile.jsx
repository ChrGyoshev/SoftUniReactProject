import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "./../UserContext";

const DeleteProfile = () => {
  const { user, token } = useUser();
  const [baseUrl, setBaseUrl] = useState("");
  const [deleted, setDeleted] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setBaseUrl(`http://127.0.0.1:8000/api/delete/${user.uid}/`);
  }, []);

  async function deleteHandler() {
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        user.delete();
        setDeleted(true);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else {
        console.error("delete request failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!deleted ? (
        <div className="delete-wrapper">
          <h2>Are you sure you want to delete your profile?</h2>
          <section className="delete-card">
            <h3>
              <i className="fa-solid fa-triangle-exclamation"></i>Warning
            </h3>
            <p>By deleting you can't undo this action.</p>
          </section>
          <button className="profile-delete" onClick={deleteHandler}>
            Delete
          </button>
          <Link to="/profile-details" className="profile-cancel">
            Cancel
          </Link>
        </div>
      ) : (
        <div className="delete-wrapper">
          <img
            className="profile-bye"
            src="https://media.tenor.com/3lcf0JZoUE4AAAAi/human-hand.gif"
            alt="hand"
          />
          <h2>Sorry to see you go.</h2>
          <section className="delete-card">
            <h3>
              <i className="fa-solid fa-triangle-exclamation"></i>Warning
            </h3>
            <p>Your Profile is successfully deleted!</p>
          </section>
        </div>
      )}
    </>
  );
};

export default DeleteProfile;
