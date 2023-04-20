import React from "react";

function Card({ text, cardName, loading }) {

  if (loading) {return (null)}

  return (
    <div className='total-box'>
      <h2>{cardName}</h2>
      <p>{text}</p>
    </div>
  );
}

export default Card;