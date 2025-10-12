import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

import axios from 'axios';
import { Alert } from "react-native";

import Input from "../../../components/Input";
import { useState } from "react";
import Button from "../../../components/Button";
import DatePickerInput from "../../../components/DateTimePicker";
import CPFCNPJToggle from "../../../components/CPFCNPJToggle";

import { formatCPF, formatCNPJ, formatPHONE } from "../../../utils/masks";

const Register = () => {
  const navigation = useNavigation();

  const handleRegister = async () => {
  if (!name || !phone || !date || !document || !email || !password || !confirmPassword) {
    Alert.alert("Erro", "Preencha todos os campos!");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Erro", "As senhas não coincidem!");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post('http://my-backend.com/register', { 
      name,
      phone,
      birthDate: date.toLocaleDateString('pt-BR'),
      document,
      email,
      password
    });
    
    const data = response.data;

    if (data.success) {
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      console.log("Token do usuário:", data.token);
      navigation.navigate("Login");
    } else {
      Alert.alert("Erro", data.message || "Cadastro falhou");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Não foi possível conectar ao servidor");
  } finally {
    setLoading(false);
  }
};

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Input 
        label="Nome" 
        placeholder="Caio Souza"
        value={name} 
        onChangeText={setName} 
      />

      <View style={styles.inputBlock}>
        <DatePickerInput label={"Data de nascimento"} date={date} setDate={setDate} />

        <Input
          label="Telefone"
          placeholder="(13) 99999-9999"
          keyboardType="numeric"
          formatPHONE={formatPHONE}
          value={phone}
          onChangeText={setPhone}
          style={{ width: '49%', marginBottom: 0 }}
          maxLength={15}
        />
      </View>

      <CPFCNPJToggle 
        onChangeText={setDocument}
        value={document}
        formatCPF={formatCPF}
        formatCNPJ={formatCNPJ}
      />

      <Input 
        label="E-mail" 
        keyboardType="email-address" 
        placeholder="email@gmail.com"
        value={email} 
        onChangeText={setEmail} 
      />

      <View style={styles.inputBlock}>
        <Input 
          label="Senha" 
          placeholder="••••••••••••••••"
          secureTextEntry={true}
          value={password} 
          onChangeText={setPassword} 
          style={{ width: '49%', marginBottom: 0 }}
        />

        <Input 
          label="Confirmar senha" 
          placeholder="••••••••••••••••"
          secureTextEntry={true}
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
          style={{ width: '49%', marginBottom: 0 }}
        />
      </View>

      <Button
        title="Cadastrar" 
        onPress={handleRegister} 
        loading={loading} 
      />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>
          Já tem uma conta? {""}
          <Text style={{ fontWeight: "bold" }}>
            Faça login
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register