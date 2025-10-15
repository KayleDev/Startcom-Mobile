import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';

import { Plus, Box, TrendingDown, TriangleAlert, Package } from "lucide-react-native"

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import { globalStyle } from '../../styles/globalStyle.js';

const Inventory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const handleInventory = () => {
    console.log("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  }

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Clientes"
      />
      
      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>
          Estoque
        </Text>

        <Text style={commonUserStyles.screenDescription}>
          Controle completo do seu inventário
        </Text>

        <Button
          title={
            <View style={commonUserStyles.alignButtonText}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={commonUserStyles.saveText}>Novo Produto</Text>
            </View>
          }
          onPress={handleInventory}
        />

        <View style={styles.productContainer}>
          <ProductCard
            title="Total de Produtos"
            value={4}
            icon={<Box color={globalStyle.primary}/>}
            color={globalStyle.primary}
          />

          <ProductCard
            title="Estoque Baixo"
            value={2}
            icon={<TrendingDown color="#CA8A04"/>}
            color="#CA8A04"
            extra="Atenção necessária"
          />

          <ProductCard
            title="Crítico"
            value={0}
            icon={<TriangleAlert color="#DC2626"/>}
            color="#dc2626"
            extra="Reposição urgente"
          />

          <ProductCard
            title="Valor Total"
            value="R$ 11202.20"
            icon={<Package color={globalStyle.primary}/>}
            color={globalStyle.primary}
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

export default Inventory;