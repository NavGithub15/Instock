import './AddWarehouse.scss';

import ArrowBack from '../../assets/icons/arrow_back-24px.svg';
import WarehouseForm from '../WarehouseForm/WarehouseForm';
import { useNavigate } from 'react-router-dom'

function AddWarehouse() {

  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate(-1)
  }

  return (
    <section className='add-warehouse'>
      <div className='add-warehouse__container'>
        <div className='add-warehouse__header'>
          <img className ='add-warehouse__arrow'src={ArrowBack} alt="back arrow" onClick={handleOnClick}/>
          <h1 className='add-warehouse__title'>Add New Warehouse</h1>
        </div>
        <WarehouseForm />
      </div>
    </section>
  )
};

export default AddWarehouse;