import './Warehouse.scss'
import { useState, useEffect} from 'react';
import axios from 'axios';
import WarehouseTabletLabels from '../../components/WarehouseTabletLabels/WarehouseTabletLabels';
import WarehouseInventory from '../../components/WarehouseInventory/WarehouseInventory';
import ArrowBack from '../../assets/icons/arrow_back-24px.svg';
import editIcon from '../../assets/icons/edit_white_24dp.svg'
import { Link, useParams } from 'react-router-dom';

const apiUrl= "http://localhost:8080"

function Warehouse() {

  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [inventoriesByWarehouse, setInventoriesByWarehouse] = useState([])
  const {warehouseId} = useParams();
 
  useEffect(() => {

    axios.get(`${apiUrl}/warehouses/${warehouseId}`)

    .then((response) => {setSelectedWarehouse(response.data)})
      
  }, [warehouseId])

  useEffect(()=>{
    axios.get(`${apiUrl}/inventory/warehouses/${warehouseId}`)

    .then((response)=>{ setInventoriesByWarehouse(response.data)})
    
  },[warehouseId])
 
  if(!selectedWarehouse) {
    return <p>Loading...</p>
  }

  return (
    <section className="warehouse">
      <div className="warehouse__container">
          <div className="warehouse__header-container">
              <div className='warehouse__header'>
                <Link to='/'><img src={ArrowBack} alt="back arrow"/></Link>
                <h1 className='warehouse__title'>{selectedWarehouse.name}</h1>
              </div>
              <Link to ={`/warehouses/${warehouseId}/editWarehouse`} 
                className='warehouse__button'>
                <img src={editIcon} alt="pencil" className='button__icon'/>
                <span className='button__title'>Edit</span>
              </Link>
          </div>
            <div className="warehouse__details-container">
              <div className='warehouse__details-wrapper'>
                <div className="warehouse__address address">
                  <h4 className='address__header'>Warehouse Address:</h4>
                  <div className='address__container'>
                    <p className='address p2'>{selectedWarehouse.address}, </p>
                    <p className='p2'>{selectedWarehouse.city}, {selectedWarehouse.country}</p>
                  </div>
                </div>
                <div className="warehouse__contact contact" >
                    <div className="contact__name-container">
                      <h4 className="contact__name-header">Contact Name:</h4>
                      <p className="contact__name p2">{selectedWarehouse.contact.name}</p>
                      <p className='contact__position p2'>{selectedWarehouse.contact.position}</p>
                    </div>
                    <div className="contact__info-container">
                      <h4 className="contact__info-header">Contact Information:</h4>
                      <p className="contact__number p2">{selectedWarehouse.contact.phone}</p>
                      <p className="contact__email p2">{selectedWarehouse.contact.email}</p>
                    </div>
                </div>
              </div>
            </div>
          < WarehouseTabletLabels />
          {inventoriesByWarehouse.map((warehouseInventory) => 
            <WarehouseInventory warehouseInventory={warehouseInventory}  key={warehouseInventory.id}/> 
          )}
      </div>
    </section>
  )
}

export default Warehouse