import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/users";
import UserReviews from "./UserReviews";
// import UserSidebar from "./UserSidebar";
import UserOverview from "./Overview";
import UserPhotos from "./UserPhotos";
import UserBusinesses from "./UserBusinesses";


function UserPage() {
    const { userId } = useParams();
    console.log("userId", userId)
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => (
        state.session.user ? state.session.user : null
    ))

    console.log("line 21 on user page", sessionUser)
    const viewedUser = useSelector(state => (
        state.user ? state.user[userId] : null
    ))

    console.log("viewed user", viewedUser)

    useEffect(() => {
        console.log("useEffect running")
        dispatch(getUser(userId))
    }, [dispatch, userId])



    return (
        <>
        <div>
            <p>please what is going</p>
        </div>
        <div className="user-sidebar-container">
            {/* <p>{viewedUser.firstName}</p> */}
        </div>
        <div className="user-overview-container">
            <UserOverview/>
        </div>
        <div className="user-review-container">
            <UserReviews/>
        </div>
        <div className="user-photo-container">
            <UserPhotos/>
        </div>
        <div className="user-business-container">
            <UserBusinesses/>
        </div>
        </>
    )
}

export default UserPage;
