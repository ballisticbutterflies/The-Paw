import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useEffect } from "react";
import { getImagesByBusiness } from "../../redux/businesses";

function AllPhotosModal({ businessId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getImagesByBusiness(businessId))
    }, [dispatch, businessId])

    return <h1>Images</h1>
}

export default AllPhotosModal
