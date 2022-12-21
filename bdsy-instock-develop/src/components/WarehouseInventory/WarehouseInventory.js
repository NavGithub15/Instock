import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg"
import {Link} from "react-router-dom";
import { useState} from "react";
import InventoryModal from "../InventoryModal/InventoryModal";
import './WarehouseInventory.scss'


function WarehouseInventory({warehouseInventory}) {

  const [openModal, setOpenModal] = useState(false);

    return (

      <div className="warehouseInv-card">
          <div className="warehouseInv-card__inventory-wrapper warehouseInv-card__wrapper">
            <p className="warehouseInv-card__mobile-label">Inventory Item</p>
            <div className="warehouseInv-card__item-wrapper">
              <Link to={`/inventory/${warehouseInventory.id}`} className="warehouseInv-card__item">{warehouseInventory.itemName}</Link>
              <img className="warehouseInv-card__chevron-icon"src={chevronIcon}alt="arrow"/>
            </div>
          </div>
          <div className="warehouseInv-card__category-wrapper warehouseInv-card__wrapper">
            <span className="warehouseInv-card__mobile-label">category</span>
            <p className="warehouseInv-card__category">{warehouseInventory.category}</p>
          </div>
          <div className="warehouseInv-card__status-wrapper warehouseInv-card__wrapper">
            <span className="warehouseInv-card__mobile-label">status</span>
            {(warehouseInventory.status === "In Stock") && <p className="warehouseInv-card__status warehouseInv-card__status--instock">{warehouseInventory.status}</p>}
            {(warehouseInventory.status === "Out of Stock") && <p className="warehouseInv-card__status warehouseInv-card__status--outstock">{warehouseInventory.status}</p>}
          </div>
          <div className="warehouseInv-card__quantity-wrapper warehouseInv-card__wrapper">
            <span className="warehouseInv-card__mobile-label">QTY</span>
            <p className="warehouseInv-card__quantity">{warehouseInventory.quantity}</p>
          </div>
          <div className="warehouseInv-card__icons-wrapper warehouseInv-card__wrapper">
            <img className ="warehouseInv-card__icon"src={deleteIcon} alt="delete" onClick={() => setOpenModal(true)}/>
            <Link to={`/inventory/${warehouseInventory.id}/editInventory`}>
              <img className ="warehouseInv-card__icon"src={editIcon} alt="edit" />
            </Link> 
          </div>
          <InventoryModal
            itemId={warehouseInventory.id}
            openModal={openModal}
            itemName={`Delete ${warehouseInventory.itemName} inventory item?`}
            itemContent={`Please confirm that you'd like to delete ${warehouseInventory.itemName} from the inventory list. You won't be able to undo this action.`}
            onClose={() => setOpenModal(false)} 
        />
      </div>
    )
}

export default WarehouseInventory