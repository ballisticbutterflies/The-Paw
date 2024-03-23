import { useNavigate } from "react-router-dom";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


function ManageBizButton({ business }) {

  const navigate = useNavigate()

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

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='menu' onClick={toggleMenu}>
        <i className="fa-solid fa-ellipsis" />
      </button>
      {showMenu &&
        <>
          <ul className={ulClassName} ref={ulRef}></ul>
          <ul>
            <Link to={`/businesses/${business.id}/edit`}
              onClick={closeMenu}
            >Update Business</Link>
          </ul>
          <ul>
            Delete
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
