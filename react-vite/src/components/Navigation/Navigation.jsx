import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchBusinesses } from "../../redux/search";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton'

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const user = useSelector((store) => store.session.user);
  const businesses = Object.values(useSelector((state) => state.search))
  const locations = businesses.map(business => {
    let city = business.city
    let state = business.state
    return city.concat(', ', state)
  })

  useEffect(() => {
    dispatch(fetchBusinesses())
  }, [dispatch])


  return (
    <div className="nav">
      <NavLink to="/"><img className="logo" src='../../../images/logos/the_paw_in_black.png' /></NavLink>

      <div className="searchForm">
        <form className="formNav">
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
            onChange={(e) => setLocation(e.target.value)}
            placeholder="city, state"
          />
          <datalist id="locations">
            {locations.map(op => (
              <option key={op} value={op}>{op}</option>
            ))
            }
          </datalist>
          <button id="search" type="submit"><FaSearch /></button>
        </form>
      </div>
      <div className="forBiz">
        For Business&nbsp;&nbsp;<i className="fa-solid fa-angle-down" id="caret"></i>
      </div>
      <div className="writeReview">
        Write a Review
      </div>
      <div className="leftnav">
        {user ? (
          <>
            <div>
              <ProfileButton />
            </div>
          </>
        ) : (
          <>
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
          </>
        )
        }
      </div>
    </div>
  )
}

export default Navigation;
