import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton'
// import ForBusinessButton from "./ForBusinessButton";
import SearchBar from "../SearchBar/SearchBar";


function Navigation() {

  const user = useSelector((store) => store.session.user);

  return (
    <div className="nav">
      <NavLink to="/"><img className="logo" src='../../images/the_paw_in_black.png' /></NavLink>
      <SearchBar />
      {/* <div className="forBiz">
        <ForBusinessButton />
      </div> */}
      {/* <div className="writeReview">
        Write a Review
      </div> */}
      <div className="rightNav">
        {!user || user?.message === "user: null" ? (
          <>
            <div className="rightNavButtons">
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        ) : (
          <>
          <ProfileButton />
          </>
        )
        }
      </div>
    </div >
  )
}

export default Navigation;
