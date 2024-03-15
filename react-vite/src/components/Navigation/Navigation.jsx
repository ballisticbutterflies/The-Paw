import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllBusinesses, businessesArr } from "../../redux/businesses";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton'

function Navigation() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const user = useSelector((store) => store.session.user);
  const allBusinesses = useSelector(businessesArr);

  useEffect(() => {
    dispatch(getAllBusinesses())
  }, [dispatch])

  return (
    <div className="nav">
      <NavLink to="/"><img className="logo" src='../../../images/logos/the_paw_in_black.png' /></NavLink>
      <div>
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
            list="data"
            placeholder="San Francisco, CA"
          />
          <datalist>
            <option></option>
          </datalist>
          <button id="search" type="submit"><FaSearch /></button>
        </form>
      </div>
      <div className="add">
        Add a Business
      </div>
      <div className="write">
        Write a Review
      </div>

      {user ? (
        <>
          <ProfileButton />
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
  )
}

export default Navigation;
