import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "../../redux/search";
import "./SearchForm.css";
import { Link } from "react-router-dom";


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

  const reviewTextSubstr = (text) => {
    if (text.length > 85) {
      return text.substring(0, 85) + "..."
    } else {
      return text
    }
  }

  const starsToFixed = (avgstars) => {
    if (avgstars) {
      return avgstars.toFixed(1) + ' ' + ' · '
    } else {
      return null
    }
  }

  const numReviewsExists = (review) => {
    if (review >= 1) {
      return '(' + review  + ' ' + 'reviews' + ')'
    } else {
      return null
    }
  }

  useEffect(() => {
    dispatch(fetchBusinesses())
  }, [dispatch])

  return (
    <>
      <h1>Paw-Recommended Results:</h1>
      {businesses && businesses.map((business) => (
        <ol
          key={business.id}
        >
          <Link className="businessCards" style={{ textDecoration: 'none' }} to={`/businesses/${business.id}`}>
            <span >
              <img className="businessesImage" src='https://i.imgur.com/9bEZuYg.png' alt={business.images} />
            </span>
            <ol >
              <li>
                <span className="businessDeets">
                  <span>{business.name}</span>
                  <span>{business.avg_stars &&
                          starReviews(business.avg_stars)}&nbsp;
                          {business.avg_stars && starsToFixed(business.avg_stars)} &nbsp;
                          {business.num_reviews && numReviewsExists(business.num_reviews )} </span>
                  <span>CATEGORIES PLACEHOLDER · {business.price}</span>
                  <span>HOURS PLACEHOLDER</span>
                  <span>

                    {business.recent_review_text &&
                      <span>
                      <i className="fa-regular fa-message fa-flip-horizontal" />&nbsp;
                      {reviewTextSubstr(business.recent_review_text)}
                      </span>
                    }
                  </span>
                </span>
              </li>
            </ol>
          </Link>

        </ol>
      ))}

    </>
  );
}

export default SearchFormPage;
