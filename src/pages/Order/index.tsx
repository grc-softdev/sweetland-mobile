import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import ModalPicker from "../../component/ModalPicker";
import ListItem from "../../component/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetailParams = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

type ProductProps = {
  id: string;
  name: string;
};

export type CategoryProps = {
  id: string;
  name: string;
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export const Order = () => {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<
    ProductProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("1");

  const [items, setItems] = useState<ItemProps[] | []>([]);
  useEffect(() => {
    const loadInfo = async () => {
      const response = await api.get("/category");
      setCategory(response.data);
      setCategorySelected(response.data[0]);
    };
    loadInfo();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelected?.id,
        },
      });
      setProducts(response.data);
      setProductSelected(response.data[0]);
    };
    loadProduct();
  }, [categorySelected]);

  const handleCloseOrder = async () => {
    const orderId = route.params?.order_id;

    if (!orderId) {
      console.log("Order ID is undefined!");
      return;
    }

    try {
      await api.delete("/order", {
        params: { order_id: orderId },
      });

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeCategory = (item: CategoryProps) => {
    setCategorySelected(item);
  };

  const handleChangeProduct = (item: ProductProps) => {
    setProductSelected(item);
  };

  const handleAddItem = async () => {
    const response = await api.post("/order/add", {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: Number(amount),
    });

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount,
    };
    setItems((oldArray) => [...oldArray, data]);
  };

  const handleDeleteItem = async(item_id: string) => {
    await api.delete("/order/remove", {
      params: {
        item_id: item_id
      }
    })
    // após remover da api removemos o item da lista
    let removeItem = items.filter(item => {
        return ( item.id !== item_id)
    })
    setItems(removeItem)
  }

  const handleFinishOrder = () => {
    navigation.navigate("FinishOrder", { number: route.params?.number, order_id: route.params?.order_id})
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Table {route.params.number}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#FF3F4b" />
          </TouchableOpacity>
        )}
      </View>

      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#4e2806" }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={{ color: "#4e2806" }}>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantity</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholder="1"
          placeholderTextColor="#4e2806"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem}/>}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E9EC",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4e2806",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#E8F0FE",
    borderRadius: 4,
    width: "100%",
    height: 40,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#4e2806",
    fontSize: 20,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4e2806",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#03a3d8",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#03a3d8",
    borderRadius: 4,
    height: 40,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
});
