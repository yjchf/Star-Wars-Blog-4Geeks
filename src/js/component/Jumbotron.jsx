import React from "react";
import PropTypes from "prop-types";
import "../../styles/InfoCard.css"
const Jumbotron = (props) => {
  
  const imgErrorHandler = (e) => {
    e.target.src =
      "https://starwars-visualguide.com/assets/img/placeholder.jpg";
  };


  return (
    <div className="container" >
      <div className="row">
        <div className="col-6">
        <div className="container-fluid m-0 p-0 image-container" style={{height: "400px"}}>
          <img
            src={`https://starwars-visualguide.com/assets/img/${props.type}/${props.uid}.jpg`}
            className="card-img-top "
            alt={"..."}
            onError={imgErrorHandler}
            loading="lazy"
          />
         </div> 
        </div>
        <div className="col-6">
          <div className="d-flex flex-column align-items-center">
            <h2>{props.title}</h2>
            <p>{props.text}</p>
          </div>
        </div>
        <div
          className="m-auto mt-3"
          style={{ background: "red", height: "2px", width: "100%" }}
        ></div>
      </div>
      <div className="row">
        <div className="col-12 d-flex text-danger">
          {props.specs}
        </div>
      </div>
    </div>
  );
};

Jumbotron.propTypes = {
  type: PropTypes.string,
  uid: PropTypes.string,
  text: PropTypes.string,
  specs: PropTypes.node
}

export default Jumbotron;
