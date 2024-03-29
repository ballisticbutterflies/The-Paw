import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/users";
import './Overview.css'



function UserOverview() {
    const { userId } = useParams();
    const dispatch = useDispatch();

    // const sessionUser = useSelector(state => (
    //     state.session.user ? state.session.user : null
    // ))

    // console.log("line 14 on user overview", sessionUser)

    const viewedUser = useSelector(state => (
        state.users ? state.users[userId] : null
    ))

    // console.log("viewed user", viewedUser)


    useEffect(() => {
        dispatch(getUser(parseInt(userId)))
    }, [dispatch, userId])



    return (
        <>
            <h2>More about me</h2>
            <div id="user-details" className="needs-border">
                <div id='details-location' className="details-indiv">
                    <h4>Location</h4>
                    <p>{viewedUser.city}, {viewedUser.state}</p>
                </div>
                <div id='details-time' className="details-indiv">
                    <h4>Pawmate Since</h4>
                    <p>Spring 2024</p>
                </div>
            </div>
        </>
    )
}

export default UserOverview;
