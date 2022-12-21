import sortIcon from "../../assets/icons/sort-24px.svg";

function InventoryTabletLabels () {
  return (
    <div className=" inventory-tablet">
      <div className="inventory-tablet__label inventory-tablet__inventory">
        <span >Inventory Item</span>
        <img className="inventory-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="inventory-tablet__label">
        <span className='inventory-tablet__category'>category</span>
        <img className="inventory-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="inventory-tablet__label">
        <span className='inventory-tablet__status'>status</span>
        <img className="inventory-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="inventory-tablet__label">
        <span className='inventory-tablet__quantity'>qty</span>
        <img className="inventory-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="inventory-tablet__label">
        <span className='inventory-tablet__warehouse'>warehouse</span>
        <img className="inventory-tablet__icon" src={sortIcon} alt="sort" />
      </div>
      <div className="inventory-tablet__label">
        <span className='inventory-tablet__actions'>actions</span>
      </div>
    </div>
  )
}

export default InventoryTabletLabels;