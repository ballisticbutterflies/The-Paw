import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createImage } from "../../redux/businesses";
import { useModal } from "../../context/Modal";
import "./AddPhotos.css"

function AddPhotosToBusiness({ businessId, business }) {
    console.log(businessId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors] = useState({});
    const { closeModal } = useModal();


    const sessionUser = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("uploader_id", sessionUser.id);
        formData.append("imageable_id", businessId);
        formData.append("imageable_type", "business");

        setImageLoading(true);

        await dispatch(createImage(formData)).then(closeModal()).then(() => navigate('/')).catch((error) => {
            console.error("Error uploading image:", error);
            setImageLoading(false);
        })
    }

    return (business &&
        <>
            <h1>{business.name}: Add Photos</h1>
            {sessionUser &&
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {errors.image && <div className="errors">&nbsp;{errors.image}</div>}
                    {(imageLoading) && <p>Loading...</p>}
                    <div>
                        <button type="submit"
                            disabled={!!Object.values(errors).length}>Upload photo</button>
                    </div>
                </form>
            }
        </>
    )
}

export default AddPhotosToBusiness
