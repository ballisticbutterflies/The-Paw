function SinglePhotoModal({ imageUrl }) {

    return (
        <>
            <img style={{ maxWidth: "calc(100vh - 200px", maxHeight: "calc(100vh - 200px)", marginTop: "30px", borderRadius: "3px" }} src={imageUrl} />
        </>
    )
}

export default SinglePhotoModal
