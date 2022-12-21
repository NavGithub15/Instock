import "./WarehouseCard.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import WarehouseModal from "../WarehouseModal/WarehouseModal";


export default function WarehouseCard({warehouse}) {
    const [openModal, setOpenModal] = useState(false);

  return (
    <div className="warehouse-card">
        <div className="warehouse-card__location-wrapper warehouse-card__wrapper">
            <h4 className="warehouse-card__mobile-label">warehouse</h4>
              <div className="warehouse-card__city-wrapper">
                  <Link to={`/warehouses/${warehouse.id}`}className="warehouse-card__city">{warehouse.name}</Link>
                  <img className="warehouse-card__chevron-icon" src={chevronIcon} alt="arrow"/>
            </div>
        </div>
        <div className="warehouse-card__address-wrapper warehouse-card__wrapper">
            <h4 className="warehouse-card__mobile-label">address</h4>
            <p className="warehouse-card__address">{warehouse.address} {warehouse.city},{warehouse.country}</p>
        </div>
        <div className="warehouse-card__contact-wrapper warehouse-card__wrapper">
            <h4 className="warehouse-card__mobile-label">contact name</h4>
            <p className="warehouse-card__name">{warehouse.contact.name}</p> 
        </div>
        <div className="warehouse-card__info-wrapper warehouse-card__wrapper">
            <h4 className="warehouse-card__mobile-label">contact information</h4>
            <p className="warehouse-card__contact-info">{warehouse.contact.phone}</p>
            <p className="warehouse-card__contact-info">{warehouse.contact.email}</p>
        </div>
        <div className="warehouse-card__icons-wrapper warehouse-card__wrapper">
            <img className="warehouse-card__icon" src={deleteIcon} alt="delete" onClick={() => setOpenModal(true)}/>
            <Link to={`/warehouses/${warehouse.id}/editWarehouse`}>
            <img className="warehouse-card__icon" src={editIcon} alt="edit" />
            </Link>
        </div>
        <WarehouseModal
            warehouseId={warehouse.id}
            openModal={openModal}
            name={`Delete ${warehouse.name} warehouse?`}
            content={`Please confirm that you'd like to delete the ${warehouse.name} from the list of warehouses. You won't be able to undo this action.`}
            onClose={() => setOpenModal(false)} 
        />
    </div>
  )
}
