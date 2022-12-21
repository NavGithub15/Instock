import './WarehouseForm.scss'

import { formatNumber, unformatNumber, POSTwarehouse, PUTwarehouse, getSingleWarehouse } from '../../utilities/utilities';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import InputError from '../InputError/InputError'

function WarehouseForm () {

  // CHECK URL PATH (addWarehouse/editWarehouse)
  const pathAdd = window.location.pathname.includes("add")
  const pathEdit = window.location.pathname.includes("edit")
  const navigate = useNavigate()
  const { warehouseId } = useParams()

  // STATES FOR CONTROLLED INPUTS
  const [ warehouseName, setWarehouseName ] = useState('')
  const [ warehouseNameError, setWarehouseNameError ] = useState(false)
  const [ streetAddress, setStreetAddress ] = useState('')
  const [ streetAddressError, setStreetAddressError ] = useState(false)
  const [ city, setCity ] = useState('')
  const [ cityError, setCityError ] = useState(false)
  const [ country, setCountry ] = useState('')
  const [ countryError, setCountryError ] = useState(false)

  const [ contactName, setContactName ] = useState('')
  const [ contactNameError, setContactNameError ] = useState(false)
  const [ position, setPosition ] = useState('')
  const [ positionError, setPositionError ] = useState(false)
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ phoneNumberError, setPhoneNumberError ] = useState(false)
  const [ email, setEmail ] = useState('')
  const [ emailError, setEmailError ] = useState(false)

  const [ inventoryError, setInventoryError ] = useState(false)
  const [ formError, setFormError ] = useState (false)
  const [ formErrorMessage, setFormErrorMessage ] = useState ('')
  const [ responseData, setResponseData ] = useState(null)

  useEffect(() => {
    if (pathEdit) {
      getSingleWarehouse(warehouseId).then((response) => {
        setResponseData(response.data)
        setWarehouseName(response.data.name);
        setStreetAddress(response.data.address);
        setCity(response.data.city);
        setCountry(response.data.country);
        setContactName(response.data.contact.name);
        setPosition(response.data.contact.position);
        setPhoneNumber(unformatNumber(response.data.contact.phone));
        setEmail(response.data.contact.email);
      }).catch((error) => {
        console.log(error)
        setInventoryError(true)
      })
    }
  },[ pathAdd, pathEdit, warehouseId ])

  // RESET ERROR STATES
  const resetFormError = () => {
    setWarehouseNameError(false);
    setStreetAddressError(false);
    setCityError(false);
    setCountryError(false);
    setContactNameError(false);
    setPositionError(false);
    setPhoneNumberError(false);
    setEmailError(false);
  }

  const handleOnChangeWarehouseName = (event) => {
    setFormError(false)
    setWarehouseName(event.target.value)
  }
  const handleOnChangeStreetAddress = (event) => {
    setFormError(false)
    setStreetAddress(event.target.value)
  }
  const handleOnChangeCity = (event) => {
    setFormError(false)
    setCity(event.target.value)
  }
  const handleOnChangeCountry = (event) => {
    setFormError(false)
    setCountry(event.target.value)
  }
  
  const handleOnChangeContactName = (event) => {
    setFormError(false)
    setContactName(event.target.value)
  }
  const handleOnChangePosition = (event) => {
    setFormError(false)
    setPosition(event.target.value)
  }
  const handleOnChangePhoneNumber = (event) => {
    setFormError(false)
    setPhoneNumber(event.target.value)
  }
  const handleOnChangeEmail = (event) => {
    setFormError(false)
    setEmail(event.target.value)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  // FORM SUBMIT
  const handleSubmit = (event) => {

    event.preventDefault()
    resetFormError()

    // SETTIGN ERROR STATES IF EMPTY FIELD
    if(!warehouseName || !streetAddress || !city || !country || !contactName || !position || !phoneNumber || !email) {
      if(!email) {setEmailError(true); event.target.email.focus()}
      if(!phoneNumber) {setPhoneNumberError(true); event.target.phoneNumber.focus()}
      if(!position) {setPositionError(true); event.target.position.focus()}
      if(!contactName) {setContactNameError(true); event.target.contactName.focus()}
      if(!country) {setCountryError(true); event.target.country.focus()}
      if(!city) {setCityError(true); event.target.city.focus()}
      if(!streetAddress) {setStreetAddressError(true); event.target.streetAddress.focus()}
      if(!warehouseName) {setWarehouseNameError(true); event.target.warehouseName.focus()}
      return
    }

    if (pathAdd) {
      const newWarehouse = {
        name: warehouseName,
        address: streetAddress,
        city: city,
        country: country,
        contact: {
          name: contactName,
          position: position,
          phone: formatNumber(phoneNumber),
          email: email
        }
      }
      
      // POST /warehouse
      POSTwarehouse(newWarehouse).then(() => {
        navigate("/warehouses")
      }).catch((error) => {
        console.log(error)
      })
    }

    if (pathEdit) {
      const editedWarehouse = {
        name: warehouseName,
        address: streetAddress,
        city: city,
        country: country,
        contact: {
          name: contactName,
          position: position,
          phone: formatNumber(phoneNumber),
          email: email
        }
      }

      // PUT /warehouse/warehouseId
      PUTwarehouse(warehouseId, editedWarehouse).then(() => {
        navigate(-1)
      }).catch((error) => {
        console.log(error.response.data)
        setFormErrorMessage(error.response.data)
        setFormError(true)
      })
    }
  }

  // ERROR CHECK
  if (inventoryError) {
    return (
      <div className='warehouse-form__failed'>
        <h1>Failed to load edit form</h1>
      </div>
    )
  }
  if (pathEdit && !responseData) {
    return (
      <div className='warehouse-form__loading'>
        <h1>... Loading ...</h1>
      </div>
    )
  }

  return (
    <form className='warehouse-form' onSubmit={handleSubmit}>
      <div className='warehouse-form__container'>
        <div className='warehouse-form__warehouse'>
          <h2 className='warehouse-form__warehouse-title'>Warehouse Details</h2>
          <label className='h3' htmlFor='warehouseName'>Warehouse Name</label>
          <input className={`warehouse-form__warehouse-name p2 ${warehouseNameError && 'warehouse-form--input-error'}`} id='warehouseName' type='text' name='warehouseName' placeholder='Warehouse Name' value={warehouseName} onChange={handleOnChangeWarehouseName} />
          {warehouseNameError && <InputError />}
          <label className='h3' htmlFor='streetAddress'> Street Address </label>
          <input className={`warehouse-form__street p2 ${streetAddressError && 'warehouse-form--input-error'}`} id='streetAddress' type='text' name='streetAddress' placeholder='Street Address' value={streetAddress} onChange={handleOnChangeStreetAddress} />
          {streetAddressError && <InputError />}
          <label className='h3' htmlFor='city'> City </label>
          <input className={`warehouse-form__city p2 ${cityError && 'warehouse-form--input-error'}`} id='city' type='text' name='city' placeholder='City' value={city} onChange={handleOnChangeCity} />
          {cityError && <InputError />}
          <label className='h3' htmlFor='country'> Country </label>
          <input className={`warehouse-form__country p2 ${countryError && 'warehouse-form--input-error'}`} id='country' type='text' name='country' placeholder='Country' value={country} onChange={handleOnChangeCountry} />
          {countryError && <InputError />}
        </div>
        <div className='warehouse-form__details'>
          <h2 className='warehouse-form__details-title'>Contact Details</h2>
          <label className='h3' htmlFor='contactName'> Contact Name </label>
          <input className={`warehouse-form__contact-name p2 ${contactNameError && 'warehouse-form--input-error'}`} id='contactName' type='text' name='contactName' placeholder='Contact Name' value={contactName} onChange={handleOnChangeContactName} />
          {contactNameError && <InputError />}
          <label className='h3' htmlFor='position'> Position </label>
          <input className={`warehouse-form__position p2 ${positionError && 'warehouse-form--input-error'}`} id='position' type='text' name='position' placeholder='Position' value={position} onChange={handleOnChangePosition} />
          {positionError && <InputError />}
          <label className='h3' htmlFor='phoneNumber'> Phone Number </label>
          <input className={`warehouse-form__phone-number p2 ${phoneNumberError && 'warehouse-form--input-error'}`} id='phoneNumber' name='phoneNumber' placeholder='Phone Number' value={phoneNumber} onChange={handleOnChangePhoneNumber} />
          {phoneNumberError && <InputError />}
          <label className='h3' htmlFor='email'> Email </label>
          <input className={`warehouse-form__email p2 ${emailError && 'warehouse-form--input-error'}`} id='email' type='email' name='email' placeholder='Email' value={email} onChange={handleOnChangeEmail} />
          {emailError && <InputError />}
        </div>
      </div>
      {formError && <div className='warehouse-form__form-error'><h2>{formErrorMessage}</h2></div>}
      <div className='warehouse-form__buttons'>
        {pathAdd && <Link className='warehouse-form__cancel h3' to='/warehouses'>Cancel</Link>}
        {pathEdit && <div className='warehouse-form__cancel h3' onClick={handleCancel}>Cancel</div>}
        {pathAdd && <button className='warehouse-form__submit'>+ Add Warehouse</button>}
        {pathEdit && <button className='warehouse-form__submit'>Save</button>}
      </div>
    </form>
  )
}

export default WarehouseForm;
