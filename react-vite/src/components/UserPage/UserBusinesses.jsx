import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/users";


function UserBusinesses() {
    const { userId } = useParams();
    const dispatch = useDispatch();

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
