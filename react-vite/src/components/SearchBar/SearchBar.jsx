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

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentLocation = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(currentLocation.search);
    const locationFromParams = params.get('location');
    const categoryFromParams = params.get('category');

    console.log(categoryFromParams, "CATEGORY IN SERCH BARRRRRRRRR")

    if (categoryFromParams) {
      setCategory_id(categoryFromParams)
    }

    if (locationFromParams) {
      setLocation(locationFromParams);
    } else {
      setLocation('')
    }
  }, [currentLocation]);



  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    const queryParams = new URLSearchParams();
    queryParams.append('location', selectedLocation);

    console.log('Selected location:', selectedLocation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);  // Signal that form has been submitted
    setTimeout(() => setIsSubmitted(false), 0);  // Reset the signal immediately after


    const queryParams = new URLSearchParams()
    const categoryFromParams = queryParams.get('category');
    console.log(categoryFromParams, "category from params in search bar")

    const lowercase_query = searchQuery.toLowerCase()


    if (lowercase_query === 'restaurant' || lowercase_query === 'restaurants') {
      queryParams.append('category', 1)
      // const queryString = queryParams.toString();
      // const url = `/search?${queryString}`;
      // dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      //   console.log('Search Bar', lowercase_query, location)
      //   navigate(url)
      //   setSearchQuery('')
      //   setLocation('')
      // })
    }
    if (lowercase_query === 'veterinarians' || lowercase_query === 'veterinarian' || lowercase_query === 'vet' || lowercase_query === 'doctor') {
      queryParams.append('category', 2)
      // const queryString = queryParams.toString();
      // const url = `/search?${queryString}`;
      // dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      //   navigate(url)
      //   setSearchQuery('')
      //   setLocation('')
      // })
    }
    if (lowercase_query === 'services' || lowercase_query === 'groomer' || lowercase_query === 'groomers' || lowercase_query === 'training' || lowercase_query === 'walker') {
      queryParams.append('category', 3)
      // const queryString = queryParams.toString();
      // const url = `/search?${queryString}`;
      // dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      //   navigate(url)
      //   setSearchQuery('')
      //   setLocation('')
      // })
    }
    if (lowercase_query === 'shopping' || lowercase_query === 'store' || lowercase_query === 'supplies' || lowercase_query === 'boutique') {
      queryParams.append('category', 4)
      // const queryString = queryParams.toString();
      // const url = `/search?${queryString}`;
      // dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      //   navigate(url)
      //   setSearchQuery('')
      //   setLocation('')
      // })
    }
    if (lowercase_query === 'travel' || lowercase_query === 'hotel') {
      queryParams.append('category', 5)
      // const queryString = queryParams.toString();
      // const url = `/search?${queryString}`;
      // dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      //   navigate(url)
      //   setSearchQuery('')
      //   setLocation('')
      // })
    }
    if (lowercase_query === 'activities' || lowercase_query === 'parks' || lowercase_query === 'park' ) {
      queryParams.append('category', 6)
      // const queryString = queryParams.toString();
      // const url = `/search?${queryString}`;
      // dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      //   navigate(url)
      //   setSearchQuery('')
      //   setLocation('')
      // })
    }
    if (lowercase_query === 'adoption' || lowercase_query === 'adopt' || lowercase_query === 'shelter') {
      queryParams.append('category', 7)
      // const queryString = queryParams.toString();
      // const url = `/search?${queryString}`;
      // dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      //   navigate(url)
      //   setSearchQuery('')
      //   setLocation('')
      // })
    }
    if (lowercase_query === 'other') {
      queryParams.append('category', 8)
      // const queryString = queryParams.toString();
      // const url = `/search?${queryString}`;
      // dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      //   navigate(url)
      //   setSearchQuery('')
      //   setLocation('')
      // })
    }

    if (!searchQuery && !location && !category_id) dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => { navigate('/search') })


    if (searchQuery) queryParams.append('search_query', searchQuery)
    if (location) queryParams.append('location', location)
    const queryString = queryParams.toString();
    const url = `/search?${queryString}`;
    console.log('Target URL SEARCH BAR :', url);
    console.log(categoryFromParams, "CATEGORY ID EXISTS")
    if (categoryFromParams) {
      dispatch(fetchBusinesses(searchQuery, location, `category=${category_id}`, 1, 10)).then(() => {
        console.log(searchQuery, location, category_id, 'Dispatch after target URL CONSOLE LOG')
        navigate(url)
        setSearchQuery('')
        setLocation('')
        setCategory_id('')
      })
    } else {
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        console.log(searchQuery, location, category_id, 'Dispatch after target URL CONSOLE LOG v2')
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
        {/* <input
          id="location"
          list="locations"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="city, state"
        /> */}

        <PlacesSearch onLocationSelect={handleLocationSelect} location={location} isSubmitted={isSubmitted} />


        {/* <datalist id="locations">
        {uniqueLocations.map(op => (
          <option key={op} value={op}>{op}</option>
        ))
        }
      </datalist> */}
        <button id="search" type="submit"><i className="fa-solid fa-magnifying-glass" style={{ color: "#5f5ba8", fontSize: "large" }} /></button>
      </form>
    </div>
  );
};

export default SearchBar;
