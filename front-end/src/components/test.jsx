import { useRef, useState } from "react";

export default function Test() {
  const imageInput = useRef(null);
  const [username, setUsername] = useState("");

  const uploadImage = async () => {
    let image = imageInput.current.files[0];
    // let userId = user.uid;
    let userId = "YPlOVZ8FuGRe6wc0zedllaqAtb52";
    const url = `http://127.0.0.1:8000/api/edit/${userId}/`;
    let name = username;

    let formData = new FormData();
    formData.append("profile_picture", image);
    formData.append("username", name);

    let newImage = await fetch(url, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="overlay">
        <div className="modular">
          <section className="modular-section">
            <h1>this is somethging</h1>
            <p>something</p>
          </section>
        </div>
      </div>

      <input type="file" ref={imageInput} />
      <button onClick={uploadImage}>Submit</button>
      <input
        placeholder="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
    </>
  );
}
