import './EditWarehouse.scss';

import ArrowBack from '../../assets/icons/arrow_back-24px.svg';
import WarehouseForm from '../WarehouseForm/WarehouseForm';
import { useNavigate } from 'react-router-dom'

function EditWarehouse() {

  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate(-1)
  }

  return (
    <section className='edit-warehouse'>
      <div className='edit-warehouse__container'>
        <div className='edit-warehouse__header'>
          <img className ='edit-warehouse__arrow'src={ArrowBack} alt="back arrow" onClick={handleOnClick}/>
          <h1 className='edit-warehouse__title'>Edit Warehouse</h1>
        </div>
        <WarehouseForm />
      </div>
    </section>
  )
};

export default EditWarehouse;