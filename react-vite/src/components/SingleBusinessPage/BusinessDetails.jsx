import SingleBusinessReviews from "./SingleBusinessReviews";
import OpenModalButton from "../OpenModalButton";
import AddPhotosToBusiness from "../AddPhotosToBusiness";
import { stdTimeFormat } from "../../utils";
import { useSelector } from "react-redux"
import LoginFormModal from "../LoginFormModal";
import CreateReviewPage from "../ReviewForms/CreateReviewPage";

function BusinessDetails({ business, businessId, locationHoursSection }) {
    const sessionUser = useSelector(state => state.session.user)
    return (
        <div className="businessDetails">
            <div className="businessDetailsButtons">
                <span className="businessDetails_writeAReview">
                    {!sessionUser &&
                        <OpenModalButton
                            buttonText={<>
                                <i className="fa-solid fa-camera" /> Add photo</>}
                            modalComponent={<LoginFormModal />}
                        />
                    }
                    {sessionUser &&
                        <OpenModalButton
                            buttonText={<>
                                <i className="fa-solid fa-paw" /> Write a review</>}
                            modalComponent={<CreateReviewPage propsBusinessId={businessId} />}
                        />
                    }</span>

                &nbsp;&nbsp;
                <span className="bizDeetsButton">{!sessionUser &&
                    <OpenModalButton
                        buttonText={<>
                            <i className="fa-solid fa-camera" /> Add photo</>}
                        modalComponent={<LoginFormModal />}
                    />
                }
                    {sessionUser &&
                        <OpenModalButton
                            buttonText={<>
                                <i className="fa-solid fa-camera" /> Add photo</>}
                            modalComponent={<AddPhotosToBusiness businessId={businessId} business={business} />}
                        />
                    }</span>

                &nbsp;&nbsp;
                <span className="bizDeetsButton"><button><i className="fa-solid fa-arrow-up-from-bracket" /> Share</button></span>
            </div>
            <hr />
            <div>
                <h3>About this Business</h3>
                {business.description}
            </div>
            <hr ref={locationHoursSection} />
            <div>
                <h3>Location & Hours</h3>
                <div className="locationHours">
                    <div className="businessDetailsLocation">
                        <div className="businessAddress">
                            <div>{business.address}</div>
                            <div>{business.city}, {business.state} {business.zip_code}</div>
                        </div>
                    </div>
                    <div><span className="bizDeetsButton"><button>Get Directions</button></span></div>
                    <div className="businessDetailsHours">{business.set_hours === "yes" &&
                        business.hours && (
                            <div className="hours">
                                <div>Mon</div>
                                <div>{stdTimeFormat(business.hours.mon_open)} - {stdTimeFormat(business.hours.mon_close)}</div>
                                <div>Tue</div>
                                <div>{stdTimeFormat(business.hours.tue_open)} - {stdTimeFormat(business.hours.tue_close)}</div>
                                <div>Wed</div>
                                <div>{stdTimeFormat(business.hours.wed_open)} - {stdTimeFormat(business.hours.wed_close)}</div>
                                <div>Thu</div>
                                <div>{stdTimeFormat(business.hours.thu_open)} - {stdTimeFormat(business.hours.thu_close)}</div>
                                <div>Fri</div>
                                <div>{stdTimeFormat(business.hours.fri_open)} - {stdTimeFormat(business.hours.fri_close)}</div>
                                <div>Sat</div>
                                <div>{stdTimeFormat(business.hours.sat_open)} - {stdTimeFormat(business.hours.sat_close)}</div>
                                <div>Sun</div>
                                <div>{stdTimeFormat(business.hours.sun_open)} - {stdTimeFormat(business.hours.sun_close)}</div>
                            </div>
                        )
                    }
                    </div>
                </div>
                <hr />
                <div>
                    <h3>Amenities and More [Services Offered if applicable]</h3>
                    <div>[Street Parking]</div>
                </div>
                <hr />
                <h3>Reviews</h3>
                {business.reviews.num_reviews == 0 ? (
                    <div>Be the first to review!</div>
                ) : (
                    <SingleBusinessReviews business={business} businessId={businessId} sessionUser={sessionUser} />
                )}
                <br />
            </div>
        </div>
    )
}

export default BusinessDetails
