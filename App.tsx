import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Routes from './src/routes'
import { AuthProvider } from './src/contexts/AuthContext'

const App = () => {
  
  return (
   <NavigationContainer>
    <AuthProvider>
   <StatusBar backgroundColor='#ffb7c1' translucent={false} />
   <Routes/>
   </AuthProvider>
   </NavigationContainer>
  )
}

export default App;
