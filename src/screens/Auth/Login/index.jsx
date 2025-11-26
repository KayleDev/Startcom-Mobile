import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../../components/Button';
import Input from "../../../components/Input/";
import { useAuth } from "../../../contexts/AuthContext";
import { loginAPI } from '../../../services/api';

import { styles } from "./styles";

import GoogleLogo from '../../../assets/icons/GoogleLogo.png';
import AppleLogo from '../../../assets/icons/AppleLogo.png';
import Logo from '../../../assets/StartComLogo.png';

import AccessibleView from "../../../components/AccessibleView";

  const Login = () => {
    const navigation = useNavigation();
    const { signIn } = useAuth();

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
        const data = await loginAPI({ email, password });

        if (!data?.access_token) {
          Alert.alert("Erro", "Resposta do servidor inválida");
          return;
        }

        await signIn(
          {
            email: data.email,
            name: data.name,
            companyId: data.companyId,
          },
          data.access_token
        );

        Alert.alert("Sucesso", "Login realizado!");
      } catch (error) {
        Alert.alert("Erro", "Usuário ou senha inválidos");
      } finally {
        setLoading(false);
      }
    };


  return (
    <AccessibleView style={styles.container}>
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
      <TouchableOpacity style={styles.linkTextFinal} onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={[styles.linkText, {marginTop: 0}]}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>


      <View style={styles.loginOrWith}>
        <View style={styles.lineLoginWith}></View>
        <Text style={styles.textLineLoginWith}>Ou</Text>
        <View style={styles.lineLoginWith}></View>
      </View>

      <AccessibleView style={styles.loginWithContainer}>
        <TouchableOpacity style={styles.loginWithButton}>
          <Image source={GoogleLogo} style={styles.loginWithImage} />
          <Text style={styles.loginWithText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginWithButton}>
          <Image source={AppleLogo} style={styles.loginWithImage} />
          <Text style={styles.loginWithText}>Entrar com Apple</Text>
        </TouchableOpacity>
      </AccessibleView>

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
          {checked && <MaterialIcons name="check" size={14} color="#4db8a8" />}
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
    </AccessibleView>
  );
};

export default Login;