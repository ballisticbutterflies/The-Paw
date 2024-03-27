import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";


function UserPage() {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector(state => (
        state.users[userId]
    ))

    console.log(user)

    useEffect(() => {
        dispatch((userId))
    }, [dispatch, userId])



    return (
        <>

        </>
    )
}

export default UserPage;
