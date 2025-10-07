import { useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import Input from "../../../components/Input/"

import { styles } from "./styles";

const Login = () => {

  const [checked, setChecked] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <Input label="E-mail" keyboardType="email-address"/>
      <Input label="Senha" secureTextEntry/>

      <View style={styles.loginWithContainer}>
        <TouchableOpacity style={styles.loginWithButton}>
            <Text style={styles.loginWithText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginWithButton}>
            <Text style={styles.loginWithText}>Entrar com Apple</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, alignSelf: "flex-start" }}>
        <TouchableOpacity
            onPress={() => setChecked(!checked)}
            style={{
            width: 16,
            height: 16,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            }}
        >
            {checked && <MaterialIcons name="check" size={12} color="#007bff" />}
        </TouchableOpacity>

        <Text style={{ marginLeft: 8 }}>Manter-me conectado por 30 dias</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>
          Não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login