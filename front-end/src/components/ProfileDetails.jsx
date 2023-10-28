import { auth } from "../firebase";
import { useEffect, useState, useRef } from "react";
const ProfileDetails = () => {
  const [user, setUser] = useState("");
  const imageInput = useRef(null);
  useEffect(() => {
    setUser(auth.currentUser);
    if (user !== null) {
      console.log(user);
    }
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
          <img src={user.photoURL} alt="" />
        </div>
        <div className="text-data">
          <p className="email">Email: {user.email}</p>
        </div>
      </div>
      {/* <input type="file" accept="image/" ref={imageInput} />
      <button onClick={uploadImage}>upload</button> */}
    </>
  );
};

export default ProfileDetails;
