import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllBusinesses, businessesArr } from "../../redux/businesses";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function Navigation() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  // const allBusinesses = useSelector(businessesArr);

  // useEffect(() => {
  //   dispatch(getAllBusinesses())
  // }, [dispatch])

  return (
    <div>
      <NavLink to="/"><img src='../../../images/logos/the_paw_in_black.png' style={{
        width: '10%'
      }} /></NavLink>

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

      <div>
        Add a Business
      </div>

      <div>
        Write a Review
      </div>

      <div>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </div>

      <div>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>
  )
}

export default Navigation;
