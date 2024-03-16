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

  useEffect(() => {
    dispatch(fetchBusinesses())
  }, [dispatch])

  return (
    <>
      <h1>Paw-Recommended Results:</h1>
      {businesses && businesses.map((business) => (
        <ol
          className="businessCards"
          key={business.id}
        >
          <Link style={{ textDecoration: 'none' }}to={`/businesses/${business.id}`}>
            <span><img src='https://i.imgur.com/9bEZuYg.png' alt={business.images} /></span>
            <div>{business.name}</div>
            <div>{business.avg_stars && starReviews(business.avg_stars)} · {business.avg_stars.toFixed(1)} ({business.num_reviews} reviews)</div>
            <div>CATEGORIES PLACEHOLDER · {business.price}</div>
            <div>HOURS PLACEHOLDER</div>
            <div><i className="fa-regular fa-message fa-flip-horizontal" />&nbsp;{business.recent_review_text}</div>
          </Link>
        </ol>
      ))}

    </>
  );
}

export default SearchFormPage;
