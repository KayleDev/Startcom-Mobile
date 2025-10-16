import { useState } from "react"

import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import BackButton from "../../../components/BackButton"

import { styles } from "./styles"

const ChangePassword = () => {
    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRedirect = () => {
        if (!password || !confirmPassword) {
            Alert.alert("Erro", "Preencha os campos de senha!");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas inseridas devem ser iguais!");
            return;
        }
                
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButton/>
            <Text style={styles.title}>Redefinir senha!</Text>
            <Text style={styles.description}>Escolha uma nova senha e confirme para recuperar o acesso à sua conta.</Text>
            
            <View style={styles.actions}>
                <Input 
                    label="Senha" 
                    placeholder="••••••••••••••••"
                    secureTextEntry={true}
                    value={password} 
                    onChangeText={setPassword} 
                />

                <Input 
                    label="Confirmar senha" 
                    placeholder="••••••••••••••••"
                    secureTextEntry={true}
                    value={confirmPassword} 
                    onChangeText={setConfirmPassword} 
                />

                <Button         
                    title="Redefinir" 
                    onPress={handleRedirect} 
                    style={{marginVertical: 0}}
                />
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword