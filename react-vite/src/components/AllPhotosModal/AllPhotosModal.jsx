<<<<<<< HEAD
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
=======
import { useModal } from "../../context/Modal"
function AllPhotosModal() {

>>>>>>> 9ec5df60f193681a864d09ed22d3e355c042db06
}

export default AllPhotosModal
