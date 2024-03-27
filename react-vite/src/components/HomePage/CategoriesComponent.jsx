import {  useState } from "react";
import { Link } from "react-router-dom";
import { searchBarBusinesses } from "../../redux/search";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CategoriesComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location] = useState('');

  const handleCategoryClick = (category) => {
    dispatch(searchBarBusinesses(category, location))
      .then(() => navigate('/search'));
  };


  return (
    <>
      <div className="categoryContainer">
        <div onClick={() => handleCategoryClick("Restaurants")}>
          <Link value={searchQuery} onClick={(e) => setSearchQuery(e.target.value)}>
            <img className="categoryDots" src="/images/icons/restaurants.png" />
          </Link>
          <span className="categoryStuff">Restaurants</span>
        </div>
        <div onClick={() => handleCategoryClick("Veterinarians")}>
          <Link value={searchQuery} onClick={(e) => setSearchQuery(e.target.value)}>
            <img className="categoryDots" src="/images/icons/veterinarian.png" />
          </Link>
          <span className="categoryStuff">Veterinarians</span>
        </div>
        <div onClick={() => handleCategoryClick("Services")}>
          <Link value={searchQuery} onClick={(e) => setSearchQuery(e.target.value)}>
            <img className="categoryDots" src="/images/icons/services.png" />
          </Link>
          <span className="categoryStuff">Services</span>
        </div>
        <div onClick={() => handleCategoryClick("Shopping")}>
          <Link value={searchQuery} onClick={(e) => setSearchQuery(e.target.value)}>
            <img className="categoryDots" src="/images/icons/shopping.png" />
          </Link>
          <span className="categoryStuff">Shopping</span>
        </div>
        <div onClick={() => handleCategoryClick("Travel")}>
          <Link value={searchQuery} onClick={(e) => setSearchQuery(e.target.value)}>
            <img className="categoryDots" src="/images/icons/travel.png" />
          </Link>
          <span className="categoryStuff">Travel</span>
        </div>
        <div onClick={() => handleCategoryClick("Activities")}>
          <Link value={searchQuery} onClick={(e) => setSearchQuery(e.target.value)}>
            <img className="categoryDots" src="/images/icons/activities.png" />
          </Link>
          <span className="categoryStuff">Activities</span>
        </div>
        <div onClick={() => handleCategoryClick("Adoption")}>
          <Link value={searchQuery} onClick={(e) => setSearchQuery(e.target.value)}>
            <img className="categoryDots" src="/images/icons/adoption.png" />
          </Link>
          <span className="categoryStuff">Adoption</span>
        </div>
        <div onClick={() => handleCategoryClick("Other")}>
          <Link value={searchQuery} onClick={(e) => setSearchQuery(e.target.value)}>
            <img className="categoryDots" src="/images/icons/other.png" />
          </Link>
          <span className="categoryStuff">Other</span>
        </div>
      </div>
    </>

  )
}

export default CategoriesComponent;
