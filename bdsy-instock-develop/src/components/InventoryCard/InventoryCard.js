import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg"
import { Link } from "react-router-dom";
import './InventoryCard.scss'
import {useState} from "react";
import InventoryModal from "../InventoryModal/InventoryModal";

function InventoryCard({item}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="inventory-card">
      <div className="inventory-card__inventory-wrapper inventory-card__wrapper">
        <p className="inventory-card__mobile-label">Inventory Item</p>
        <div className="inventory-card__item-wrapper">
          <Link to={`/inventory/${item.id}`} className="inventory-card__item">{item.itemName}</Link>
          <img className="inventory-card__chevron-icon" src={chevronIcon} alt="arrow" />
        </div>
      </div>
      <div className="inventory-card__category-wrapper inventory-card__wrapper">
        <span className="inventory-card__mobile-label">category</span>
        <p className="inventory-card__category">{item.category}</p>
      </div>
      <div className="inventory-card__status-wrapper inventory-card__wrapper">
        <span className="inventory-card__mobile-label">status</span>
        {(item.status === "In Stock") && <p className="inventory-card__status inventory-card__status--instock">{item.status}</p>}
        {(item.status === "Out of Stock") && <p className="inventory-card__status inventory-card__status--outstock">{item.status}</p>}
      </div>
      <div className="inventory-card__quantity-wrapper inventory-card__wrapper">
        <span className="inventory-card__mobile-label">QTY</span>
        <p className="inventory-card__quantity">{item.quantity}</p>
      </div>
      <div className="inventory-card__warehouse-wrapper inventory-card__wrapper">
        <span className="inventory-card__mobile-label">Warehouse</span>
        <p className="inventory-card__warehouse">{item.warehouseName}</p>
      </div>
      <div className="inventory-card__icons-wrapper inventory-card__wrapper">
        <img className ="inventory-card__icon"src={deleteIcon} alt="delete" onClick={() => setOpenModal(true)}/>
        <Link to={`/inventory/${item.id}/editInventory`}><img className="inventory-card__icon" src={editIcon} alt="edit" /></Link>
      </div>
      <InventoryModal
        itemId={item.id}
        openModal={openModal}
        itemName={`Delete ${item.itemName} inventory item?`}
        itemContent={`Please confirm that you'd like to delete ${item.itemName} from the inventory list. You won't be able to undo this action.`}
        onClose={() => setOpenModal(false)} 
      />
    </div>
  )
}

export default InventoryCard