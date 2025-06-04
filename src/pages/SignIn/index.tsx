import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {
  const { singIn, loadingAuth } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if(email === '' || password === ''){
      return 
    }
    await singIn({ email, password })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/logo.png")}/>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="enter your email"
          style={styles.input}
          placeholderTextColor="#F0F0F0"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="enter your password"
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor="#4e2806"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          { loadingAuth ? (
            <ActivityIndicator size={25} color='#FFF'/>
          ) : (
            <Text style={styles.buttonText}>Enter</Text>)}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffb7c1",
  },
  logo: {
      width: 300,
      height: 300,
      marginBottom: 18,
      resizeMode: 'contain',
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#E8F0FE",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#4e2806",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#03a3d8",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});
