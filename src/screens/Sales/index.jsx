import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';

const Sales = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Vendas"
      />

      <View style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>
          Vendas
        </Text>
            
        <Text style={commonUserStyles.screenDescription}>
          Gerencie todas as suas vendas e transações
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

export default Sales;