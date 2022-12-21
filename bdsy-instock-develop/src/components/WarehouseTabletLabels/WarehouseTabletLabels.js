import sortIcon from "../../assets/icons/sort-24px.svg";

import React from 'react'

function WarehouseTabletLabels() {

  return (
  
    <div className="warehouse-tablet">
      <div className="warehouse-tablet__label warehouse-tablet__inventory">
        <span >Inventory Item</span>
        <img className="warehouse-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="warehouse-tablet__label">
        <span className='warehouse-tablet__category'>category</span>
        <img className="warehouse-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="warehouse-tablet__label">
        <span className='warehouse-tablet__status'>status</span>
        <img className="warehouse-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="warehouse-tablet__label">
        <span className='warehouse-tablet__quantity'>qty</span>
        <img className="warehouse-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="warehouse-tablet__label">
        <span className='warehouse-tablet__actions'>actions</span>
      </div>
    </div>
  )
}

export default WarehouseTabletLabels