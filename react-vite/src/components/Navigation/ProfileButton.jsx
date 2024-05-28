import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  // console.log(user);
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <div onClick={toggleMenu} style={{ cursor: "pointer" }}>                            {user.user_image_url ? (
        <img className="profileAvatar" src={user.user_image_url} />
      ) : (
        <img className="profileAvatar" src='../../images/defaultAvatar.png' />
      )}</div>
      {showMenu && (
        <div className="dropdown">
          <ul className={"profile-dropdown"} ref={ulRef}>
            {user ? (
              <>
                <div className="profiledropdownoptions"
                  onClick={() => { navigate(`/users/${user.id}`), closeMenu() }}><FaUserCircle />&nbsp; About Me</div>
                <hr />
                <div className="profiledropdownoptions" onClick={() => { navigate('/businesses/new'), closeMenu() }}><i className="fa-solid fa-store" />&nbsp; Add Business</div>
                <hr />
                <div className="profiledropdownoptions" onClick={() => { navigate('/businesses/current'), closeMenu() }}><i className="fa-solid fa-pen-to-square" />&nbsp; Manage Business</div>
                <hr />
                <div className="profiledropdownoptions" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket" />&nbsp; Log Out </div>
              </>
            ) : (
              <>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
