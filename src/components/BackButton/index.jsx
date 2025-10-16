import { Text, TouchableOpacity } from "react-native"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { ChevronLeft } from 'lucide-react-native'
import { styles } from "./styles"
import { globalStyle } from "../../styles/globalStyle"

const BackButton = () => {
    const navigation = useNavigation();
    
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <ChevronLeft size={28} color={globalStyle.primary}/>
            <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
    )
}

export default BackButton