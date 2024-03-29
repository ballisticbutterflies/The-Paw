import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DeleteBizModal from "./DeleteBizModal";
import "./ManageBusiness.css"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


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
            <div className="profiledropdownoptions">
              <Link to={`/businesses/${business.id}/edit`}
                onClick={closeMenu}
              ><i className="fa-solid fa-pen-to-square" /> Update Business</Link>
            </div>
            <div className="profiledropdownoptions">
              <OpenModalMenuItem
                itemText={<><i className="fa-solid fa-trash-can" />&nbsp; Delete Business</>}
                businessId={business.id}
                modalComponent={<DeleteBizModal businessId={business.id} />}
              />
            </div>
          </ul>
        </>


      }


    </>
  )

}

export default ManageBizButton
