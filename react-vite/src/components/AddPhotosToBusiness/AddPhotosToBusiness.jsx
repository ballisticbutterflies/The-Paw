import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createImage } from "../../redux/businesses";
import { useModal } from "../../context/Modal";
import "./AddPhotos.css"
import AllPhotosModal from "../AllPhotosModal/AllPhotosModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

function AddPhotosToBusiness({ businessId, business }) {
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

        await dispatch(createImage(formData))
            .then(() => closeModal())
            .then(() => navigate(`/businesses/${businessId}/images`))
            .catch((error) => {
                console.error("Error uploading image:", error);
                setImageLoading(false);
            })
    }

    return (business &&
        <>
            <h1>{business.name}: Add Photos</h1>
            <div>
                <OpenModalMenuItem
                    itemText="View all photos"
                    modalComponent={<AllPhotosModal businessId={businessId} business={business} />} />

            </div>
            {sessionUser &&
                <div className="addPhoto">
                    <br />
                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
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
                    <br />
                    <h2 style={{ textAlign: "center" }}>What Makes Paw-riffc Photos?
                    </h2>
                    <div className="tipSection">
                        <div className="tip">
                            <div className="icon"><i className="fa-solid fa-bullseye" /></div>
                            <div>Photos are in focus. Shake off the blurry, shaky ones.</div>
                        </div>


                        <div className="tip">
                            <div className="icon"><i className="fa-solid fa-sun" /></div>
                            <div>Photos are well lit. We want to see those paws clearly!</div>
                        </div>


                        <div className="tip">
                            <div className="icon"><i className="fa-solid fa-wand-sparkles" /></div>
                            <div>Paw-mates, let&apos;s not overdo those filters.  </div>
                        </div>


                        <div className="tip">
                            <div className="icon"><i className="fa-solid fa-store" /></div>
                            <div>And of course, business photos only, please! </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AddPhotosToBusiness
