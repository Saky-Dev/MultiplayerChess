import InputText from '../../components/input_text'
import InputSubmit from '../../components/input_submit'
import './index.sass'

const Home = () => {
  const handleSubmitUserData = e => {
    const data = Object.fromEntries(new FormData(e.target))

    e.preventDefault()
    console.log(JSON.stringify(data))
  }

  return (
    <main className='home'>
      <form id='user-data' onSubmit={handleSubmitUserData}>
        <InputText value='username' text='Username' />
        <InputSubmit value='Set my username' />
      </form>
    </main>
  )
}

export default Home
