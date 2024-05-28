import { useState } from 'react';
import { useDispatch } from "react-redux";
import { searchBarBusinesses } from '../../redux/search';
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
    if (searchQuery) queryParams.append('search_query', searchQuery)
    if (location) queryParams.append('location', location)
    if (!searchQuery) dispatch(fetchBusinesses()).then(() => { navigate('/search')})
    const queryString = queryParams.toString();
    const url = `/search?${queryString}`;
    console.log('Target URL SEARCH BAR :', url);
    dispatch(searchBarBusinesses(searchQuery, location)).then(() => {
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
