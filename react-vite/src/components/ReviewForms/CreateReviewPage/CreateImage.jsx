import { useState } from "react";
import { createImage } from "../../redux/businesses";
import { useDispatch } from "react-redux"


const UploadPicture = () => {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);


        setImageLoading(true);
        await dispatch(createImage(formData));
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
