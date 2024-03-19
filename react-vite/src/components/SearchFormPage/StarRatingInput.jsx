import { useEffect, useState } from "react";

const StarRatingInput = ({ stars, onChange }) => {

  const [ activeRating, setActiveRating ] = useState(stars)

  useEffect(() => {
    setActiveRating(stars)
  }, [stars])

  return (
    <>
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((starOrder) => (
          <span
            key={starOrder}
            className={activeRating >= starOrder ? "paws-filled" : "paws-unfilled"}
            onMouseEnter={() => setActiveRating(starOrder)}
            onMouseLeave={() => setActiveRating(activeRating)}
            onClick={() => onChange(starOrder)}
          >
            <i className="fa-solid fa-paw"/>&nbsp;
          </span>
        ))}
          {activeRating && activeRating > 1 && activeRating < 5 &&
            <span>{activeRating}&nbsp;Paws&nbsp;&&nbsp;Up!</span>
          }
          { activeRating && activeRating === 1 &&
            <span>{activeRating}&nbsp;Paw&nbsp;&&nbsp;Up!</span>
          }
          { activeRating && activeRating === 5 &&
            <span>{activeRating}&nbsp;Paws!</span>
          }
      </div>
    </>
  )
}

export default StarRatingInput;
