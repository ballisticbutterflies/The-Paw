import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrUserBusinesses } from "../../redux/businesses";
import { Link } from "react-router-dom";
import "./ManageBusiness.css"
import ManageBizButton from "./ManageBusinessButton";
import { getTodaysHours } from "../../utils";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";

function ManageBusinessPage() {

  const dispatch = useDispatch();

  const businesses = Object.values(useSelector(state => state.businesses))

  const sessionUser = Object.values(useSelector(state => state.session.user ? state.session.user : []))

  console.log(sessionUser)


  useEffect(() => {
    dispatch(loadCurrUserBusinesses())
  }, [dispatch])



  const starReviews = (numStars) => {
    let filledStars = []
    let emptyStars = []

    for (let i = 0; i < parseInt(numStars); i++) {
      filledStars.push(<span className='paws-filled'><i className="fa-solid fa-paw" />&nbsp;</span>)
    }
    let empty = 5 - filledStars.length
    for (let i = 0; i < empty; i++) {
      emptyStars.push(<span className='paws-unfilled'><i className="fa-solid fa-paw" />&nbsp;</span>)
    }
    return [filledStars, emptyStars]
  }

  const starsToFixed = (stars) => {
    let int = +(stars)
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

  const descriptionTextSubstr = (text) => {
    if (text.length > 85) {
      return text.substring(0, 85) + "..."
    } else {
      return text
    }
  }

  return (
    <div className="manBizPage">
      <h1>Your Businesses on The Paw</h1>
      {sessionUser.length === 0 ? (
        <span className="login-prompt">
          <OpenModalMenuItem
            itemText={<span className="modalLink">Log in</span>}
            modalComponent={<LoginFormModal />}
          />
          &nbsp;to view this page.
          <img src="/images/icons/tearcouch.png" />
        </span>
      ) : (
        businesses && businesses.length > 0 ? (
          businesses.map((business, index) => (
            <div key={business.id} className="bizandbutton">
              <Link style={{ textDecoration: "none" }} className="manBizCards" to={`/businesses/${business.id}`}>
                <span className="businessesImageWrapper">
                  <img className="businessesImage" src={business.image} alt={business.name} />
                </span>
                <span className="businessDeets">
                  <h2>{index + 1}.&nbsp;{business.name}</h2>
                  {business.avg_stars && business.num_reviews && reviewsExists(business.num_reviews) && (
                    <span>
                      {business?.avg_stars && starReviews(business.avg_stars)}
                      &nbsp;{business?.avg_stars && starsToFixed(business.avg_stars)}
                      &nbsp;{business.num_reviews >= 1 && reviewsExists(business.num_reviews)}
                    </span>
                  )}
                  {business.price !== null ? (
                    <span className="priceSubcat">
                      {business.category?.name} &nbsp;&#183;&nbsp; {business.price}
                    </span>
                  ) : (
                    <span className="priceSubcat">
                      {business.category?.name}
                    </span>
                  )}
                  {getTodaysHours(business) && (
                    <span className="todayHours">
                      <span style={{ fontWeight: '600' }}>Today&apos;s Hours:</span> {getTodaysHours(business).open} - {getTodaysHours(business).close}
                    </span>
                  )}
                  {business.description && descriptionTextSubstr(business.description)}
                </span>
              </Link>
              <div className="manbutton">
                <ManageBizButton business={business} />
              </div>
            </div>
          ))
        ) : (
          <div className='no-biz'>
          <div>It looks like you don&apos;t have any businesses listed on The Paw.</div>
          &nbsp;
          <Link to={'/businesses/new'}>Add your business to The Paw!</Link>
          </div>
        )
      )}
    </div>
  )
}

export default ManageBusinessPage
