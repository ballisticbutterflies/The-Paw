import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllBusinesses, businessesArr } from "../../redux/businesses";


function Navigation() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');


  return (
    <div>
      <NavLink to="/"><img src='../../../images/logos/the_paw_in_black.png' style={{
        width: '10%'
      }} /></NavLink>
      < ProfileButton />

      <form>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          list="data"
        />
        <datalist>
          <option></option>
        </datalist>
        <button type="submit"><FaSearch /></button>
      </form>
    </div>
  )
}

export default Navigation;
