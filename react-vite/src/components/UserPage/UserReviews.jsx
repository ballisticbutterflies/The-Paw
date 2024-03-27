import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/users";


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
    

    useEffect(() => {
        dispatch(getUser(parseInt(userId)))
    }, [dispatch, userId])



    return (
        <>
         <p>This is the reviews view!</p>

        </>
    )
}

export default UserReviews;
