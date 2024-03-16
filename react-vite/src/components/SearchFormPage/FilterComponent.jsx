import { useState } from "react";
import StarRatingInput from "./StarRatingInput";

const FilterComponent = ({ onFilterChange }) => {
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [stars, setStars] = useState(0)

  const handleFilterChange = () => {
    //call parent component callback to filter results
    onFilterChange({ rating, price })
  }

  const onChange = (number) => {
    setStars(parseInt(number))
  }

  return (
    <>
      <StarRatingInput
        onChange={onChange}
        stars={stars}
      />
      
    </>
  )
}

export default FilterComponent;
