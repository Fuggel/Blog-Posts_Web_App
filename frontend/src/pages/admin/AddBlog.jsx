import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../../helper/constants";

import "../../scss/pages/admin/_add-blog.scss";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("text", text);
    data.append("image", image);

    if (!title || !text) {
      setError(true);
      return;
    }

    axios.post(`${API_URL}blog`, data);
    navigate("/");
  };

  return (
    <form
      className="add-blog"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h1>Erstelle einen Blog</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Titel"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {error && (
          <p className="error-msg">Bitte gib einen Titel und Text ein.</p>
        )}
        <input
          type="file"
          placeholder="Add an image"
          name="image"
          accept=".jpg,.png,.jpeg"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="edit-btns">
          <Link className="cta btn" to="/">
            Abbrechen
          </Link>
          <button className="edit-btn" type="submit">
            Speichern
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBlog;
