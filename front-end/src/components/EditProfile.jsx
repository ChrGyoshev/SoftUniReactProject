import { useState } from "react";

const EditProfile = ({ showProfile, onFormSubmit, userId }) => {
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const BaseUrl = `http://127.0.0.1:8000/api/edit/${userId}/`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = `http://localhost:8000/media/profile-picture/${file.name}`;
      setFormData({ ...formData, profile_picture: filePath });
      setSelectedFile(file);
    }
  };

  const removePicture = () => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: "",
    }));
    setSelectedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        newData.append(key, formData[key]);
      }
    }
    if (selectedFile) {
      newData.append("profile_picture", selectedFile);
    }

    const patch = async () => {
      try {
        const response = await fetch(BaseUrl, {
          method: "PATCH",
          body: newData,
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        setFormData(await response.json());

        onFormSubmit(formData);
      } catch (error) {
        console.error(error);
      }
    };

    patch().then(() => {
      showProfile();
    });
  };

  return (
    <>
      <div className="overlay" onClick={showProfile}></div>

      <div className="modular">
        <section className="form-edit-profile">
          <button className="button-close-edit-profile" onClick={showProfile}>
            x
          </button>
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              onChange={handleInputChange}
            />

            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="Enter phone number"
              onChange={handleInputChange}
            />
            <label htmlFor="">Upload Profile Picture:</label>
            <input
              className="upload-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" onChange={handleInputChange}>
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
