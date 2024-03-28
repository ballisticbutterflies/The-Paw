import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReview } from "../../../redux/reviews";
import { getBusinessReviews } from "../../../redux/reviews";
import { fetchSingleBusiness } from "../../../redux/businesses";

function DeleteReviewModal({ reviewId, businessId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await dispatch(deleteReview(reviewId))
            await (dispatch(getBusinessReviews(businessId)))
            await dispatch(fetchSingleBusiness(businessId))
            closeModal();

        } catch (error) {
            console.error("Error updating review:", error);
        }
    }
    return (
        <div className="deleteModal">
            <h1>Confirm Delete</h1>
            <span>Are you sure you want to delete this review?</span>
            <button style={{ marginTop: "10px" }} onClick={handleDelete}>Yes, I&apos;m Sure (Delete Permanently)</button>
            <button style={{ backgroundColor: "#c3cddf", color: "#768c9f", marginTop: "10px" }} onClick={closeModal}>No, Just Kitt-ing Around! (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal
