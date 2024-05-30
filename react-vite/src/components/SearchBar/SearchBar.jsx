import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBusinesses } from '../../redux/search';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  // const businesses = Object.values(useSelector((state) => state.search))
  // const locations_list = []
  // businesses.map(business => {
  //   let city = business.city
  //   let state = business.state
  //   let cityState = city.concat(', ', state)

  //   locations_list.push(cityState)

  //   return locations_list
  // })

  // const uniqueLocations = locations_list.filter((value, index, arr) => index === arr.indexOf(value)).sort()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams()

    if (searchQuery === 'restaurant' || searchQuery === 'restaurants') {
      queryParams.append('category', 1)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (searchQuery === 'veterinarians' || searchQuery === 'veterinarian' || searchQuery === 'vet' || searchQuery === 'doctor') {
      queryParams.append('category', 2)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (searchQuery === 'services' || searchQuery === 'groomer' || searchQuery === 'training' || searchQuery === 'walker') {
      queryParams.append('category', 3)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (searchQuery === 'shopping' || searchQuery === 'store' || searchQuery === 'supplies' || searchQuery === 'boutique') {
      queryParams.append('category', 4)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (searchQuery === 'travel' || searchQuery === 'supplies' || searchQuery === 'boutique') {
      queryParams.append('category', 5)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (searchQuery === 'activities'|| searchQuery === 'things to do' || searchQuery === 'park' || searchQuery === 'parks') {
      queryParams.append('category', 6)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (searchQuery === 'adoption' || searchQuery === 'adopt') {
      queryParams.append('category', 7)
      const queryString = queryParams.toString();
      const url = `/search?${queryString}`;
      dispatch(fetchBusinesses(searchQuery, location, {}, 1, 10)).then(() => {
        navigate(url)
        setSearchQuery('')
        setLocation('')
      })
    }
    if (searchQuery === 'other' || searchQuery === 'photo' || searchQuery === 'photos' || searchQuery === 'burial') {
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
        <input
          id="location"
          list="locations"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="city, state"
        />
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
