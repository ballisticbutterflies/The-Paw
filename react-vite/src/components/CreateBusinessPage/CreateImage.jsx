import { useState } from "react";
import { createImage } from "../../redux/businesses";
import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom";


const UploadPicture = () => {
    // const history = useHistory(); // so that you can redirect after the image upload is successful
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    // const images = useSelector(state => Object.values(state.image))


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        // formData.append("uploader_id", 1);
        // formData.append("imageable_id", 1);
        // formData.append("imageable_type", 'business');

        const newImage = {
            "image": image,
            // "uploader_id": 1,
            // "imageable_id": 1,
            // "imageable_type": 'business'
        }

        console.log("NEW IMAGE", newImage);
        console.log("FORMDATAAA", formData);
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(createImage(newImage));
        // history.push("/images");
    }

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        // method="POST"
        // action="/images"
        >
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;
