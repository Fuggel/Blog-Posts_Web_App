import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import { API_URL } from "../../helper/constants";

import "../../scss/pages/admin/_edit-blog.scss";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`${API_URL}blog/edit/${id}`, { title, text });
    navigate("/");
  };

  useEffect(() => {
    if (text.length < 1 && title.length < 1) setDisabled(true);
    else setDisabled(false);
  }, [text, title]);

  return (
    <form className="edit-blog" onSubmit={handleSubmit}>
      <h1>Bearbeite den Blog</h1>
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
        <div className="edit-btns">
          <Link className="cta btn" to="/">
            Abbrechen
          </Link>
          <button
            className="edit-btn"
            style={
              disabled ? { cursor: "not-allowed", background: "#888" } : {}
            }
            disabled={disabled}
            type="submit"
          >
            Speichern
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditBlog;
