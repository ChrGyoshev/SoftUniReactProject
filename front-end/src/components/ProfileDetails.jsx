import { auth } from "../firebase";
import { useEffect, useState, useRef } from "react";
const ProfileDetails = () => {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");
  let urlView = "";
  const imageInput = useRef(null);
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

  // const uploadImage = async () => {
  //   let image = imageInput.current.files[0];
  //   let userId = user.uid;
  //   const url = "http://127.0.0.1:8000/api";
  //   let formData = new FormData();
  //   formData.append("profile_picture", image);
  //   formData.append("uid", userId);

  //   let newImage = await fetch(url, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <>
      <div className="profile-card">
        <span className="delete-profile">
          <i className="fa-solid fa-user-xmark"></i>
        </span>
        <span className="edit-profile">
          <i className="fa-solid fa-user-pen"></i>
        </span>
        <div className="profile-image">
          {user.photoURL ? (
            <img src={user.photoURL} alt="User Profile" />
          ) : profile.profile_picture ? (
            <img src={profile.profile_picture} alt="User Profile" />
          ) : (
            <img
              src="https://nationwide-energy.co.uk/wp-content/uploads/2017/07/blank-avatar.jpg"
              alt="User Profile"
            />
          )}
        </div>
        <div className="text-data">
          <p className="email">Email: {user.email}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
