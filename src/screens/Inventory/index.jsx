import React, { useState, useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import Input from '../../components/Input';
import StatusFilter from '../../components/StatusFilter';
import ProductsInfo from '../../components/ProductsInfo';

import { Plus, Box, TrendingDown, TriangleAlert, Package } from "lucide-react-native"

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import { globalStyle } from '../../styles/globalStyle.js';

import AccessibleView from '../../components/AccessibleView';

const Inventory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(['Roupas', 'Calçados', 'Acessórios', 'Eletrônicos'])
  const [status, setStatus] = useState(['Normal', 'Baixo', 'Crítico', 'Esgotado'])

  const allProducts = [
    { id: '#001', product: 'Camiseta Premium', code: 'CAM001', category: 'Roupas', amount: '45', min: '10', price: 'R$ 59.99', status: 'Normal', totalValue: 'R$ 2695.59' },
    { id: '#002', product: 'Tênis Esportivo', code: 'TEN001', category: 'Calçados', amount: '8', min: '15', price: 'R$ 189.99', status: 'Baixo', totalValue: 'R$ 1519.29' },
    { id: '#003', product: 'Relógio Digital', code: 'MOC001', category: 'Acessórios', amount: '1', min: '5', price: 'R$ 129.99', status: 'Crítico', totalValue: 'R$ 389.79' },
    { id: '#004', product: 'Mochila Executiva', code: 'REL001', category: 'Eletrônicos', amount: '0', min: '10', price: 'R$ 299.99', status: 'Esgotado', totalValue: 'R$ 6597.89' },
  ];
  
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];
    
    if (category.length > 0) {
      filtered = filtered.filter(product => 
        category.includes(product.category)
      );
    } else {
      return [];
    }
    
    if (status.length > 0) {
      filtered = filtered.filter(product => 
        status.includes(product.status)
      );
    } else {
      return [];
    }
  
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.product.toLowerCase().includes(searchLower) ||
        product.code.toLowerCase().includes(searchLower) ||
        product.id.toLowerCase().includes(searchLower)
      );
    }
  
    return filtered;
  }, [search, category, status]);
  

  const handleInventory = () => {
    console.log("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  }

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Estoque"
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

        <AccessibleView style={styles.productContainer}>
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
        </AccessibleView>
        
        <View style={commonUserStyles.filterContainer}>
          <Input 
            placeholder="Buscar produtos por nome, código..." 
            styleInput={commonUserStyles.inputVariant}
            onChangeText={setSearch}
            value={search}
          />

          <AccessibleView style={commonUserStyles.filters}>
            <StatusFilter
              title="Filtrar Categoria"
              filters={[
                { id: 1, label: 'Roupas' },
                { id: 2, label: 'Calçados' },
                { id: 3, label: 'Acessórios' },
                { id: 4, label: 'Eletrônicos' },
              ]}
              onFilterChange={setCategory}
              containerStyle={{width: "49%"}}
            />

            <StatusFilter
              title="Filtrar Status"
              filters={[
                { id: 1, label: 'Normal' },
                { id: 2, label: 'Baixo' },
                { id: 3, label: 'Crítico' },
                { id: 4, label: 'Esgotado' },
              ]}
              onFilterChange={setStatus}
              containerStyle={{width: "49%"}}
            />
          </AccessibleView>
        </View>

        <Text style={commonUserStyles.resultCount}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </Text>
        
        <ProductsInfo
          products={filteredProducts}
        />
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