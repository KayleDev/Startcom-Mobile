import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

const Register = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <View>
        <TextInput
            placeholder="E-mail"
            style={styles.input}
            keyboardType="email-address"
        />

        <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry
        />
      </View>

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>
          Não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register