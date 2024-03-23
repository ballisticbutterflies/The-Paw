import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createBusiness, fetchSingleBusiness, createImage, updateBusiness } from "../../redux/businesses"
import "./CreateBusiness.css"


function CreateBusinessPage({ business, formType }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector(state => state.session.user)

  const [address, setAddress] = useState(business?.address);
  const [city, setCity] = useState(business?.city);
  const [state, setState] = useState(business?.state);
  const [zip_code, setZip_code] = useState(business?.zip_code);
  const [name, setName] = useState(business?.name);
  const [description, setDescription] = useState(business?.description);
  const [price, setPrice] = useState(business?.price)
  const [email, setEmail] = useState(business?.email);
  const [website, setWebsite] = useState(business?.website);
  const [phone, setPhone] = useState(business?.phone);
  const [category_id, setCategory_id] = useState(business?.category_id);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updatePrice = (selectedPrice) => {
    if (price === selectedPrice) {
      // If the same price is already selected, deselect it
      setPrice('');
    } else {
      // Otherwise, update the selected price
      setPrice(selectedPrice);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({})
    business = {
      ...business, address, city, state, zip_code, name, description,
      price, email, website, phone, category_id
    };

    if (formType === "Update Business") {
      const editedBusiness = await dispatch(updateBusiness(business));
      business = editedBusiness;

    } else if (formType === 'Create Business') {
      const newBusiness = await dispatch(createBusiness(business));
      business = newBusiness;

    }

    if (business.errors) {
      setErrors(business.errors);
    } else {
      navigate(`/businesses/${business.id}`)
    }
    // Dispatch createBusiness action
    const businessId = business.id; // Extract business ID from response

    const formData = new FormData();
    formData.append("image", image);
    formData.append("uploader_id", sessionUser.id);
    formData.append("imageable_id", businessId); // Pass business ID
    formData.append("imageable_type", "business"); // Hardcoded for business type

    setImageLoading(true);
    // Dispatch createImage action with formData
    await dispatch(createImage(formData)).then(() => {
      dispatch(fetchSingleBusiness(businessId))
        .then(() => navigate(`/businesses/${businessId}`));
    }).catch((error) => {
      console.error("Error uploading image:", error);
      setImageLoading(false);
    });

  }

  const isValidUrl = (url) => {
    // Regular expression for basic URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for 10-digit phone number without symbols
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const states = ['AL', 'AK', 'AZ', 'AR',
    'CA', 'CO', 'CT', 'DE', 'DC',
    'FL', 'GA', 'HI', 'ID', 'IL',
    'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MD', 'MA', 'MI', 'MN',
    'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC',
    'ND', 'OH', 'OK', 'OR', 'PA',
    'RI', 'SC', 'SD', 'TN', 'TX',
    'UT', 'VT', 'VI', 'VA', 'WA',
    'WV', 'WI', 'WY']

  const categories = ['Restaurants', 'Veterinarians', 'Services', 'Shopping',
    'Travel', 'Activities', 'Adoption', 'Other']


  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errObj = {}
    if (!address) errObj.address = "Address is required."
    if (!city) errObj.city = "City is required."
    if (!state) errObj.state = "State is required."
    if (!zip_code) errObj.zip_code = "ZIP Code is required."
    if (zip_code.length > 5) errObj.zip_code = "ZIP Code is invalid."
    if (!name) errObj.name = "Name is required."
    if (name.length > 100) errObj.name = "Name must be less than 100 characters."
    if (!description) errObj.description = "Description is required."
    if (!category_id) errObj.category_id = "Category is required."
    if (description.length >= 1 && description.length < 30 || description.length > 255) errObj.description = "Description must be between 30 and 255 characters."
    if (website && !isValidUrl(website)) errObj.website = "Website is not valid."
    if (email && !emailRegex.test(email)) errObj.email = "Email is invalid."
    if (phone && !isValidPhoneNumber(phone)) errObj.phone = "Please enter a valid phone number using only numerical digits (no special characters or spaces)."
    if (phone.length >= 1 && phone.length > 10) errObj.phone = "Phone numbers must be 10 digits."
    if (!image && formType === 'Create Business') errObj.image = "Image is required."
    // if (image && image.name.split('.').pop() !== "png" && image.name.split('.').pop() !== "jpg" && image.name.split('.').pop() !== "jpeg") errObj.image = "Image URL must end in .png, .jpg, or .jpeg"

    setErrors(errObj)
  }, [address, city, state, zip_code, name, description, website, email, phone, category_id, image])


  return (
    <>
      {sessionUser &&
        <form className="createBizForm" onSubmit={handleSubmit} encType="multipart/form-data">
          {formType && formType === "Update Business" && <h1>Update your business details!</h1>}
          {formType && formType === "Create Business" && <h1>Add your business to The Paw!</h1>}
          <input className="inputFields"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            name="address"
          />
          {errors.address && <span className="errors">&nbsp;{errors.address}</span>}
          <input className="inputFields"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            name="city"
          />
          {errors.city && <span className="errors">&nbsp;{errors.city}</span>}
          <select className="inputFields"
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
          <input className="inputFields"
            type="text"
            value={zip_code}
            onChange={(e) => setZip_code(e.target.value)}
            placeholder="ZIP Code"
            name="zip_code"
          />
          {errors.zip_code && <span className="errors">&nbsp;{errors.zip_code}</span>}
          <input className="inputFields"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            name="name"
          />
          {errors.name && <span className="errors">&nbsp;{errors.name}</span>}
          <textarea className="inputFields"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            name="description"
            rows="5"
          />
          {errors.description && <span className="errors">&nbsp;{errors.description}</span>}
          <div className="inputFields">
            Price (Optional):&nbsp;
            {["$", "$$", "$$$", "$$$$"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={price == option}
                  onClick={() => updatePrice(option)}
                  onChange={() => { }}
                />
                {option}
              </label>
            ))}
          </div>
          <select className="inputFields"
            value={category_id}
            onChange={(e) => setCategory_id(e.target.value)}
            name="category"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={category} value={index + 1}>
                {category}
              </option>
            ))}
          </select>
          {errors.category_id && <span className="errors">&nbsp;{errors.category_id}</span>}
          <input className="inputFields"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
            name="website"
          />
          {errors.website && <span className="errors">&nbsp;{errors.website}</span>}
          <input className="inputFields"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            name="email"
          />
          {errors.email && <span className="errors">&nbsp;{errors.email}</span>}
          <input className="inputFields"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            name="website"
          />
          {errors.phone && <span className="errors">&nbsp;{errors.phone}</span>}
          {formType && formType === 'Create Business' &&
            <span className="inputFields" >
              <input  className="imageInput"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && <div className="errors">&nbsp;{errors.image}</div>}
              {(imageLoading) && <p>Loading...</p>}
            </span>
          }
          <button type="submit" className="inputFields" disabled={!!Object.values(errors).length}>{formType}</button>
        </form>
      }
    </>
  )
}

export default CreateBusinessPage
