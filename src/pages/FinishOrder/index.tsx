import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

type RouteDetailParams = {
    FinishOrder: {
        number: number | string;
        order_id: string;
      }
}

type FinishOrderRouteProps = RouteProp<RouteDetailParams,  'FinishOrder'>


const FinishOrder = () => {
    const route = useRoute<FinishOrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const handleFinish = async() => {
        try{
            await api.put('/order/send', {
                order_id: route.params?.order_id
            })
            navigation.popToTop()

        } catch(err){
            console.log('error to finish')
        }
    }
  return (
    <View style={styles.container}>
        <Text style={styles.alert}>
        Do you want finish your order? 
        </Text>
        <Text style={styles.title}>
        Table {route.params?.number}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.textButton}>
                Finish Order
            </Text>
            <Feather name='shopping-cart' size={20} color='#FFF'/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F7E9EC',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert:{
        fontSize: 20,
        color: '#4e2806',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4e2806',
        marginBottom: 12
    },
    button:{
        backgroundColor: '#03a3d8',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',   
        borderRadius: 4,
    },
    textButton:{
        fontSize: 18,
        marginRight: 18,
        fontWeight: 'bold',
        color: '#FFF'
    }
})

export default FinishOrder