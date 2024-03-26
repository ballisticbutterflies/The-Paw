import SingleBusinessReviews from "./SingleBusinessReviews";
import OpenModalButton from "../OpenModalButton";
import AddPhotosToBusiness from "../AddPhotosToBusiness";

function BusinessDetails({ business, businessId }) {

    return (
        <div className="businessDetails">
            <div className="businessDetailsButtons">
                <button className="businessDetails_writeAReview"><i className="fa-solid fa-paw" /> &nbsp;Write a review</button>&nbsp;&nbsp;

                <OpenModalButton
                    buttonText={<>
                        <i className="fa-solid fa-camera" /> Add photo</>}
                    modalComponent={<AddPhotosToBusiness businessId={businessId} business={business} />}
                />&nbsp;&nbsp;
                <button><i className="fa-solid fa-arrow-up-from-bracket" /> Share</button>
            </div>
            <hr />
            <div>
                <h3>About this Business</h3>
                {business.description}
            </div>
            <hr />
            <div>
                <h3>Location & Hours</h3>
                <div className="locationHours">
                    <div className="businessDetailsLocation">
                        <div className="businessAddress">
                            <div>{business.address}</div>
                            <div>{business.city}, {business.state} {business.zip_code}</div>
                        </div>
                    </div>
                    <div><button>Get Directions</button></div>
                    <div className="businessDetailsHours">[hours]</div>
                </div>
            </div>
            <hr />
            <div>
                <h3>Amenities and More [Services Offered if applicable]</h3>
                <div>[Street Parking]</div>
            </div>
            <hr />
        </div>
    )
}

export default BusinessDetails
