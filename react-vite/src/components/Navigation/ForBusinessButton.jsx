import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";


function ForBusinessButton() {

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const sessionUser = useSelector(state => state.session.user)

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  const closeMenu = () => setShowMenu(false);

  const ulClassName = "forbiz-dropdown" + (showMenu ? "" : " hidden");

  // const redirect = (e) => {
  //   e.preventDefault();

  //   closeMenu();
  // };

  return (
    <>
      <button className="forBizButton" onClick={toggleMenu}>For Business&nbsp;&nbsp;
        <i className="fa-solid fa-angle-down" id="caret" />
      </button>
      {showMenu &&
        <>
          <ul className={ulClassName} ref={ulRef}>
            {
              sessionUser ? (
                <>
                  <p>
                    <Link to={'/businesses/new'}
                      onClick={closeMenu}
                    >Add Business</Link>
                  </p>
                  <p>
                    <Link to={`/businesses/current`}
                      onClick={closeMenu}
                    >Update Business</Link>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <OpenModalMenuItem
                      itemText="Update Business"
                      modalComponent={<LoginFormModal />}
                    />
                  </p>
                  <p>
                    <OpenModalMenuItem
                      itemText="Add Business"
                      modalComponent={<LoginFormModal />}
                    />
                  </p>
                </>
              )
            }
          </ul>
        </>
      }
    </>
  )
}

export default ForBusinessButton;
