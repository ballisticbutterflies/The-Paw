import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/categories";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBusinesses } from "../../redux/search";


function CategoriesComponent() {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchBusinesses())
  }, [dispatch])

  

  return (
    <>
      <div className="categoryContainer">
        <div >
          { search &&
          <Link to={`/search/?category=1`} >
          <img className="categoryDots" src="../../../public/images/icons/restaurants.png" />
          <span className="categoryStuff">Restaurants</span>
          </Link>
          }
        </div>
        <div >
          <Link>
            <img className="categoryDots" src="../../../public/images/icons/veterinarian.png" />
          </Link>
          <span className="categoryStuff">Veterinarians</span>
        </div>
        <div >
          <Link>
            <img className="categoryDots" src="../../../public/images/icons/services.png" />
          </Link>
          <span className="categoryStuff">Services</span>
        </div>
        <div >
          <Link>
            <img className="categoryDots" src="../../../public/images/icons/shopping.png" />
          </Link>
          <span className="categoryStuff">Shopping</span>
        </div>
        <div >
          <Link>
            <img className="categoryDots" src="../../../public/images/icons/travel.png" />
          </Link>
          <span className="categoryStuff">Travel</span>
        </div>
        <div >
          <Link>
            <img className="categoryDots" src="../../../public/images/icons/activities.png" />
          </Link>
          <span className="categoryStuff">Activities</span>
        </div>
        <div >
          <Link>
            <img className="categoryDots" src="../../../public/images/icons/adoption.png" />
          </Link>
          <span className="categoryStuff">Adoption</span>
        </div>
        <div >
          <Link>
            <img className="categoryDots" src="../../../public/images/icons/other.png" />
          </Link>
          <span className="categoryStuff">Other</span>
        </div>
      </div>
    </>

  )
}

export default CategoriesComponent;
