import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteImage } from "../../redux/images";
import { getUserImages } from "../../redux/users";
import { useSelector } from "react-redux";
import { getImagesByBusiness } from "../../redux/images";
import { fetchSingleBusiness } from "../../redux/businesses";



function DeleteImageModal({ imageId, onlyImage, businessId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    console.log(businessId)

    const user = useSelector(state => state.session.user)

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteImage(imageId))
            .then(dispatch(getUserImages(user.id)))
            .then(dispatch(getImagesByBusiness(businessId)))
            .then(dispatch(fetchSingleBusiness(businessId)))
                    .then(closeModal)


    }


    return (
        <>
            { user && !onlyImage ? (<div className="deleteModal">
                <h1>Confirm Delete</h1>
                <span>Are you sure you want to delete this photo?</span>
                <button style={{ marginTop: "10px" }} onClick={handleDelete}>Yes, I&apos;m Sure (Delete Permanently)</button>
                <button style={{ backgroundColor: "#c3cddf", color: "#768c9f", marginTop: "10px" }} onClick={closeModal}>No, Just Kitt-ing Around! (Keep Photo)</button>
            </div>)
                :
                (user && <div className="deleteModal">
                    <h1>Cannot Delete</h1>
                    <span>Businesses must have at least one photo uploaded. Please add another photo before deleting.</span>
                </div>)
            }
            {
                !user &&
                <div className="deleteModal">
                    <h1>Cannot Delete</h1>
                    <span>You must be logged in to delete a photo.</span>
                </div>
            }
        </>)
}

export default DeleteImageModal
