import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "../../redux/search";
import "./SearchForm.css";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";


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

  useEffect(() => {
    dispatch(fetchBusinesses())
  }, [dispatch])

  return (
    <>
      <h1>Paw-Recommended Results:</h1>
      {businesses && businesses.map((business) => (
        <ol key={business.id}>
          <Link className="businessCards" style={{ textDecoration: 'none' }} to={`/businesses/${business.id}`}>
            <img className="businessesImage" src='https://i.imgur.com/9bEZuYg.png' alt={business.images} />
            <ol >
              <li>
                <span className="businessDeets">
                  <span>{business.name}</span>
                  <span>{business.avg_stars && starReviews(business.avg_stars)} · {business.avg_stars.toFixed(1)} ({business.num_reviews} reviews)</span>
                  <span>CATEGORIES PLACEHOLDER · {business.price}</span>
                  <span>HOURS PLACEHOLDER</span>
                  <span>
                    <i className="fa-regular fa-message fa-flip-horizontal" />
                    &nbsp;
                    {business.recent_review_text &&
                      reviewTextSubstr(business.recent_review_text)
                    }
                  </span>
                </span>
              </li>
            </ol>
          </Link>

        </ol>
      ))}
      <FilterComponent />
    </>
  );
}

export default SearchFormPage;
