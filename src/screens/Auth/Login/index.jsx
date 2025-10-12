import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../../components/Button';
import Input from "../../../components/Input/";
import axios from 'axios';

import { styles } from "./styles";

import GoogleLogo from '../../../assets/icons/GoogleLogo.png';
import AppleLogo from '../../../assets/icons/AppleLogo.png';
import Logo from '../../../assets/StartComLogo.png';

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
      const response = await axios.post('http://my-backend.com/login', { email, password });
      const data = response.data;

      const dataMock = true;

      // if (data.success) {
      if (dataMock) {
        Alert.alert("Sucesso", "Login realizado!");
        // console.log("Token do usuário:", data.token);
        console.log("Token do usuário:", "mocked-jwt-token");
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Erro", data.message || "Login falhou");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
      style={styles.logoImage}
      source={Logo}
      />

      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>Bem-vindo(a) de volta</Text>

      <Input 
        label="E-mail" 
        keyboardType="email-address" 
        placeholder="Digite o seu e-mail"
        value={email} 
        onChangeText={setEmail} 
      />
      <Input 
        label="Senha" 
        placeholder="Digite a sua senha"
        secureTextEntry={true}
        value={password} 
        onChangeText={setPassword} 
      />

      <View style={styles.loginOrWith}>
        <View style={styles.lineLoginWith}></View>
        <Text style={styles.textLineLoginWith}>Ou</Text>
        <View style={styles.lineLoginWith}></View>
      </View>

      <View style={styles.loginWithContainer}>
        <TouchableOpacity style={styles.loginWithButton}>
          <Image source={GoogleLogo} style={styles.loginWithImage} />
          <Text style={styles.loginWithText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginWithButton}>
          <Image source={AppleLogo} style={styles.loginWithImage} />
          <Text style={styles.loginWithText}>Entrar com Apple</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Login" 
        onPress={handleLogin} 
        loading={loading} 
      />

      <View style={styles.keepConnectedContainer}>
        <TouchableOpacity
          onPress={() => setChecked(!checked)}
          style={styles.checkbox}
        >
          {checked && <MaterialIcons name="check" size={14} color="globalStyle.primary" />}
        </TouchableOpacity>

        <Text style={styles.keepConnectedText}>Manter-me conectado por 30 dias</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>
          Não tem uma conta? {""}
          <Text style={{ fontWeight: "bold" }}>
            Cadastre-se agora
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
