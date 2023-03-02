import Blogs from "../components/Blogs";

import "../scss/pages/_home.scss";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="tagline-container">
          <h1>
            "WIR STEHEN NICHT <br /> AUF DER LEITUNG!"
          </h1>
          <img src="assets/tagline.jpg" alt="tagline" />
        </div>
      </div>
      <Blogs />
    </>
  );
};

export default Home;
