import React from "react";

function SmallCard({ text, cardName }) {

  return (
    <div className='smallcard-box'>
      <h2>{cardName}</h2>
      <p>{text}</p>
    </div>
  );
}

export default SmallCard;