import { auth } from "../../firebase";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";

const ProfileDetails = () => {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const ProfileCard = useRef(null);

  useEffect(() => {
    if (auth.currentUser !== null) {
      setUser(auth.currentUser);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        const urlView = `http://localhost:8000/api/${user.uid}`;
        try {
          const response = await fetch(urlView, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(response.status);
          }
          const data = await response.json();
          setProfile(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [user]);

  function ShowEditProfileHandler() {
    setShowEditProfile(!showEditProfile);
    ProfileCard.current.style.display =
      ProfileCard.current.style.display === "none" ? "flex" : "none";
  }

  function handleFormSubmit(formData) {
    console.log(formData);
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...formData,
    }));
  }

  return (
    <>
      {showEditProfile && (
        <EditProfile
          showProfile={ShowEditProfileHandler}
          onFormSubmit={handleFormSubmit}
          userId={user.uid}
        />
      )}

      <div className="profile-card" ref={ProfileCard}>
        <span className="delete-profile">
          <Link to="/profile-delete">
            <i className="fa-solid fa-user-xmark"></i>
          </Link>
        </span>

        <span className="edit-profile" onClick={ShowEditProfileHandler}>
          <i className="fa-solid fa-user-pen"></i>
        </span>
        <div className="profile-image">
          {profile.profile_picture ? (
            <img
              referrerPolicy="no-referrer"
              src={`${profile.profile_picture}?t=${Date.now()}`}
              alt="User Profile"
            />
          ) : user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Profile"
              referrerPolicy="no-referrer"
            />
          ) : (
            <img
              src="https://nationwide-energy.co.uk/wp-content/uploads/2017/07/blank-avatar.jpg"
              alt="User Profile"
            />
          )}
        </div>
        <div className="text-data">
          <p className="email">Email: {user.email}</p>
          {profile.username && (
            <p className="username">Username: {profile.username}</p>
          )}

          {profile.phone_number && (
            <p className="phone_number"> Phone: {profile.phone_number}</p>
          )}

          {profile.gender && <p className="gender">Gender: {profile.gender}</p>}
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
