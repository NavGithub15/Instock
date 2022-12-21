import './InventoryItemDetail.scss'

import ArrowBack from '../../assets/icons/arrow_back-24px.svg';
import editIcon from '../../assets/icons/edit_white_24dp.svg'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getSingleInventoryItem } from '../../utilities/utilities';

function InventoryItemDetail() {

  const navigate = useNavigate()
  const { inventoryId } = useParams()

  const [ foundItem, setFoundItem ] = useState(null)
  
  useEffect(() => {
    // AXIOS GET /inventory/:inventoryId
    getSingleInventoryItem(inventoryId).then((response) => {
      setFoundItem(response.data)
    }).catch((error) => {
      console.log(error.message)
    })
  },[inventoryId])

  const handleOnClick = () => {
    navigate(-1)
  }

  if(!foundItem) {
    return (
      <section className='inventory-item'>
        <div className='inventory-item__failed'>
          <h1>Failed to load inventory item</h1>
        </div>
      </section>
    )
  }

  return (
    <section className='inventory-item'>
      <div className='inventory-item__container'>
        <div className='inventory-item__header'>
          <div className='inventory-item__title'>
            <img className ='inventory-item__arrow'src={ArrowBack} alt="back arrow" onClick={handleOnClick}/>
            <h1 className='inventory-item__title'>{foundItem.itemName}</h1>
          </div>
          <Link to ={`/inventory/${inventoryId}/editInventory`} className='inventory-item__button button'>
            <img src={editIcon} alt="pencil" className='button__icon'/>
            <span className='button__title h3'>Edit</span>
          </Link>
        </div>
        <div className='inventory-item__description description'>
          <div className='description__item'>
            <div className='description__description'>
              <h4>item description:</h4>
              <span className='p2'>{foundItem.description}</span>
            </div>
            <div className='description__category'>
              <h4>category:</h4>
              <span className='p2'>{foundItem.category}</span>
            </div>
          </div>
          <div className='description__info'>
            <div className='description__stock'>
              <div className='description__status'>
                <h4>status:</h4>
                <span className='p2'>{foundItem.status}</span>
              </div>
              <div className='description__quantity'>
                <h4>quantity:</h4>
                <span className='p2'>{foundItem.quantity}</span>
              </div>
            </div>
            <div className='description__warehouse'>
              <h4>warehouse:</h4>
              <span className='p2'>{foundItem.warehouseName}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InventoryItemDetail;