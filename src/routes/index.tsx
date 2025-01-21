import React, { useContext } from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const Routes = () => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F5f7fb",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={60} color="" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
