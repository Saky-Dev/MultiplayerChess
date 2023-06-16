import { useEffect } from 'react'
import { db } from '../../modules/firebase'
import { Timestamp, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import * as PE from '../../global/scripts/errors'
import Home from './pages/home'

const hoursToMillis = hours => (hours * 60 * 60 * 1000)

const App = () => {
  useEffect(() => {
    const less24 = Timestamp.fromMillis(Timestamp.now().toMillis() - hoursToMillis(24))
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

  return (
    <>
      <Home />
    </>
  )
}

export default App
