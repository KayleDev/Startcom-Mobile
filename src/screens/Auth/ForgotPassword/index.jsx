import { Text, View, Alert } from "react-native"
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Button from '../../../components/Button';
import Input from "../../../components/Input/";
import BackButton from "../../../components/BackButton";

import { styles } from "./styles";

import AccessibleView from "../../../components/AccessibleView";

const ForgotPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleRedirect = () => {
        if (!email) {
            Alert.alert("Erro", "Preencha o campo de e-mail para o recebimento do código!");
            return;
        }
        
        navigation.navigate('ForgotPasswordCode')
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButton/>
            <Text style={styles.title}>Redefinição de senha</Text>
            <Text style={styles.description}>Informe um e-mail e enviaremos um código para recuperação de sua senha.</Text>

            <AccessibleView style={styles.actions}>
                <Input 
                    label='E-mail'              
                    keyboardType="email-address" 
                    placeholder="exemplo@gmail.com"
                    value={email} 
                    onChangeText={setEmail}
                />

                <Button         
                    title="Enviar" 
                    onPress={handleRedirect} 
                    style={{marginVertical: 0}}
                />
            </AccessibleView>
        </SafeAreaView>
    )
}

export default ForgotPassword