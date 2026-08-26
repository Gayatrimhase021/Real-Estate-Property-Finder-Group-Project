import React from "react";
import "./TeamCard.css";

const TeamCard = ({ image, name, role, description }) => {
  return (
    <div className="team-card">
      <div className="team-image">
        <img src={image} alt={name} />
      </div>

      <div className="team-content">
        <h3>{name}</h3>
        <span>{role}</span>

        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default TeamCard;