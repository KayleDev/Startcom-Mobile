import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Text} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { styles } from './styles';
import { commonUserStyles } from '../../../styles/commonUserStyles';

import Header from "../../../layout/Header";
import Sidebar from "../../../layout/Sidebar";
import Input from '../../../components/Input/';

const NewClient = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <SafeAreaView style={commonUserStyles.safeArea}>
            <Header 
                onMenuPress={() => setIsSidebarOpen(true)}
                title="Novo Cliente"
            />

            <ScrollView style={commonUserStyles.screenBlock}>

            </ScrollView>
                    
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                navigation={navigation}
                currentRoute={route.name}
            />
        </SafeAreaView>
    )
}

export default NewClient