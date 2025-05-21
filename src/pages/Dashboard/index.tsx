import { useContext, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';


const Dashboard = () => {
  const { signOut } = useContext(AuthContext)
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
  const [number, setNumber] = useState('')

  const openOrder = async () => {
    if (number === '') {
      return
    }
    const response = await api.post('/order', {
      table: Number(number)
    })
    //console.log(response.data)
    
    navigation.navigate('Order', { number: number, order_id: response.data.id })
    setNumber('') 
  }


  return (
    <SafeAreaView style={styles.container}>
  <View style={styles.logoutContainer}>
    <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>

  <Text style={styles.title}>New Order</Text>

  <TextInput 
    placeholder='number' 
    placeholderTextColor='#F0F0F0'
    keyboardType='numeric'
    value={number}
    onChangeText={setNumber}
    style={styles.input}
  />
  
  <TouchableOpacity style={styles.button} onPress={openOrder}>
    <Text style={styles.buttonText}>Open Order</Text>
  </TouchableOpacity>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:15,
    backgroundColor: '#ffb7c1',
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4e2806',
    marginBottom: 24,
  },
  input:{
    width: '90%',
    height: 60,
    backgroundColor: '#E8F0FE',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#4e2806'
  },
  button:{
    width: '90%',
    height: 40,
    backgroundColor: '#03a3d8',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize:18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  logoutContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  logoutButton: {
    backgroundColor: '#4e2806',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
})

export default Dashboard;