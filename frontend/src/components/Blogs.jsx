import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/authContext";
import { API_URL } from "../helper/constants";

import "../scss/components/_blogs.scss";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const MAX_CONTENT_LENGTH = 1000;

  useEffect(() => {
    axios
      .get(`${API_URL}blog`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        if (err.response) console.log(err);
      });
  }, [blogs]);

  const deleteBlog = (id) => {
    axios.delete(`${API_URL}blog/${id}`).catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <>
      {blogs &&
        blogs.map((blog) => (
          <div key={blog._id} className="blog">
            <>
              <h1>{blog.title}</h1>
              <hr className="separator" />
              <p>
                {blog.text.length > MAX_CONTENT_LENGTH
                  ? `${blog.text.substring(0, MAX_CONTENT_LENGTH)}...`
                  : blog.text}
              </p>
              <hr className="separator" />
              {blog.image && (
                <img src={API_URL + blog.image} alt={blog.title} />
              )}
            </>
            {isLoggedIn && !openEdit && (
              <div className="blog-btns">
                <button
                  className="cta blog-btn"
                  onClick={() => deleteBlog(blog._id)}
                >
                  Löschen
                </button>
                <Link
                  className="edit-btn btn"
                  to={`/blog/edit/${blog._id}`}
                  onClick={() => setOpenEdit(true)}
                >
                  Bearbeiten
                </Link>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default Blogs;
