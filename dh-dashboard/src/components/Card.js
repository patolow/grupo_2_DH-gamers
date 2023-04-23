import React from "react";
import ClipLoader from "react-spinners/ClipLoader";


function Card({ text, cardName, loading }) {

  if (loading) {
    return (
      <div className='total-box-spinner'>
        <ClipLoader className="spinner"
          loading={loading}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  }

  return (
    <div className='total-box'>
      <h2>{cardName}</h2>
      <p>{text}</p>
    </div>
  );
}

export default Card;