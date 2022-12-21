import "./WarehouseModal.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const apiUrl = "http://localhost:8080";

export default function WarehouseModal({ openModal, onClose, name, content, warehouseId }) {

  if (!openModal) return null;

  // Delete request
  const handleDeleteWarehouse = (e) => {
    e.preventDefault();
    axios
      .delete(`${apiUrl}/warehouses/${warehouseId}`)
      .then((response) => {
        onClose(false);
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
   if(!warehouseId) {
     return <h2>Loading......</h2>
   }
  return (
    <div className="modal">
      <div className="modal__container" onClick={(e) => { e.stopPropagation(); }}>
        <Link className="modal__close" to="/" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </Link>
        <div className="modal__wrapper">
          <h1 className="modal__heading h1">{name}</h1>
          <p className="modal__text p1">{content}</p>
        </div>
        <div className="modal__cta-wrapper">
          <button className="modal__cta modal__cta--special" onClick={onClose}>Cancel</button>
          <button className="modal__cta" to="/" onClick={handleDeleteWarehouse}>Delete</button>
        </div>
      </div>
    </div>
  );
}
