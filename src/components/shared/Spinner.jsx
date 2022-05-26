import spinner from '../assets/spinner.gif'

function Spinner() {
  return (
    // <div className='spinner'>
    <img
      src={spinner}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
    />
    // </div>
  )
}
export default Spinner
