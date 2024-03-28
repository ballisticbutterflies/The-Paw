import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteImage } from "../../redux/images";
import { getUserImages } from "../../redux/users";
import { useSelector } from "react-redux";


function DeleteImageModal({ imageId, onlyImage }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const userId = useSelector(state => state.session.user.id)

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteImage(imageId))
            .then(dispatch(getUserImages(userId)))
            .then(closeModal)
    }


    return (
        <>
            {!onlyImage ? (<div className="deleteModal">
                <h1>Confirm Delete</h1>
                <span>Are you sure you want to delete this photo?</span>
                <button style={{ marginTop: "10px" }} onClick={handleDelete}>Yes, I&apos;m Sure (Delete Permanently)</button>
                <button style={{ backgroundColor: "#c3cddf", color: "#768c9f", marginTop: "10px" }} onClick={closeModal}>No, Just Kitt-ing Around! (Keep Photo)</button>
            </div>)
                :
                (<div className="deleteModal">
                    <h1>Cannot Delete</h1>
                    <span>Businesses must have at least one photo uploaded. Please add another photo before deleting.</span>
                </div>)
            }
        </>)
}

export default DeleteImageModal
