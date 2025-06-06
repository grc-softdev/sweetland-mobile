import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Feather } from '@expo/vector-icons'

type ItemProps = {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (item_id: string) => void
}

const ListItem = ({ data, deleteItem }: ItemProps) => {

    const handleDeleteItem = () => {
        deleteItem(data.id)
    }

return (
    <View style={styles.container}>
       <Text style={styles.item}>{data.amount} - {data.name}</Text>
    <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name="trash-2" color='#FFF' size={23} />
    </TouchableOpacity>
    </View>
)
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#a01580',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#8a8a'
    },
    item:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: '#FFF'
    }
}) 

export default ListItem