import './InputError.scss'
import errorIcon from '../../assets/icons/error-24px.svg'

function InputError() { 
  return (
    <div className='input-error'>
      <img src={errorIcon} className='input-error__icon' alt='error'></img><span className='input-error__message p3'>This field is required</span>
    </div>
  )
}

export default InputError;