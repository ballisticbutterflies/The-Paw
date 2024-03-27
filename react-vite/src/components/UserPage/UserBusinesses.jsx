import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/users";


function UserBusinesses() {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => (
        state.session.user ? state.session.user : null
    ))

    console.log("line 14 on user Businesses", sessionUser)

    const viewedUser = useSelector(state => (
        state.users ? state.users[userId] : null
    ))

    console.log("viewed user", viewedUser)
    

    useEffect(() => {
        dispatch(getUser(parseInt(userId)))
    }, [dispatch, userId])



    return (
        <>
            <p>This is the Businesses view!</p>
        </>
    )
}

export default UserBusinesses;
