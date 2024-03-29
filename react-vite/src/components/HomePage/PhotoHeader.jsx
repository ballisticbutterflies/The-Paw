function PhotoHeader() {
    return (
        <>
            <div className="photoHeader">
                <img src="https://s3.amazonaws.com/static.organiclead.com/Site-177309ee-02b0-4f65-a7c5-680a68bf3b33/shutterstock_1708371508.jpg" />
                <div className="photoHeaderText">
                    <h1>Keep your pet lookin&apos; fresh</h1>
                    <div>
                        <button><i className="fa-solid fa-magnifying-glass" />&nbsp;&nbsp;&nbsp;Groomers</button>
                    </div>
                </div>
                <div className="photoHeaderCredit">
                    <div>Some Groomer Name</div>
                    <div style={{ fontWeight: "300" }}>Photo from the business owner</div>
                </div>
            </div >
        </>
    )
}

export default PhotoHeader
