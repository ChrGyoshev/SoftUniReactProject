import { useState } from "react";
import { useUser } from "./../UserContext";

const EditProfile = ({
  ShowEditProfileModular,
  handleFormSubmit,
  profile,
  handleErrors,
}) => {
  const { user, token } = useUser();
  const [formData, setFormData] = useState({
    username: profile.username ?? "",
    phone_number: profile.phone_number ?? "",
    gender: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const BaseUrl = `https://react-app-book-buzz.onrender.com/api/edit/${user.uid}/`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = `https://react-app-book-buzz.onrender.com/media/profile-picture/${file.name}`;
      setFormData({ ...formData, profile_picture: filePath });
      setSelectedFile(file);
    }
  };

  const removePicture = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: "",
    }));
    setSelectedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      newData.append(key, value);
    });

    if (selectedFile) {
      newData.append("profile_picture", selectedFile);
    }

    fetch(BaseUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            Object.keys(errorData.errors).forEach((field) => {
              const errorMsgs = errorData.errors[field];
              handleErrors(errorMsgs);
            });

            throw new Error(response.status);
          });
        }

        return response.json();
      })
      .then((responseData) => {
        setFormData(responseData);
        handleFormSubmit(responseData);
        ShowEditProfileModular();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="overlay" onClick={ShowEditProfileModular}></div>

      <div className="modular">
        <section className="form-edit-profile">
          <button
            className="button-close-edit-profile"
            onClick={ShowEditProfileModular}
          >
            x
          </button>

          <h1>Edit Profile</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
              placeholder="Enter username"
            />
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="Enter phone number"
              onChange={handleInputChange}
              value={formData.phone_number}
            />
            <label htmlFor="">Upload Profile Picture:</label>
            <input
              className="upload-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              onChange={handleInputChange}
              value={formData.gender}
            >
              <option value="">----</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="edit-profile-btns">
              <button onClick={removePicture}>Remove Profile Picture</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default EditProfile;
