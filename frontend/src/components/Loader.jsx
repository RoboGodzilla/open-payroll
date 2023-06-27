/* eslint-disable react/prop-types */
import "../assets/styles/Loader.css";
const Loader = ({ absolute }) => {
  return (
    <div
      className={absolute ? "loader-container-absolute" : "loader-container"}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
