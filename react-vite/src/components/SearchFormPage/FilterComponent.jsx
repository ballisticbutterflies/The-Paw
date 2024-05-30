import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import StarRatingInput from "./StarRatingInput";
import { fetchBusinesses } from "../../redux/search";
import { useLocation, useNavigate } from "react-router-dom";


const FilterComponent = ({ onFilterChange, isMobile, isTablet }) => {

  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const category = searchParams.get('category') || '';
  // const prices = searchParams.get('price')?.split(',') || [];
  // const ratings = searchParams.get('rating') || '';


  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  const ulRef = useRef();

  const [stars, setStars] = useState(searchParams.get('rating') || "");
  const [price, setPrice] = useState([
    { name: "$", checked: searchParams.has('price') && searchParams.get('price') === "$" },
    { name: "$$", checked: searchParams.has('price') && searchParams.get('price') === "$$" },
    { name: "$$$", checked: searchParams.has('price') && searchParams.get('price') === "$$$" },
    { name: "$$$$", checked: searchParams.has('price') && searchParams.get('price') === "$$$$" }
  ]);
  const [category_id, setCategory_id] = useState(searchParams.get('category') || "");

  const [resetRating, setResetRating] = useState(false);

  const categories = ['Restaurants', 'Veterinarians','Services', 'Shopping', 'Travel', 'Activities', 'Adoption', 'Other']

  const queryParams = new URLSearchParams();
  const handleFilterChange = (e) => {

    e.preventDefault();

    if (stars !== "") {
      queryParams.append("rating", stars);
    }

    if (price.checked !== false) {

      let priceObj = [...price]
      let searchingPrice = priceObj.filter((char) => char.checked === true);
      let result = searchingPrice.map(ele => ele.name)

      let string = result.toString()

      if (string.length > 0 ) {
        queryParams.append("price", string);
      }
      setPrice(price)
    }

    if (category_id !== null) {
      queryParams.append('category', category_id)
    }

    const queryString = queryParams.toString();

    const url = `${queryString}`;

    onFilterChange(url)
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



  const handleClick = e => {
    e.preventDefault();
    setStars('')
    setPrice(price.map(p => ({ ...p, checked: false })));
    setCategory_id('')
    setResetRating(prevState => !prevState);
    onFilterChange('');
    dispatch(fetchBusinesses()).then(() => {
      navigate('/search')
    })
    closeMenu();
  }

  useEffect(() => {
    const searchParamss = new URLSearchParams(location.search);
    setStars(searchParamss.get('rating') || "");
    setCategory_id(searchParamss.get('category') || "");
    setResetRating(prevState => !prevState);

    // Update price filter based on searchParams
    setPrice([
      { name: "$", checked: searchParamss.has('price') && searchParamss.get('price') === "$" },
      { name: "$$", checked: searchParamss.has('price') && searchParamss.get('price') === "$$" },
      { name: "$$$", checked: searchParamss.has('price') && searchParamss.get('price') === "$$$" },
      { name: "$$$$", checked: searchParamss.has('price') && searchParamss.get('price') === "$$$$" }
    ]);
  }, [location.search]);

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
