import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from "react-redux";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const businesses = Object.values(useSelector((state) => state.search))
  const locations_list = []
  businesses.map(business => {
    let city = business.city
    let state = business.state
    let cityState = city.concat(', ', state)

    locations_list.push(cityState)

    return locations_list
  })

  const uniqueLocations = locations_list.filter((value, index, arr) => index === arr.indexOf(value)).sort()


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, location);
  };

  return (
    <div className="searchForm">
    <form className="formNav" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchQuery}
        placeholder="things to do, groomers, restaurants"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input
        id="location"
        list="locations"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="city, state"
      />
      <datalist id="locations">
        {uniqueLocations.map(op => (
          <option key={op} value={op}>{op}</option>
        ))
        }
      </datalist>
      <button type="submit"><FaSearch /></button>
    </form>
    </div>
  );
};

export default SearchBar;
