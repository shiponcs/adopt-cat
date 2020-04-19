import React from "react";
import { Link } from "@reach/router";

const Pet = (props) => {
  return (
    <Link to={`/details/${props.id}`}>
      <div className="pet-container">
        <img className="round-image" src={props.media[0].small} alt="" />
        <div className="pet-information">
          <h2>{props.name}</h2>
          <h4>
            {props.animal} - {props.breed} - {props.location}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default Pet;
