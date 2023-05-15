import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBke_yn5vccofqrRNjpgi3Ov_4vB4U06og',
  authDomain: 'multiplayerchess-bf143.firebaseapp.com',
  projectId: 'multiplayerchess-bf143',
  storageBucket: 'multiplayerchess-bf143.appspot.com',
  messagingSenderId: '911586901600',
  appId: '1:911586901600:web:ff499f2e05c7715c4a8d05'
}

const app = initializeApp(firebaseConfig)

export { app }
