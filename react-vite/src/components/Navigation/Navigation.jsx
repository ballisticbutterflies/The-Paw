import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { searchBarBusinesses } from "../../redux/search";

import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton'
import ForBusinessButton from "./ForBusinessButton";
import { useNavigate } from "react-router-dom";
import { fetchAllBusinesses } from "../../redux/businesses";
// import ManageBusinessPage from "../ManageBusinessesPage/ManageBusinessPage";

// function Navigation({ isLoaded }) {
function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const user = useSelector((store) => store.session.user);
  const businesses = Object.values(useSelector((state) => state.businesses))

  const locations_list = []

  businesses.map(business => {
    let city = business.city
    let state = business.state
    let cityState = city.concat(', ', state)

    locations_list.push(cityState)

    return locations_list
  })

  const uniqueLocations = locations_list.filter((value, index, arr) => index === arr.indexOf(value)).sort()

  useEffect(() => {

    dispatch(fetchAllBusinesses())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchBarBusinesses(searchQuery, location))

      .then(() => {
        navigate('/search/')
        setSearchQuery('')
      })
      .then(() => setLocation(''))

  };



  return (
    <div className="nav">
      <NavLink to="/"><img className="logo" src='../../images/the_paw_in_black.png' /></NavLink>
      <div className="searchForm">
        <form className="formNav" onSubmit={handleSubmit}>
          <input
            id="searchQuery"
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
            placeholder="City, State"
          />
          <datalist id="locations">
            {uniqueLocations.map(op => (
              <option key={op} value={op}>{op}</option>
            ))
            }
          </datalist>
          <button id="search" type="submit"><i className="fa-solid fa-magnifying-glass" style={{ color: "#5f5ba8", fontSize: "large" }} /></button>
        </form>
      </div>
      <div className="forBiz">
        <ForBusinessButton />
      </div>
      <div className="writeReview">
        Write a Review
      </div>
      <div className="leftNav">
        {user ? (
          <>
            <div>
              <ProfileButton />
            </div>
          </>
        ) : (
          <>
            <div className="leftNav">
              <div>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
                &nbsp;&nbsp;&nbsp;
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </div>
          </>
        )
        }
      </div>
    </div >
  )
}

export default Navigation;
