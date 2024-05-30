import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import StarRatingInput from "./StarRatingInput";
import { fetchBusinesses } from "../../redux/search";
import { useLocation, useNavigate } from "react-router-dom";


const FilterComponent = ({ onFilterChange, isMobile, isTablet }) => {

  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  const ulRef = useRef();

  const [resetRating, setResetRating] = useState(false);
  const [stars, setStars] = useState("")
  const [price, setPrice] = useState([
    { name: "$", checked: false },
    { name: "$$", checked: false },
    { name: "$$$", checked: false },
    { name: "$$$$", checked: false },
  ])
  const [category_id, setCategory_id] = useState(category)

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

    if (category_id !== null) {
      queryParams.append('category', category_id)
    }

    const queryString = queryParams.toString();

    const url = `${queryString}`;

    console.log(url, "AYAYAYYAAY")
    onFilterChange(url, 1, 10)
    closeMenu();
  }

  const onChangeStars = (number) => {
    if (number) {
      setStars(parseInt(number))
    } else {
      setStars("")
    }
  }


  const updatePrice = (i, isChecked) => {
    const updatedPrice = [...price];
    updatedPrice[i].checked = isChecked
    setPrice(updatedPrice)
  }

  const categories = ['Restaurants', 'Veterinarians',
    'Services', 'Shopping',
    'Travel', 'Activities',
    'Adoption', 'Other']

  const handleClick = e => {
    e.preventDefault();
    setStars('')
    setPrice([
      { name: "$", checked: false },
      { name: "$$", checked: false },
      { name: "$$$", checked: false },
      { name: "$$$$", checked: false },
    ])
    setCategory_id('')
    setResetRating(prevState => !prevState);
    dispatch(fetchBusinesses()).then(() => {
      navigate('/search')
    })
    closeMenu();
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  return (
    (isMobile || isTablet) ? (
      <>
        <div className="filterButtonWrapper">
          <button className="filterButton" onClick={toggleMenu}><i className="fa-solid fa-filter" />&nbsp; Filter</button>
          <div className="outerFilterWrapper" ref={ulRef}>
            {showMenu && (
              <>
                <div className="filterComponent" >
                  <div className="pawRatingInputFilter">
                    <h4>Paw Rating</h4>
                    <StarRatingInput
                      onChange={onChangeStars}
                      stars={stars}
                      reset={resetRating}
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
                        {char.name}&nbsp;&nbsp;
                      </label>
                    )}
                  </div>
                  <div className="categoryFilter">
                    <h4>Category</h4>
                    <select
                      value={category_id}
                      onChange={(e) => setCategory_id(e.target.value)}
                      name="category"
                    >
                      <option value="">Select A New Category</option>
                      {categories.map((category, index) => (
                        <option key={category} value={parseInt(index + 1)}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-buttons">
                    <button className="apply-filter-button" onClick={handleFilterChange}>Apply Filters</button>
                    <button className="clear-filter-button" onClick={handleClick}>Clear Filters</button>
                  </div>
                </div >
              </>
            )}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="filterComponent" >
          <h3>Filters</h3>
          <div className="pawRatingInputFilter">
            <h4>Paw Rating</h4>
            <StarRatingInput
              onChange={onChangeStars}
              stars={stars}
              reset={resetRating}
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
                {char.name}&nbsp;&nbsp;
              </label>
            )}
          </div>
          <div className="categoryFilter">
            <h4>Category</h4>
            <select
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
              name="category"
            >
              <option value="">Select A New Category</option>
              {categories.map((category, index) => (
                <option key={category} value={parseInt(index + 1)}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-buttons">
            <button className="apply-filter-button" onClick={handleFilterChange}>Apply Filters</button>
            <button className="clear-filter-button" onClick={handleClick}>Clear Filters</button>
          </div>
        </div >
      </>
    )
  )
}

export default FilterComponent;
