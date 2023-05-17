import '../../global/styles/normalize.sass'
import './index.sass'

const InputText = ({ value = 'undefined', text = 'undefined' }) => (
  <div className='form-field'>
    <input type='text' name={value} id={value} required />
    <label htmlFor={value}>{text}</label>
  </div>
)

export default InputText
