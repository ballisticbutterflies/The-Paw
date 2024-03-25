import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteBusiness } from "../../redux/businesses";

const DeleteBizModal = ({ businessId }) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteBusiness(businessId))
      .then(closeModal)
  }

  return (
    <>
      <div className="deleteModal">
        <h3>Confirm Delete</h3>
        <span>Are you sure you want to delete this business?</span>
        <button style={{ marginTop: "10px" }} onClick={handleDelete}>Yes, I'm Sure (Delete Permanently)</button>
        <button style={{ backgroundColor: "#c3cddf", color: "#768c9f", marginTop: "10px" }} onClick={closeModal}>No, Just Kitt-ing Around! (Keep Business)</button>
      </div>
    </>
  )
}

export default DeleteBizModal;
