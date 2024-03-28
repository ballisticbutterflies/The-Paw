import {  useState } from "react";
import { Link } from "react-router-dom";
import { fetchBusinesses, searchBarBusinesses } from "../../redux/search";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CategoriesComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleCategoryClick = (category) => {
    const queryParams = new URLSearchParams();
    queryParams.append('category', category)
    const queryString = queryParams.toString();
    const url = `${queryString}`;
    dispatch(fetchBusinesses(url))
      .then(() => navigate('/search'));
  };


  return (
    <>
      <div className="categoryContainer">
        <div onClick={() => handleCategoryClick(1)}>
          <Link value={category} onClick={(e) => setCategory(e.target.value)}>
            <img className="categoryDots" src="/images/icons/restaurants.png" />
          </Link>
          <span className="categoryStuff">Restaurants</span>
        </div>
        <div onClick={() => handleCategoryClick(2)}>
          <Link value={category} onClick={(e) => setCategory(e.target.value)}>
            <img className="categoryDots" src="/images/icons/veterinarian.png" />
          </Link>
          <span className="categoryStuff">Veterinarians</span>
        </div>
        <div onClick={() => handleCategoryClick(3)}>
          <Link value={category} onClick={(e) => setCategory(e.target.value)}>
            <img className="categoryDots" src="/images/icons/services.png" />
          </Link>
          <span className="categoryStuff">Services</span>
        </div>
        <div onClick={() => handleCategoryClick(4)}>
          <Link value={category} onClick={(e) => setCategory(e.target.value)}>
            <img className="categoryDots" src="/images/icons/shopping.png" />
          </Link>
          <span className="categoryStuff">Shopping</span>
        </div>
        <div onClick={() => handleCategoryClick(5)}>
          <Link value={category} onClick={(e) => setCategory(e.target.value)}>
            <img className="categoryDots" src="/images/icons/travel.png" />
          </Link>
          <span className="categoryStuff">Travel</span>
        </div>
        <div onClick={() => handleCategoryClick(6)}>
          <Link value={category} onClick={(e) => setCategory(e.target.value)}>
            <img className="categoryDots" src="/images/icons/activities.png" />
          </Link>
          <span className="categoryStuff">Activities</span>
        </div>
        <div onClick={() => handleCategoryClick(7)}>
          <Link value={category} onClick={(e) => setCategory(e.target.value)}>
            <img className="categoryDots" src="/images/icons/adoption.png" />
          </Link>
          <span className="categoryStuff">Adoption</span>
        </div>
        <div onClick={() => handleCategoryClick(8)}>
          <Link value={category} onClick={(e) => setCategory(e.target.value)}>
            <img className="categoryDots" src="/images/icons/other.png" />
          </Link>
          <span className="categoryStuff">Other</span>
        </div>
      </div>
    </>

  )
}

export default CategoriesComponent;
