import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getImagesByBusiness } from "../../redux/images";
import "./AllPhotos.css"

function AllPhotosModal({ businessId, business }) {
    const dispatch = useDispatch();

    const images = useSelector(state => {
        state.images[businessId]
    });

    console.log("IMAGESSELECTOR", images);


    useEffect(() => {
        dispatch(getImagesByBusiness(businessId))
    }, [dispatch, businessId])

    return (images && business &&
        <div className="modal">
            <h1>Photos for {business.name}</h1>
            <div className="allPhotosContainer">
                {images.map(image => (
                    <span key={image.id} className="allPhotosWrapper">
                        <img className="images"
                            src={image.url} />
                    </span>
                )
                )}
            </div>
        </div>
    )
}

export default AllPhotosModal
