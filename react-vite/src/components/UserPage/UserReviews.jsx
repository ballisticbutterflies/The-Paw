import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getUser, getUserReviews } from "../../redux/users";
import './UserReviews.css'


function UserReviews() {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => (
        state.session.user ? state.session.user : null
    ))

    console.log("line 14 on user reviewws", sessionUser)

    const viewedUser = useSelector(state => (
        state.users ? state.users[userId] : null
    ))

    console.log("viewed user", viewedUser)
    
    let viewedUserReviews = useSelector(state => (
        state.users.userReviewsState ? state.users.userReviewsState.userReviews : null
    ))

    // // if(viewedUserReviews ) viewedUserReviews = Object.values(viewedUserReviews)
    console.log("viewed user reviews", (viewedUserReviews))
    if(viewedUserReviews )console.log("viewed user reviews isarray", Array.isArray(viewedUserReviews))

    // if(viewedUserReviews )console.log("viewed user reviews 0", viewedUserReviews[0])

    // const reformat = function () {
    //     students.map((student, index) => (
    //     <div key={index}>
    //         <span>{student.name}</span>
    //         <span>{student.age}</span>
    //     </div>
    // ))}
    
    const hasAtLeastOneReview = function () {
        if(viewedUserReviews != null){
            if (!viewedUserReviews.length <= 0){
                return true
            } else {return 'No Reviews'}
        } else{ return null}
    }


    useEffect(() => {
        const runDispatches = async () => {
            await dispatch(getUser(parseInt(userId))).then(() =>
              dispatch(getUserReviews(parseInt(userId)))
            );
          };
          runDispatches();
    }, [dispatch, userId, sessionUser])

    let reviewsArr;
    if(viewedUserReviews){
        reviewsArr = viewedUserReviews.map((user_review) => {
            // console.log("line 76",user_review)
            // console.log("line 77", Object.keys(user_review).toString())
            // console.log("line 78", Object.values(user_review))
            // console.log("line 79", Array.isArray(Object.values(user_review)))
            // console.log("line 70", Object.values(user_review)[0])
            return Object.values(user_review)[0]    
        })
    }

    // if(viewedUserReviews){
    //     reviewsArr = viewedUserReviews.map((user_review) => 
    //         Object.values(user_review)[0]   
    //     )
    // }
    console.log('reviewsArr',reviewsArr)

    

    return (
        <>
            <h2>Reviews</h2>
            <div id="reviews-container">
                { viewedUserReviews && hasAtLeastOneReview() == 'No Reviews' && 
                    (<h4>Looks like this user has not written any reviews!</h4> )
                }
                {viewedUserReviews && hasAtLeastOneReview() && (
                    reviewsArr.map(user_review => (
                        
                        <>
                            <p>boop, {user_review.review}</p>
                        </>
                    ))
                    
                )}
            </div>
        </>
    )
}

export default UserReviews;
