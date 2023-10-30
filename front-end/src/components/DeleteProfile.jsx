import { Link } from "react-router-dom";

const DeleteProfile = () => {
  function deleteHandler() {
    console.log("deleted");
  }
  return (
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
  );
};

export default DeleteProfile;
