import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

import { Alert } from "react-native";
import { registerAPI } from "../../../services/api";

import Input from "../../../components/Input";
import { useState } from "react";
import Button from "../../../components/Button";
import DatePickerInput from "../../../components/DateTimePicker";
import CPFCNPJToggle from "../../../components/CPFCNPJToggle";

import { formatCPF, formatCNPJ, formatPHONE } from "../../../utils/masks";

import AccessibleView from "../../../components/AccessibleView";

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
      let payload = {
        name,
        email,
        password,
        date,
        telefone: phone,
      };

      if (document.replace(/\D/g, "").length <= 11) {
        payload.cpf = document;
      } else {
        payload.cnpj = document;
      }

      const response = await registerAPI(payload);

      Alert.alert("Sucesso", "Cadastro realizado!");
      navigation.navigate("Login");
      
    } catch (error) {
      console.log(error?.response?.data || error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro");
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
    <AccessibleView style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Input 
        label="Nome" 
        placeholder="Caio Souza"
        value={name} 
        onChangeText={setName} 
      />

      <AccessibleView style={styles.inputBlock}>
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
      </AccessibleView>

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

      <AccessibleView style={styles.inputBlock}>
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
      </AccessibleView>

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
    </AccessibleView>
  )
}

export default Register