import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, getUserImages } from "../../redux/users";
// import { getImagesByBusiness } from "../../redux/images";
import "./UserPhotos.css"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteImageModal from "../DeleteImageModal/DeleteImageModal";


function UserPhotos() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => (
        state.session.user ? state.session.user : null
    ))

    // console.log("line 14 on user photos", sessionUser)

    const viewedUser = useSelector(state => (
        state.users ? state.users[userId] : null
    ))

    // console.log("viewed user", viewedUser)

    const viewedUserImages = useSelector(state => (
        state.users ? state.users.undefined : null
    ))

    console.log(viewedUserImages);

    // console.log("viewed user images", viewedUserImages)

    const hasAtLeastOneImage = function () {
        if (viewedUserImages != null) {
            if (!viewedUserImages.length <= 0) {
                return true
            } else { return 'No Images' }
        } else { return null }
    }

    useEffect(() => {
        const runDispatches = async () => {
            await dispatch(getUser(parseInt(userId))).then(() =>
                dispatch(getUserImages(parseInt(userId)))
            );
        };
        runDispatches();
    }, [dispatch, userId, sessionUser])


    return (
        <>
            <h2>Photos</h2>
            <div id="photos-container">
                {viewedUserImages && hasAtLeastOneImage() == 'No Images' &&
                    (<h4>Looks like this user does not have any images uploaded!</h4>)
                }
                {viewedUserImages && hasAtLeastOneImage() && (
                    viewedUserImages.map(user_image => (
                        <>
                            <span key={user_image.id} className="allPhotosWrapper">
                                <img className="images"
                                    src={user_image.image_url} onClick={() => navigate(`/businesses/${user_image.type_id}`)} />
                                <div className="photoCredit">
                                    <div className="photoCreditText">
                                        <div id="biz-name">
                                            &nbsp;&nbsp;{user_image.business_name}
                                        </div>

                                        <div className="trash">
                                            {((sessionUser && sessionUser.id === viewedUser.id) && (typeof user_image.biz_images_count == "string" || user_image.biz_images_count > 1)) &&
                                                <OpenModalMenuItem
                                                    itemText={<><i className="fa-solid fa-trash-can" style={{ color: "#FFFFFF" }} />&nbsp;&nbsp;</>}
                                                    modalComponent={<DeleteImageModal imageId={user_image.id} />} />
                                            }
                                            {((sessionUser && sessionUser.id === viewedUser.id) && (typeof user_image.biz_images_count == "number" && user_image.biz_images_count <= 1)) &&
                                                <OpenModalMenuItem
                                                    itemText={<><i className="fa-solid fa-trash-can" style={{ color: "#FFFFFF" }} />&nbsp;&nbsp;</>}
                                                    modalComponent={<DeleteImageModal imageId={user_image.id} onlyImage={true} />} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </span >
                        </>
                    )
                    )
                )
                }
            </div>
        </>
    )
}

export default UserPhotos;
