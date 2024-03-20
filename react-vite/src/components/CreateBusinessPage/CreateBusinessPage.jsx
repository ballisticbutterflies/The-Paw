import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createBusiness, fetchSingleBusiness } from "../../redux/businesses"
import "./CreateBusiness.css"


function CreateBusinessPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('')
  const [activePrice, setActivePrice] = useState([
    { name: "$", checked: false },
    { name: "$$", checked: false },
    { name: "$$$", checked: false },
    { name: "$$$$", checked: false },
  ]);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  // const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const updatePrice = (e) => {
    const selectedPrice = e.target.value; // Get the selected price
    setActivePrice(
      activePrice.map((option) => ({
        ...option,
        checked: option.name === selectedPrice, // Set checked to true only for the selected price
      }))
    );
    setPrice(selectedPrice); // Update the price state with the selected price
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({})

    const newBusiness = {
      address,
      city,
      state,
      zip_code,
      name,
      description,
      price,
      email,
      website,
      phone,
      image
    }

    setImageLoading(true);

    await dispatch(createBusiness(newBusiness))
      .then((business) => {
        dispatch(fetchSingleBusiness(business.id))
          .then(navigate(`/businesses/${business.id}`))
      })
      // .then(history.push("/images"))
      .catch(async (response) => {
        const data = await response.json();
        if (data && data.errors) {
          setErrors(data.errors)
        }
      })
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

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errObj = {}
    if (!address) errObj.address = "Address is required"
    if (!city) errObj.city = "City is required"
    if (!state) errObj.state = "State is required"
    if (!zip_code) errObj.zip_code = "ZIP Code is required"
    if (zip_code.length > 5) errObj.zip_code = "ZIP Code is invalid"
    if (!name) errObj.name = "Name is required"
    if (name.length > 100) errObj.name = "Name must be less than 100 characters"
    if (!description) errObj.description = "Description is required"
    if (description.length >= 1 && description.length < 30 || description.length > 255) errObj.description = "Description must be between 30 and 255 characters"
    if (website && !isValidUrl(website)) errObj.website = "Website is not valid"
    if (email && !emailRegex.test(email)) errObj.email = "Email is invalid."
    if (phone && !isValidPhoneNumber(phone)) errObj.phone = "Please enter a valid phone number using only numerical digits (no special characters or spaces)."
    if (phone.length >= 1 && phone.length > 10) errObj.phone = "Phone numbers must be 10 digits."
    setErrors(errObj)
  }, [address, city, state, zip_code, name, description, website, email, phone])


  return (
    <>
      {sessionUser &&
        <form className="createBizForm" onSubmit={handleSubmit} encType="multipart/form-data">
          <h1>Add your business to The Paw!</h1>
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
          <button type="submit" disabled={!!Object.values(errors).length}>Create Business</button>
          {(imageLoading) && <p>Loading...</p>}
        </form>
      }
    </>
  )
}

export default CreateBusinessPage
