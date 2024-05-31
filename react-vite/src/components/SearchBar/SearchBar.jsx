import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBusinesses } from '../../redux/search';
import PlacesSearch from './PlacesSearch';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLocationSelect = (location) => {
    setLocation(location);
     const queryParams = new URLSearchParams()
    queryParams.append('location', location)
    const queryString = queryParams.toString();
    const url = `/search?${queryString}`;
    dispatch(fetchBusinesses({}, location, {}, 1, 10)).then(() => {
      navigate(url)
    })
  };

  console.log('Selected location:', location);
  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams()

    const lowercase_query = searchQuery.toLowerCase()


    if (lowercase_query === 'restaurant' || lowercase_query === 'restaurants') {
      queryParams.append('category', 1)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (lowercase_query === 'veterinarians' || lowercase_query === 'veterinarian' || lowercase_query === 'vet' || lowercase_query === 'doctor') {
      queryParams.append('category', 2)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (lowercase_query === 'services' || lowercase_query === 'groomer' || lowercase_query === 'groomers' || lowercase_query === 'training' || lowercase_query === 'walker') {
      queryParams.append('category', 3)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (lowercase_query === 'shopping' || lowercase_query === 'store' || lowercase_query === 'supplies' || lowercase_query === 'boutique') {
      queryParams.append('category', 4)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (lowercase_query === 'travel' || lowercase_query === 'hotel') {
      queryParams.append('category', 5)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (lowercase_query === 'activities' || lowercase_query === 'things to do' || lowercase_query === 'park' || lowercase_query === 'parks') {
      queryParams.append('category', 6)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (lowercase_query === 'adoption' || lowercase_query === 'adopt' || lowercase_query === 'shelter') {
      queryParams.append('category', 7)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (lowercase_query === 'other') {
      queryParams.append('category', 8)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }

    if (!searchQuery) dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => { navigate('/search') })
    if (searchQuery) queryParams.append('search_query', searchQuery)
    if (location) queryParams.append('location', location)
    const queryString = queryParams.toString();
    const url = `/search?${queryString}`;
    console.log('Target URL SEARCH BAR :', url);
    dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
      navigate(url)
      setSearchQuery('')
      setLocation('')
    })
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
        <PlacesSearch onLocationSelect={handleLocationSelect} location={location}/>

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
