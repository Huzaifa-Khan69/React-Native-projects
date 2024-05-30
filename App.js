import { View, Text } from 'react-native'
import React from 'react'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import Navigation from './src/routes/Navigation'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/Store'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
  //  <SignUp/>
  // <Login/>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <Navigation/>
  </PersistGate>
  </Provider>
  )
}

export default App