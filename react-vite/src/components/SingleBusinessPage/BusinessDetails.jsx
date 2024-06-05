import SingleBusinessReviews from "./SingleBusinessReviews";
import OpenModalButton from "../OpenModalButton";
import AddPhotosToBusiness from "../AddPhotosToBusiness";
import { stdTimeFormat } from "../../utils";
import { useSelector } from "react-redux"
import LoginFormModal from "../LoginFormModal";
import CreateReviewPage from "../ReviewForms/CreateReviewPage";
import BusinessMap from "./BusinessMap";
// import BusinessContactCard from "./BusinessContactCard";
import ShareModal from "../ShareModal";

function BusinessDetails({ business, businessId, locationHoursSection, isMobile, isTablet }) {
    const sessionUser = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state.reviews))
    const reviewerIds = reviews.map(review => review.user_id)

    const getDirections = () => {
        return (<a href="https://www.google.com/maps/dir/?api=1&destination=31251+Lily+St+Union+City+CA+94587" />)
    }
    getDirections

    return (
        <div className="businessDetails">
            <div className="businessDetailsButtons">
                <div>
                    <span className="businessDetails_writeAReview">
                        {!sessionUser &&
                            <OpenModalButton
                                buttonText={<>
                                    <i className="fa-solid fa-paw" /> Write a review</>}
                                modalComponent={<LoginFormModal />}
                            />
                        }
                        {sessionUser && sessionUser.id !== business.owner_id && !reviewerIds.includes(sessionUser.id) &&
                            <OpenModalButton
                                buttonText={<>
                                    <i className="fa-solid fa-paw" /> Write a review</>}
                                modalComponent={<CreateReviewPage propsBusinessId={businessId} modalLoad={true} />}
                            />
                        }</span>
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
                    <span className="bizDeetsButton">
                        <OpenModalButton
                            buttonText={<>
                                <i className="fa-solid fa-arrow-up-from-bracket" /> Share</>}
                            modalComponent={<ShareModal business={business} />}
                        />
                    </span>
                </div>
                {/* <div>
                    {isMobile && <BusinessContactCard business={business} isMobile={isMobile} />
                    }
                </div> */}
            </div>
            {(isTablet || isMobile) && (<div className="bizContactMobile">
                {business.website &&
                    <div>
                        <div className="businessWebsiteContainer">
                            <a href={business.website} target="_blank" rel="noopener noreferrer">
                                <div className="businessContactIcon"><i className="fa-solid fa-arrow-up-right-from-square"></i></div>
                                <div>Website</div>
                            </a>
                        </div>
                    </div>
                }
                {business.phone &&
                    <div>
                        <div className="businessPhoneContainer">
                            <a href={`tel:{business.phone}`} target="_blank" rel="noopener noreferrer">
                                <div className="businessContactIcon"><i className="fa-solid fa-phone-volume"></i></div>
                                <div>Call</div>
                            </a>
                        </div>
                    </div>
                }
                {
                    business.city &&
                    <div>
                        {business.address && business.city ? (
                            <div className="businessAddressContainer">
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${business.address}+${business.city}+${business.state}+${business.zip_code}`} target="_blank" rel="noopener noreferrer">
                                    <div className="businessContactIcon">
                                        <i className="fa-solid fa-diamond-turn-right"></i>
                                    </div>
                                    <div>Directions</div>
                                </a>
                            </div>
                        ) : (
                            <div className="businessAddressContainer">
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${business.city}+${business.state}+${business.zip_code}`} target="_blank" rel="noopener noreferrer">
                                    <div className="businessContactIcon">
                                        <i className="fa-solid fa-diamond-turn-right"></i>
                                    </div>
                                    <div>Directions</div>
                                </a>
                            </div>
                        )}
                    </div>
                }
            </div >
            )}
            <hr />
            <div>
                <h3>About this Business</h3>
                <span className="review-text">{business.description}</span>
            </div>
            <hr ref={locationHoursSection} />
            <div>
                <h3>Location & Hours</h3>
                <div className="locationHoursContainer">
                    <div className="locationHours">
                        <div className="businessMap"><BusinessMap business={business} /></div>
                        <div className="businessDetailsLocation">
                            <div className="businessAddress">
                                <div>{business.address}</div>
                                <div>{business.city}, {business.state} {business.zip_code}</div>
                            </div>
                            <div>
                                {business.address && business.city ? (
                                    <span className="bizDeetsButton"><button><a href={`https://www.google.com/maps/dir/?api=1&destination=${business.address}+${business.city}+${business.state}+${business.zip_code}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1f2f44" }}>Get Directions</a></button></span>
                                ) : (
                                    <span className="bizDeetsButton"><button><a href={`https://www.google.com/maps/dir/?api=1&destination=${business.city}+${business.state}+${business.zip_code}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1f2f44" }}>Get Directions</a></button></span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="businessDetailsHours">{business.set_hours === "yes" &&
                        business.hours && (
                            <div className="hours">
                                <span style={{ paddingRight: "10px" }}>Mon</span>
                                <span>{stdTimeFormat(business.hours.mon_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(business.hours.mon_close)}</span>

                                <span>Tue</span>
                                <span>{stdTimeFormat(business.hours.tue_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(business.hours.tue_close)}</span>

                                <span>Wed</span>
                                <span>{stdTimeFormat(business.hours.wed_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(business.hours.wed_close)}</span>

                                <span>Thu</span>
                                <span>{stdTimeFormat(business.hours.thu_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(business.hours.thu_close)}</span>

                                <span>Fri</span>
                                <span>{stdTimeFormat(business.hours.fri_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(business.hours.fri_close)}</span>

                                <span>Sat</span>
                                <span>{stdTimeFormat(business.hours.sat_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(business.hours.sat_close)}</span>

                                <span>Sun</span>
                                <span>{stdTimeFormat(business.hours.sun_open)}</span>
                                <span>-</span>
                                <span>{stdTimeFormat(business.hours.sun_close)}</span>
                            </div>
                        )
                    }
                    </div>
                </div>
                <hr />
                {/* <div>
                    <h3>Amenities and More [Services Offered if applicable]</h3>
                    <div>[Street Parking]</div>
                </div>
                <hr /> */}
                <h3>Reviews</h3>
                {sessionUser?.id !== business.owner_id && business.reviews.num_reviews == 0 ? (
                    <div>Be the first to review!</div>
                ) : (
                    <SingleBusinessReviews business={business} businessId={businessId} sessionUser={sessionUser} />
                )}
                <br />
            </div>
        </div >
    )
}

export default BusinessDetails
