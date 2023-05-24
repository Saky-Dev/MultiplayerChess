import { useState, useEffect } from 'react'
import { db } from '../../modules/firebase'
import { Timestamp, collection, query, where, getDocs, deleteDoc, addDoc } from 'firebase/firestore'
import * as PE from '../../global/scripts/errors'
import InputText from '../../components/input_text'
import InputSubmit from '../../components/input_submit'
import './index.sass'

const messages = {
  MAX_LENGTH: 'Username is out of range max length is 16 characters',
  INVALID_CHARACTERS: 'Invalid username only use letters, numbers and underscore',
  ALREADY_EXISTS: 'Username already was register'
}

Object.freeze(messages)

const hoursToMillis = hours => (hours * 60 * 60 * 1000)

const Home = () => {
  const [username, setUsername] = useState('')
  const [isUserValid, setUserValid] = useState(false)
  const [created, setCreated] = useState(Timestamp.now().toMillis())

  useEffect(() => {
    const less24 = Timestamp.fromMillis(created - hoursToMillis(24))
    const usersRef = collection(db, 'Users')
    const queryRes = query(usersRef, where('created', '<', less24.toMillis()))

    getDocs(queryRes)
      .then(querySnap => {
        querySnap.forEach(document => {
          deleteDoc(document.ref)
            .catch(err => { throw new PE.FirebaseError(err) })
        })
      })
      .catch(err => { throw new PE.FirebaseError(err) })
  })

  const handleSubmitUserData = e => {
    e.preventDefault()

    if (username.length > 16) {
      throw new PE.ValidationError(messages.MAX_LENGTH)
    }

    if (!/^[A-Za-z0-9_]*$/.test(username)) {
      throw new PE.ValidationError(messages.INVALID_CHARACTERS)
    }

    setCreated(Timestamp.now().toMillis())

    const userData = { username, created }
    const usersRef = collection(db, 'Users')
    const queryRef = query(usersRef, where('username', '==', username))

    getDocs(queryRef)
      .then(querySnap => {
        if (querySnap.size > 0) {
          throw new PE.RegisterError(messages.ALREADY_EXISTS)
        }

        addDoc(usersRef, userData)
          .then(docRef => {
            if (docRef.id) {
              const expDate = new Date()
              expDate.setTime(created + hoursToMillis(3))

              document.cookie = `username=${username};expires=${expDate.toUTCString()};path=/`

              setUserValid(true)
            }
          })
          .catch(err => { throw new PE.FirebaseError(err) })
      })
      .catch(err => { throw new PE.FirebaseError(err) })
  }

  const registerForm = (
    <form id='user-data' onSubmit={handleSubmitUserData}>
      <InputText value='username' text='Username' updateValue={setUsername} />
      <InputSubmit value='Set my username' />
    </form>
  )

  const gameList = (
    <div />
  )

  return (
    <main className='home'>
      {isUserValid ? gameList : registerForm}
    </main>
  )
}

export default Home
