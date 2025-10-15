import React, { useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Save, Building, Bell } from 'lucide-react-native';

import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CPFCNPJToggle from '../../components/CPFCNPJToggle';
import NotificationItem from '../../components/NotificationItem';
import { formatCPF, formatCNPJ } from "../../utils/masks";
import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles';
import { globalStyle } from '../../styles/globalStyle';

const Settings = () => {
  const [businessName, setBusinessName] = useState("Minha Empresa");
  const [document, setDocument] = useState("00.000.000-00");
  const [email, setEmail] = useState("contato@minhaempresa.com");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [address, setAddress] = useState("Rua Exemplo, 123, São Paulo - SP");
  const [loading, setLoading] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const handleChanges = async () => {
    if (!businessName || !email || !phone || !address || !document) {
      Alert.alert("Erro", "Nenhum campo pode estar vázio");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://my-backend.com/update-profile', {
        businessName,
        document,
        email,
        phone,
        address,
      });

      const data = response.data;

      if (data.success) {
        Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
        console.log("Perfil atualizado:", data);
      } else {
        Alert.alert("Erro", data.message || "Não foi possível atualizar as informações");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Clientes"
      />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>Configurações</Text>
        <Text style={commonUserStyles.screenDescription}>
          Gerencie as preferências da sua conta e notificações
        </Text>

        <View style={styles.settingContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <Building size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Perfil da Empresa</Text>
          </View>

          <Input 
            label="Nome da Empresa" 
            placeholder="Minha Empresa"
            value={businessName} 
            onChangeText={setBusinessName} 
          />

          <Input 
            label="E-mail" 
            keyboardType="email-address" 
            placeholder="email@gmail.com"
            value={email} 
            onChangeText={setEmail} 
          />

          <Input 
            label="Telefone" 
            placeholder="(13) 99999-9999"
            value={phone} 
            onChangeText={setPhone} 
          />

          <Input 
            label="Endereço" 
            placeholder="Rua Exemplo, 123"
            value={address} 
            onChangeText={setAddress} 
          />

          <CPFCNPJToggle 
            onChangeText={setDocument}
            value={document}
            formatCPF={formatCPF}
            formatCNPJ={formatCNPJ}
          />
          
          <Button
            title={
              <View style={commonUserStyles.alignButtonText}>
                <Save size={20} color="#FFFFFF" />
                <Text style={commonUserStyles.saveText}>Salvar Alterações</Text>
              </View>
            }
            onPress={handleChanges}
            loading={loading}
          />
        </View>

        
        <View style={styles.notificationContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <Bell size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Notificações</Text>
          </View>

          <NotificationItem 
            title="Estoque Baixo" 
            description="Receber alerta quando um produto atingir o estoque mínimo."
            defaultValue={true}
            onToggle={(value) => console.log('Toggle:', value)}
          />
          
          <NotificationItem 
            title="Novas Vendas" 
            description="Receber notificação a cada nova venda concluída."
            defaultValue={true}
            onToggle={(value) => console.log('Toggle:', value)}
          />

          <NotificationItem 
            title="Relatórios Semanais" 
            description="Receber um resumo do desempenho da semana por e-mail."
            defaultValue={false}
            onToggle={(value) => console.log('Toggle:', value)}
          />
          
          <NotificationItem 
            title="Lembretes de Tarefas" 
            description="Ser lembrado de tarefas pendentes e agendadas."
            defaultValue={true}
            onToggle={(value) => console.log('Toggle:', value)}
          />
        </View>
      </ScrollView>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navigation={navigation}
        currentRoute={route.name}
      />
    </SafeAreaView>
  );
};

export default Settings;
