import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";
import "./UserReviews.css"


function ManageReviewButton({ review }) {

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  const closeMenu = () => setShowMenu(false);

  const ulClassName = "manage-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='manageMenu' onClick={toggleMenu}>
        <i className="fa-solid fa-ellipsis" />
      </button>
      {showMenu &&
        <>
          <ul className={ulClassName} ref={ulRef}>
            <p className="updateReview">
              <Link to={`/reviews/${review.id}/edit`}
                onClick={closeMenu}
              >Update Business</Link>
            </p>
            <OpenModalButton
              buttonText="Delete Review"
              businessId={review.id}
              modalComponent={<DeleteReviewModal reviewId={review.id} />}
            />
          </ul>
        </>
      }
    </>
  )

}

export default ManageReviewButton
