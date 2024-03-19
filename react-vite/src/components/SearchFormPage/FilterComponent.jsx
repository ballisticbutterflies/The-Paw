import { useState } from "react";

import StarRatingInput from "./StarRatingInput";



const FilterComponent = ({ onFilterChange }) => {

  const [stars, setStars] = useState("")

  const handleFilterChange = (e) => {
    // Construct URL with filter parameters
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (stars !== "") {
      queryParams.append("rating", stars);
    }

    const queryString = queryParams.toString();

    const url = `${queryString}`;

    onFilterChange(url)
  }

  const onChangeStars = (number) => {
    setStars(parseInt(number))
  }



  return (
    <>
      <div className="filterComponent" >
        <h3>Filters</h3>
        <div className="pawRatingInputFilter">
          <h4>Paw Rating</h4>
          <StarRatingInput
            onChange={onChangeStars}
            stars={stars}
          />
        </div>
        <div className="priceInputFilter">
          <h4>Price</h4>

        </div>
        <button onClick={handleFilterChange}>Apply Filters</button>
      </div>
    </>
  )
}

export default FilterComponent;
