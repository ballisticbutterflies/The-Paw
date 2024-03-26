import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrUserBusinesses } from "../../redux/businesses";
import { Link } from "react-router-dom";
import "./ManageBusiness.css"
import ManageBizButton from "./ManageBusinessButton";

function ManageBusinessPage() {

  const dispatch = useDispatch();

  const businesses = Object.values(useSelector(state => state.businesses))

  useEffect(() => {
    dispatch(loadCurrUserBusinesses())
  }, [dispatch])

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

  const starsToFixed = (stars) => {
    let int = parseInt(stars)
    if (int >= 1) {
      return int.toFixed(1)
    } else {
      return false
    }
  }

  const reviewsExists = (review) => {
    if (review >= 1) {
      return '(' + review + ' ' + 'reviews' + ')'
    }
    return false
  }

  const descriptionTextSubstr = (text) => {
    if (text.length > 85) {
      return text.substring(0, 85) + "..."
    } else {
      return text
    }
  }

  return (
    <div className="manBizPage">
      <h1>Manage Businesses</h1>
      {businesses && businesses.map((business, index) => (
        <div key={business.id} className="bizandbutton">
            <Link style={{ textDecoration: "none" }} className="manBizCards" to={`/businesses/${business.id}`}>
              <img className="manBizImage" src={business.image} alt={business.name} />
              <span className="manBizDeets">
                {index + 1}.&nbsp;{business.name}
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
                <span>HOURS PLACEHOLDER</span>
                {
                  business.description &&
                  descriptionTextSubstr(business.description)
                }
              </span>
            </Link>
            <div className="manbutton">
              <ManageBizButton business={business} />
            </div>
        </div>
      ))}

    </div>
  )
}

export default ManageBusinessPage
