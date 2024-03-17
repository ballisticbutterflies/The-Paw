import { useState } from "react";
import StarRatingInput from "./StarRatingInput";
import PriceInput from "./PriceInput";


const FilterComponent = ({ onFilterChange }) => {

  const [price, setPrice] = useState('');
  const [stars, setStars] = useState("")

  const handleFilterChange = () => {
    // Construct URL with filter parameters
    const queryParams = new URLSearchParams();
    if (stars !== "") {
      queryParams.append("rating", stars);
    }
    if (price !== "") {
      queryParams.append("price", price);
    }
    const queryString = queryParams.toString();

    const url = `/api/search/?${queryString}`;


    // Fetch businesses with filter criteria from backend
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Call parent component callback to update filtered businesses
        onFilterChange(data);
      })
      .catch(error => {
        console.error("Error fetching filtered businesses:", error);
      });
  }

  const onChangeStars = (number) => {
    setStars(parseInt(number))
  }

  const onChangePrice = (number) => {
    setPrice(parseInt(number))
  }

  return (
    <>
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
        <PriceInput
          onChange={onChangePrice}
          price={price}
        />
      </div>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </>
  )
}

export default FilterComponent;
