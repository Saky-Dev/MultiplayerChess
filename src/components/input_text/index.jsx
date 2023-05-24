import './index.sass'

const InputText = ({ value = 'undefined', text = 'undefined', updateValue = () => {} }) => (
  <div className='form-field'>
    <input type='text' name={value} id={value} onInput={e => updateValue(e.target.value)} required />
    <label htmlFor={value}>{text}</label>
  </div>
)

export default InputText
