import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchBusinesses } from '../../redux/search';
import PlacesSearch from './PlacesSearch';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [category_id, setCategory_id] = useState('')
  const [isPredictionSelected, setIsPredictionSelected] = useState(false);
  const [isInputTyped, setIsInputTyped] = useState(false);  // State variable for tracking input typing

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentLocation = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(currentLocation.search);
    const queryFromParams = params.get('search_query');
    const locationFromParams = params.get('location');

    const categoryFromParams = params.get('category');
    console.log(locationFromParams, "QUERY PARAMS")
    if (queryFromParams) {
      setSearchQuery(queryFromParams)
    } else {
      setSearchQuery('')

    }

    if (categoryFromParams) {
      setCategory_id(categoryFromParams)
    } else {
      setCategory_id('')
    }

    if (locationFromParams) {
      setLocation(locationFromParams);
    } else {
      setLocation('')
    }
  }, [currentLocation]);


  const handleLocationSelect = (selectedLocation) => {

    setLocation(selectedLocation);
    // const queryParams = new URLSearchParams();
    // queryParams.append('location', selectedLocation);

  };


  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);  // Signal that form has been submitted
    setTimeout(() => setIsSubmitted(false), 0);  // Reset the signal immediately after

    const queryParams = new URLSearchParams()
    const categoryFromParams = queryParams.get('category');

    const lowercase_query = searchQuery.toLowerCase()


    if (lowercase_query === 'restaurant' || lowercase_query === 'restaurants') {
      queryParams.append('category', 1)

    }
    if (lowercase_query === 'veterinarians' || lowercase_query === 'veterinarian' || lowercase_query === 'vet' || lowercase_query === 'doctor') {
      queryParams.append('category', 2)

    }
    if (lowercase_query === 'services' || lowercase_query === 'groomer' || lowercase_query === 'groomers' || lowercase_query === 'training' || lowercase_query === 'grooming' ) {
      queryParams.append('category', 3)
    }
    if (lowercase_query === 'shopping' || lowercase_query === 'store' || lowercase_query === 'supplies' || lowercase_query === 'boutique' || lowercase_query === 'stores' || lowercase_query === 'shops') {
      queryParams.append('category', 4)
    }
    if (lowercase_query === 'travel' || lowercase_query === 'hotel' || lowercase_query === 'inn' || lowercase_query === 'motel') {
      queryParams.append('category', 5)

    }
    if (lowercase_query === 'activities' || lowercase_query === 'parks' || lowercase_query === 'park' || lowercase_query === 'things to do') {
      queryParams.append('category', 6)

    }
    if (lowercase_query === 'adoption' || lowercase_query === 'adopt' || lowercase_query === 'shelter') {
      queryParams.append('category', 7)

    }
    if (lowercase_query === 'other') {
      queryParams.append('category', 8)
    }

    if (!searchQuery && !location && !category_id) dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => { navigate('/search') })


    if (searchQuery) queryParams.append('search_query', searchQuery)
    if (location && isInputTyped) queryParams.append('location', location)
    //if (location) queryParams.append('location', location)
    const queryString = queryParams.toString();
    const url = `/search?${queryString}`;

    if (categoryFromParams) {
      dispatch(fetchBusinesses(searchQuery, location, `category=${category_id}`, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
        setCategory_id('')
      })
    } else {
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
  };

  return (
    <div className="searchForm">
      <form className="formNav" onSubmit={handleSubmit}>
        <input
          id="searchQuery"
          type="text"
          value={searchQuery}
          placeholder="things to do, parks, restaurants"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <PlacesSearch
          onLocationSelect={handleLocationSelect}
          location={location}
          setLocation={setLocation}
          isSubmitted={isSubmitted}
          setIsPredictionSelected={setIsPredictionSelected}
          isPredictionSelected={isPredictionSelected}
          isInputTyped={isInputTyped}
          setIsInputTyped={setIsInputTyped}
        />


        <button id="search" type="submit"><i className="fa-solid fa-magnifying-glass" style={{ color: "#5f5ba8", fontSize: "large" }} /></button>
      </form>
    </div>
  );
};

export default SearchBar;
