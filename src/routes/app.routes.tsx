import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard/index";
import { Order } from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    number: number | string;
    order_id: string;
  };
  FinishOrder: {
    number: number | string;
    order_id: string;
  }
};

const Stack = createNativeStackNavigator<StackParamsList>();

const AppRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: "Finishing",
          headerStyle: {
            backgroundColor: "#ffb7c1",
          },
          headerTintColor: "#4e2806",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
