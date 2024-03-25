import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createReview, createReviewImages } from "../../redux/reviews";
import { fetchSingleBusiness } from "../../redux/businesses";
import "./CreateReview.css"


function CreateReviewPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const sessionUser = useSelector(state => state.session.user)

    const { businessId } = useParams();
    const businessRes = fetchSingleBusiness(businessId)
    console.log(businessRes)
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [hover, setHover] = useState(null);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({})

        const reviewData = {
            review,
            stars
        }

        let newlyCreatedReview = await dispatch(createReview(reviewData, businessId))

        if(newlyCreatedReview.errors) {
            setErrors(newlyCreatedReview.errors);
        }
        
        if(newlyCreatedReview.id) {
            console.log("successful review submission");
        
            // ! so like don't we need to be able to upload multiple images?
            const formData = new FormData();
            formData.append("image", image);
            formData.append("uploader_id", sessionUser.id);
            formData.append("imageable_id", businessId); // Pass business ID
            formData.append("imageable_type", "review"); // Hardcoded for review type

            setImageLoading(true);
            // ! so to have multiple images uploaded at once we could iterate through an array of form data here
            dispatch(createReviewImages(formData).then(() => {
                dispatch(fetchSingleBusiness(businessId))
                .then(() => navigate(`/businesses/${businessId}`));
            }).catch((error)=> {
                console.error("Error uploading image: ", error);
                setImageLoading(false);
            }))    
        }

    }

    useEffect(() => {
        let errObj = {}
        if (!review) errObj.address = "Address is required"
        if (!stars) errObj.city = "City is required"
        setErrors(errObj)
      }, [review, stars])
    
      return (
        <>
          {
            <form className="createReviewForm" onSubmit={handleSubmit} encType="multipart/form-data">
              <h1>{businessId.}</h1>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                name="address"
              />
              {errors.address && <span className="errors">&nbsp;{errors.address}</span>}
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                name="city"
              />
              {errors.city && <span className="errors">&nbsp;{errors.city}</span>}
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                name="state"
              >
                <option value="">Select State</option>
                {states.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
              {errors.state && <span className="errors">&nbsp;{errors.state}</span>}
              <input
                type="text"
                value={zip_code}
                onChange={(e) => setZip_code(e.target.value)}
                placeholder="ZIP Code"
                name="zip_code"
              />
              {errors.zip_code && <span className="errors">&nbsp;{errors.zip_code}</span>}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                name="name"
              />
              {errors.name && <span className="errors">&nbsp;{errors.name}</span>}
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                name="description"
              />
              {errors.description && <span className="errors">&nbsp;{errors.description}</span>}
              <div>
                Price:&nbsp;
                {activePrice.map((option) =>
                  <label key={option.name}>
                    <input
                      type="radio"
                      value={option.name}
                      checked={option.checked}
                      onChange={updatePrice}
                    />
                    {option.name}
                  </label>
                )}
              </div>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website"
                name="website"
              />
              {errors.website && <span className="errors">&nbsp;{errors.website}</span>}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
              />
              {errors.email && <span className="errors">&nbsp;{errors.email}</span>}
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                name="website"
              />
              {errors.phone && <span className="errors">&nbsp;{errors.phone}</span>}
              <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
              {(imageLoading) && <p>Loading...</p>}
              <button type="submit" disabled={!!Object.values(errors).length}>Create Business</button>
              {/* two submisbuttons one displayed when signed in one display when no sessoin user, the non user button triggers modal, yes user button submits forms */}
            </form>
          }
          {/* conditional for sign in modal. */}
          {/* <div>
            <UploadPicture />
          </div> */}
        </>
      )
}
