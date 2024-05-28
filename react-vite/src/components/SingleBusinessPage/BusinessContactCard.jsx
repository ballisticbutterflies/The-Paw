function BusinessContactCard({ business, isMobile }) {
    const phoneFormat = (phone) => {
        let areaCode = phone.slice(0, 3);
        let firstThree = phone.slice(3, 6);
        let lastFour = phone.slice(6, 10);

        return `(${areaCode}) ${firstThree}-${lastFour}`
    }
    return (
        isMobile ? (
            <div className="bizContactMobile">
                {business.website &&
                    <div>
                        <div className="businessWebsiteContainer">
                            <a href={business.website} target="_blank" rel="noopener noreferrer">
                                <div className="businessContactIcon"><i className="fa-solid fa-arrow-up-right-from-square"></i></div>
                                <div>Website</div>
                            </a>
                        </div>
                        <hr />
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
                        <hr />
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
        ) : (
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
                {business.city &&
                    <>
                        <div className="businessAddressContainer">
                            <div className="businessAddress">
                                <div>
                                    {business.address && business.city ? (
                                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${business.address}+${business.city}+${business.state}+${business.zip_code}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
                                    ) : (
                                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${business.city}+${business.state}+${business.zip_code}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
                                    )}
                                </div>
                                <div className="businessCardDetail">{business.address} {business.city}, {business.state} {business.zip_code}</div>
                            </div>
                            <div className="businessContactIcon">
                                {business.address && business.city ? (
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${business.address}+${business.city}+${business.state}+${business.zip_code}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-diamond-turn-right"></i></a>
                                ) : (
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${business.city}+${business.state}+${business.zip_code}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-diamond-turn-right"></i></a>
                                )
                                }

                            </div>
                        </div>
                    </>
                }
            </div>
        )
    )
}

export default BusinessContactCard
