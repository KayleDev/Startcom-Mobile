import React, { useEffect, useState, useMemo } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import Input from '../../components/Input';
import StatusFilter from '../../components/StatusFilter';
import ProductsInfo from '../../components/ProductsInfo';
import { formatCurrency } from '../../utils/masks.js';

import { Plus, Box, TrendingDown, TriangleAlert, Package } from "lucide-react-native"
import AccessibleView from '../../components/AccessibleView';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import { globalStyle } from '../../styles/globalStyle.js';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const CATEGORY_OPTIONS = [
  'Roupas', 'Calçados', 'Acessórios', 'Eletrônicos', 'Informática', 'Alimentos',
  'Bebidas', 'Móveis', 'Decoração', 'Livros', 'Brinquedos', 'Esportes', 'Beleza', 'Saúde',
  'Papelaria', 'Ferramentas', 'Autopeças', 'Pet Shop', 'Limpeza', 'Outros'
];

const STATUS_OPTIONS = [
  'Normal', 'Baixo', 'Crítico', 'Esgotado'
];

const Inventory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(CATEGORY_OPTIONS);
  const [statusFilter, setStatusFilter] = useState(STATUS_OPTIONS);
  const [products, setProducts] = useState([]);
  const [overview, setOverview] = useState({
    totalProducts: 0,
    lowInventory: 0,
    criticalInventory: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInventory = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const response = await api.post("/Company/inventory/overview");
      const data = response.data;
      console.log("First:" + data);

      if (!data || typeof data !== "object") throw new Error("Resposta inválida do servidor");

      setOverview({
        totalProducts: data.totalProducts,
        lowInventory: data.lowInventory,
        criticalInventory: data.criticalInventory,
        totalValue: data.totalValue,
      });

      const formatted = (data.products || []).map((p, index) => ({
        id: p.id ?? p._id ?? p.code ?? `generated-${index}`,
        name: p.name,
        code: p.code,
        category: p.category,
        quantity: p.quantity,
        minQuantity: p.minQuantity,
        unitPrice: p.unitPrice,
        status: p.status,
        totalValue: p.totalValue,
      }));

      setProducts(formatted);
    } catch (err) {
      Alert.alert("Erro", "Erro ao carregar inventário");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) navigation.navigate('Login');
    if (!authLoading && user) fetchInventory();
  }, [authLoading, isAuthenticated, user]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter.length > 0 && categoryFilter.length < CATEGORY_OPTIONS.length) {
      filtered = filtered.filter(product => categoryFilter.includes(product.category));
    }

    if (statusFilter.length > 0 && statusFilter.length < STATUS_OPTIONS.length) {
      filtered = filtered.filter(product => statusFilter.includes(product.status));
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchLower) ||
        product.code?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [search, categoryFilter, statusFilter, products]);

  const handleInventory = () => {
    navigation.navigate("NewProduct", {
      onSuccess: () => fetchInventory()
    });
  };

  const onRefresh = () => fetchInventory(true);

  if (authLoading || (loading && !refreshing)) {
    return (
      <SafeAreaView style={commonUserStyles.safeArea}>
        <Header title="Estoque" onMenuPress={() => setIsSidebarOpen(true)} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={globalStyle.primary} />
          <Text style={{ color: '#6B7280', marginTop: 10 }}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Estoque"
      />

      <ScrollView
        style={commonUserStyles.screenBlock}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[globalStyle.primary]}
          />
        }
      >
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
            value={overview.totalProducts}
            icon={<Box color={globalStyle.primary} />}
            color={globalStyle.primary}
          />

          <ProductCard
            title="Estoque Baixo"
            value={overview.lowInventory}
            icon={<TrendingDown color="#CA8A04" />}
            color="#CA8A04"
            extra="Atenção necessária"
          />

          <ProductCard
            title="Crítico"
            value={overview.criticalInventory}
            icon={<TriangleAlert color="#DC2626" />}
            color="#dc2626"
            extra="Reposição urgente"
          />

          <ProductCard
            title="Valor Total"
            value={formatCurrency(overview.totalValue)}
            icon={<Package color={globalStyle.primary} />}
            color={globalStyle.primary}
          />
        </AccessibleView>

        <View style={commonUserStyles.filterContainer}>
          <Input
            placeholder="Buscar produtos por nome"
            styleInput={commonUserStyles.inputVariant}
            onChangeText={setSearch}
            value={search}
          />

          <AccessibleView style={commonUserStyles.filters}>
            <StatusFilter
              title="Filtrar Categoria"
              filters={CATEGORY_OPTIONS.map((cat, idx) => ({ id: idx + 1, label: cat }))}
              selectedFilters={categoryFilter}
              onFilterChange={setCategoryFilter}
              containerStyle={{ width: "49%" }}
            />

            <StatusFilter
              title="Filtrar Status"
              filters={STATUS_OPTIONS.map((sts, idx) => ({ id: idx + 1, label: sts }))}
              selectedFilters={statusFilter}
              onFilterChange={setStatusFilter}
              containerStyle={{ width: "49%" }}
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