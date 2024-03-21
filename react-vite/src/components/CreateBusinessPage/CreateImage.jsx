import { useState } from "react";
import { createImage } from "../../redux/businesses";
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom";


const UploadPicture = () => {
    // const history = useHistory(); // so that you can redirect after the image upload is successful
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);


        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(createImage(formData));
        // history.push("/images");
    }

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="POST"
            action="/images"
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
