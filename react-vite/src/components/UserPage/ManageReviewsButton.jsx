import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import "./UserReviews.css"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


function ManageReviewButton({ review, userId }) {

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

  //   const closeMenu = () => setShowMenu(false);

  const ulClassName = "manage-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {/* <p>test test test</p> */}
      <button className='manageMenu' onClick={toggleMenu}>
        <i className="fa-solid fa-ellipsis" />
      </button>
      {showMenu &&
        <>
          <ul className={ulClassName} ref={ulRef}>
            {/* <p className="updateReview">
              <Link to={`/reviews/${review.id}/edit`}
                onClick={closeMenu}
              >Update Review</Link>
            </p> */}
            <div className="profiledropdownoptions">
              <OpenModalMenuItem
                itemText={<><i className="fa-solid fa-pen-to-square" />&nbsp; Update Review</>}
                reviewId={review.id}
                modalComponent={<UpdateReviewModal userReview={review} reviewId={review.id} userId={userId} />}
              />
            </div>
            <div className="profiledropdownoptions">
              <OpenModalMenuItem
                itemText={<><i className="fa-solid fa-trash-can" />&nbsp; Delete Review</>}
                reviewId={review.id}
                modalComponent={<DeleteReviewModal reviewId={review.id} userId={userId} />}
              />
            </div>
          </ul>
        </>
      }
    </>
  )

}

export default ManageReviewButton
