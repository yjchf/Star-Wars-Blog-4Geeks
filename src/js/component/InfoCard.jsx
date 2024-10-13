import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/InfoCard.css";
import { Context } from "../store/appContext";
const InfoCard = (props) => {
  const { store, actions } = useContext(Context);
  const [isFavorite, setIsFavorite] = useState(
    store.favorites.some(
      (fav) => fav.uid == props.uid && fav.type == props.type
    )
  );

  useEffect(() =>{
    setIsFavorite(store.favorites.some(
      (fav) => fav.uid == props.uid && fav.title == props.title
    ))
  },[store.favorites])

  const handleFavoriteClick = () => {
    if (isFavorite) {
      actions.removeFavorite(props.uid,props.type);
    } else {
      actions.addFavorite({
        uid: props.uid,
        title: props.title,
        type: props.type,
      }); 
    }
    setIsFavorite(!isFavorite);
  };

  const imgErrorHandler = (e) => {
    e.target.src =
      "https://starwars-visualguide.com/assets/img/placeholder.jpg";
  };

  const title = props.title || "Title by Default";
  return (
    <div className="card" style={{ minWidth: "320px", height: "100%" }}>
      <div className="container-fluid m-0 p-0 image-container">
        <img
          src={`https://starwars-visualguide.com/assets/img/${props.type}/${props.uid}.jpg`}
          className="card-img-top "
          alt={title}
          onError={imgErrorHandler}
          loading="lazy"
        />
      </div>
      <div className="card-body text-start ">
        <h5 className="card-title bold ms-3 mb-0">{title}</h5>
        {props.body}
        <div className="d-flex justify-content-between">
          <Link
            to={`/${props.type}/${props.uid}`}
            className="btn btn-outline-primary pt-2"
          >
            Learn More
          </Link>
          <button
            onClick={handleFavoriteClick}
            className={`btn btn-outline-warning fs-4 ${
              isFavorite ? "active text-light" : "text-secondary"
            }`}          >
            ♥️
          </button>
        </div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  uid: PropTypes.string,
  body: PropTypes.node,
};

export default InfoCard;
