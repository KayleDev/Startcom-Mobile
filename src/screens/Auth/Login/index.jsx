import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import Input from "../../../components/Input/"
import axios from 'axios';

import { styles } from "./styles";

import GoogleLogo from '../../../assets/icons/GoogleLogo.png';
import AppleLogo from '../../../assets/icons/AppleLogo.png';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://my-backend.com/login', {
        email,
        password
      });

      const data = response.data;

      if (data.success) {
        Alert.alert("Sucesso", "Login realizado!");
        console.log("Token do usuário:", data.token);
        // ex: navigation.navigate("Home");
      } else {
        Alert.alert("Erro", data.message || "Login falhou");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <Input 
        label="E-mail" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />
      <Input 
        label="Senha" 
        secureTextEntry={true}
        value={password} 
        onChangeText={setPassword} 
      />

      <View style={styles.loginWithContainer}>
        <TouchableOpacity style={styles.loginWithButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Image source={GoogleLogo} style={{ width: 24, height: 24 }} />
            <Text style={styles.loginWithText}>Entrar com Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginWithButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Image source={AppleLogo} style={{ width: 24, height: 24 }} />
            <Text style={styles.loginWithText}>Entrar com Apple</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Carregando..." : "Login"}</Text>
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

export default Login;
