import { useState } from "react";
import StarRatingInput from "./StarRatingInput";


const FilterComponent = ({ onFilterChange }) => {

  const [stars, setStars] = useState("")
  const [price, setPrice] = useState([
    { name: "$", checked: false },
    { name: "$$", checked: false },
    { name: "$$$", checked: false },
    { name: "$$$$", checked: false },
  ])
  const [category, setCategory] = useState('')

  const handleFilterChange = (e) => {
    // Construct URL with filter parameters
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (stars !== "") {
      queryParams.append("rating", stars);
    }

    if (price.checked !== false) {
      let priceObj = [...price]
      let searchingPrice = priceObj.filter((char) => char.checked === true);
      let result = searchingPrice.map(ele => ele.name)

      let string = result.toString()
      queryParams.append("price", string);

    }

    const queryString = queryParams.toString();

    const url = `${queryString}`;

    onFilterChange(url)
  }

  const onChangeStars = (number) => {
    setStars(parseInt(number))
  }

  const updatePrice = (i, isChecked) => {
    const updatedPrice = [...price];
    updatedPrice[i].checked = isChecked
    setPrice(updatedPrice)
  }

  const categories = ['Restaurants', 'Veterinarians',
              'Services', 'Shopping',
              'Travel', 'Activities',
              'Adoption', 'More...']


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
          {price.map((char, index) =>
            <label key={char.name}>
              <input
                key={index}
                type="checkbox"
                checked={char.checked}
                onChange={() => updatePrice(index, !char.checked)}
                />
                {char.name}
            </label>
          )}
        </div>
        <div>
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="state"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={category} value={index + 1}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleFilterChange}>Apply Filters</button>
      </div>
    </>
  )
}

export default FilterComponent;
