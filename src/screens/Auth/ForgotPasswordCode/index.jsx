import { Text, View, Alert } from "react-native"
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Button from '../../../components/Button';
import BackButton from "../../../components/BackButton";
import CodeVerificator from "../../../components/CodeVerificator";

import { styles } from "./styles";

import AccessibleView from "../../../components/AccessibleView";

const ForgotPasswordCode = () => {
    const navigation = useNavigation();
    const [verifiedCode, setVerifiedCode] = useState('');

    const handleCodeComplete = (fullCode) => {
        setVerifiedCode(fullCode);
        // Back-end validation is here. - Caio
        navigation.navigate('ChangePassword');
    }

    const handleRedirect = () => {
        if (!verifiedCode || verifiedCode.length !== 6) {
            Alert.alert("Erro", "Por favor, insira os 6 dígitos do código!");
            return;
        }
        navigation.navigate('ChangePassword')
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButton/>
            <Text style={styles.title}>Redefinição de senha</Text>
            <Text style={styles.description}>Insira o código enviado por e-mail.</Text>

            <AccessibleView style={styles.actions}>
                <CodeVerificator onCodeComplete={handleCodeComplete}/>
                <Button         
                    title="Enviar" 
                    onPress={handleRedirect} 
                    style={{marginVertical: 0}}
                />
            </AccessibleView>
        </SafeAreaView>
    )
}

export default ForgotPasswordCode