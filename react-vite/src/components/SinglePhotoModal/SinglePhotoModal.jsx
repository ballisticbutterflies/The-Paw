import './SinglePhotoModal.css';

function SinglePhotoModal({ imageUrl }) {

    return (
        <>
            <img className="singlePhoto" src={imageUrl} />
        </>
    )
}

export default SinglePhotoModal
