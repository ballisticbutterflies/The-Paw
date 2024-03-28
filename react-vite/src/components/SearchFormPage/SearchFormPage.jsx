// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "../../redux/search";
import "./SearchForm.css";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import { getTodaysHours } from "../../utils";
import { useEffect } from "react";
import { fetchAllBusinesses } from "../../redux/businesses";


function SearchFormPage() {

  const dispatch = useDispatch();

  const businesses = Object.values(useSelector((state) => state.search))

  const starReviews = (numStars) => {
    let filledStars = []
    let emptyStars = []

    for (let i = 0; i < numStars; i++) {
      filledStars.push(<span className='paws-filled' style={{ fontSize: "large" }}><i className="fa-solid fa-paw" />&nbsp;</span>)
    }
    let empty = 5 - filledStars.length
    for (let i = 0; i < empty; i++) {
      emptyStars.push(<span className='paws-unfilled' style={{ fontSize: "large" }}><i className="fa-solid fa-paw" />&nbsp;</span>)
    }
    return [filledStars, emptyStars]
  }

  const starsToFixed = (stars) => {
    let int = parseInt(stars)
    if (int >= 1) {
      return int.toFixed(1)
    } else {
      return false
    }
  }


  const reviewsExists = (review) => {
    if (review === 1) {
      return '(' + review + ' ' + 'review' + ')'
    }
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

  const handleFilterChange = (filters) => {
    dispatch(fetchBusinesses(filters))
  }

  useEffect(() => {
    dispatch(fetchAllBusinesses(businesses))
    .catch(error => {
      return error
    })
  },[dispatch, businesses])


  return (
    <>
      <div className="searchPage">
        <h1>Paw-Recommended Results:</h1>
        <FilterComponent onFilterChange={handleFilterChange} />
        {businesses.length === 0 ? (
          <span className="noBiz" >No results found.<img src="/images/icons/404.png" /></span>
        ) : (
          businesses && businesses.map((business, index) => (
            <span key={business.id}>
              <Link className="businessCards" style={{ textDecoration: "none" }} to={`/businesses/${business.id}`}>

                <span className="businessesImageWrapper">
                  <img className="businessesImage" src={business.images[0]} alt={business.name} />
                </span>

                <>
                  <span className="businessDeets">
                    <h2>{index + 1}.&nbsp;{business.name}</h2>
                    {
                      business.avg_stars &&

                      business.num_reviews && reviewsExists(business.num_reviews) &&
                      <span>{business?.avg_stars && starReviews(business.avg_stars)}
                        &nbsp;{business?.avg_stars && starsToFixed(business.avg_stars)}
                        &nbsp;{business.num_reviews >= 1 && reviewsExists(business.num_reviews)}</span>

                    }

                    {business.price !== null &&
                      <span className="priceSubcat">{business.category?.name} &nbsp;&#183;&nbsp; {business.price}
                      </span>
                    }

                    {business.price === null &&
                      <span className="priceSubcat">{business.category?.name}
                      </span>
                    }

                    {
                      getTodaysHours(business) &&
                      <span className="todayHours">
                        Today&apos;s Hours: {getTodaysHours(business).open} - {getTodaysHours(business).close}
                      </span>
                    }

                    <span>
                      {business.recent_review_text ?
                        (
                          <>
                            <i className="fa-regular fa-message fa-flip-horizontal" />

                            &nbsp;&nbsp;
                            {business.recent_review_text &&
                              reviewTextSubstr(business.recent_review_text)
                            }                      </>) : (

                          <span><span className='paws-unfilled' style={{ fontSize: "medium" }}><i className="fa-solid fa-paw" /></span>&nbsp;&nbsp;Be the first to review!</span>
                        )}
                    </span>
                  </span>
                </>
              </Link>
            </span>
          ))
        )}

      </div>
    </>
  );
}

export default SearchFormPage;
