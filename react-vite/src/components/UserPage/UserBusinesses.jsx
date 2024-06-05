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

    const viewedUser = useSelector(state => (
        state.users ? state.users[userId] : null
    ))

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
