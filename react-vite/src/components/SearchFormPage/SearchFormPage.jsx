import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "../../redux/search";
import "./SearchForm.css";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import { starsToFixed } from ".";


function SearchFormPage() {

  const dispatch = useDispatch();

  const businesses = Object.values(useSelector((state) => state.search))

  const starReviews = (numStars) => {
    let filledStars = []
    let emptyStars = []

    for (let i = 0; i < numStars; i++) {
      filledStars.push(<span className='paws-filled'><i className="fa-solid fa-paw" />&nbsp;</span>)
    }
    let empty = 5 - filledStars.length
    for (let i = 0; i < empty; i++) {
      emptyStars.push(<span className='paws-unfilled'><i className="fa-solid fa-paw" />&nbsp;</span>)
    }
    return [filledStars, emptyStars]
  }


  const reviewsExists = (review) => {
    if (review >= 1) {
      return '(' + review + ' ' + 'reviews' + ')'
    }
    return false
  }

  const reviewTextSubstr = (text) => {
    if (text.length > 85) {
      return text.substring(0, 85) + "..."
    } else {
      return text
    }
  }


  useEffect(() => {
    dispatch(fetchBusinesses())
  }, [dispatch])

  const handleFilterChange = (filters) => {
    dispatch(fetchBusinesses(filters))

  }

  return (
    <>
      <h1>Paw-Recommended Results:</h1>
      <div className="searchPage">
        <FilterComponent onFilterChange={handleFilterChange} />
        {businesses && businesses.map((business, index) => (
          <span key={business.id}>
            <Link className="businessCards" style={{ textDecoration: "none" }} to={`/businesses/${business.id}`}>
              <span>
                <img className="businessesImage" src={business.images} alt={business.name} />
              </span>
              <>
                <span key={`bizDeets-${business.id}`} className="businessDeets">
                  <span>{index + 1}.&nbsp;{business.name}</span>
                  {reviewsExists(business.num_reviews) &&
                    <span>{business.avg_stars && starReviews(business.avg_stars)}
                      &nbsp;{business.avg_stars && starsToFixed(business.avg_stars)}
                      &nbsp;{business.num_reviews >= 1 && reviewsExists(business.num_reviews)}</span>
                  }
                  <span>CATEGORIES PLACEHOLDER · {business.price}</span>
                  <span>HOURS PLACEHOLDER</span>
                  <span>
                    {business.recent_review_text &&
                      <>
                        <i className="fa-regular fa-message fa-flip-horizontal" />
                      </>
                    }&nbsp;
                    {business.recent_review_text &&
                      reviewTextSubstr(business.recent_review_text)
                    }
                  </span>
                </span>
              </>
            </Link>
          </span>
        ))}

      </div>
    </>
  );
}

export default SearchFormPage;
