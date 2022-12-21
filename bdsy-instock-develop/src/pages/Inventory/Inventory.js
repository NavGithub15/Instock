import './Inventory.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InventoryCard from '../../components/InventoryCard/InventoryCard';
import InventoryTabletLabels from '../../components/InventoryTabletLabels/InventoryTabletLabels';
import {Link} from 'react-router-dom';

function Inventory() {

  const apiUrl= "http://localhost:8080"
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(()=> {
    axios.get(`${apiUrl}/inventory`)

    .then((response)=> {setInventoryList(response.data)})
    .catch ( error => console.log(error))

  },[])

 if(!inventoryList) {
  return <h1>Loading....please wait while we get all inventory items</h1>
 }

  return (
    <main className="inventory">
      <div className='inventory__container'>
        <div className="inventory__heading-box">
          <h1 className="inventory__heading">Inventory</h1>
          <input type="text" className="inventory__search" placeholder='Search' />
          <Link to="/inventory/addInventory" className="inventory__button h3">+ Add New Item</Link> 
        </div>
        <InventoryTabletLabels />
        {inventoryList.map((item) => < InventoryCard item = {item} key={item.id}/> )}
      </div>
    </main>
  );
}

export default Inventory
