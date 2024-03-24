import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./ManageBusiness.css"


function ManageBizButton({ business }) {

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const ulClassName = "manage-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='manageMenu' onClick={toggleMenu}>
        <i className="fa-solid fa-ellipsis" />
      </button>
      {showMenu &&
        <>
          <ul className={ulClassName} ref={ulRef}>
            <p className="updateBiz">
            <Link to={`/businesses/${business.id}/edit`}
              onClick={closeMenu}
            >Update Business</Link>

            </p>

            <button onClick={() => window.alert("Feature Coming Soon...")}>Delete</button>
          {/* <OpenModalMenuItem
                itemText="Delete Business"
                onItemClick={closeMenu}
                modalComponent={<DeleteFormModal />}
              /> */}
          </ul>
        </>


      }


    </>
  )

}

export default ManageBizButton
