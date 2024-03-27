import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

function UpdateReviewPage({ reviewId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const reviewData = useSelector(state => state.reviews[reviewId])
    return "UPDATE"
}

export default UpdateReviewPage
