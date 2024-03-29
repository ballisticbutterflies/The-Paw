function BusinessContactCard({ business }) {
    const phoneFormat = (phone) => {
        let areaCode = phone.slice(0, 3);
        let firstThree = phone.slice(3, 6);
        let lastFour = phone.slice(6, 10);

        return `(${areaCode}) ${firstThree}-${lastFour}`
    }
    return (
        <div className="businessContact">
            {business.website &&
                <>
                    <div className="businessWebsiteContainer">
                        <div className="businessCardDetail"><a href={business.website} target="_blank" rel="noopener noreferrer">{business.website}</a></div>
                        <div className="businessContactIcon"><a href={business.website} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                    </div>
                    <hr />
                </>
            }
            {business.phone &&
                <>
                    <div className="businessPhoneContainer">
                        <div className="businessCardDetail">{business.phone && phoneFormat(business.phone)}</div>
                        <div className="businessContactIcon"><i className="fa-solid fa-phone-volume"></i></div>
                    </div>
                    <hr />
                </>
            }
            {business.address &&
                <>
                    <div className="businessAddressContainer">
                        <div className="businessAddress">
                            {/* <div>
                                Get Directions
                            </div> */}
                            <div className="businessCardDetail">{business.address} {business.city}, {business.state} {business.zip_code}</div>
                        </div>
                        <div className="businessContactIcon"><i className="fa-solid fa-diamond-turn-right"></i></div>
                    </div>
                </>
            }
        </div>
    )
}

export default BusinessContactCard
