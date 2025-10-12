import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Dashboard"
      />

      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Bem-vindo ao Dashboard
        </Text>
        <Text style={{ marginTop: 10, color: '#666' }}>
          Aqui você pode visualizar suas estatísticas
        </Text>
      </View>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navigation={navigation}
        currentRoute={route.name}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
