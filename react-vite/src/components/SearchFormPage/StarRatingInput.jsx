import { useState, useEffect } from "react";

const StarRatingInput = ({ stars, onChange, reset }) => {

  const [activeRating, setActiveRating] = useState(stars)


  useEffect(() => {
    setActiveRating(stars); // Reset active rating when stars prop changes
  }, [stars, reset]);


  const handleStarClick = (starOrder) => {
    const newRating = starOrder === activeRating ? null : starOrder;
    setActiveRating(newRating);
    onChange(newRating);
  };



  return (
    <>
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((starOrder) => (
          <span
          key={starOrder}
          className={activeRating >= starOrder ? "paws-filled" : "paws-unfilled"}
          onClick={() => handleStarClick(starOrder)}
        >
            <i className="fa-solid fa-paw" />&nbsp;
          </span>
        ))}
        {activeRating !== 0 && (

          <span className="rating-paw-text">
            {activeRating && activeRating > 1 && activeRating < 5 &&
              <span>{activeRating}&nbsp;Paws&nbsp;&&nbsp;Up!</span>
            }
            {activeRating && activeRating === 1 &&
              <span>{activeRating}&nbsp;Paw&nbsp;&&nbsp;Up!</span>
            }
            {activeRating && activeRating === 5 &&
              <span>{activeRating}&nbsp;Paws!</span>
            }
          </span>
        )}
      </div>
    </>
  )
}

export default StarRatingInput;
