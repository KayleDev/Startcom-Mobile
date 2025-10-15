import React, { useState, useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import SalesCard from '../../components/SalesCard';
import Input from '../../components/Input';
import PeriodSelector from '../../components/PeriodSelector';
import StatusFilter from '../../components/StatusFilter';

import { Plus, DollarSign, ShoppingCart, TrendingUp} from 'lucide-react-native';
import { globalStyle } from '../../styles/globalStyle.js';
import SalesInfo from '../../components/SalesInfo/index.jsx';

const Sales = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const [search, setSearch] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("Este Mês");
  const [selectedStatuses, setSelectedStatuses] = useState(['Concluída', 'Pendente', 'Cancelada']);

  const allOrders = [
    { id: '#001', client: 'Maria Silva', date: '2025-10-15', value: 'R$ 256,80', status: 'Concluída', items: '3 itens' },
    { id: '#002', client: 'João Santos', date: '2025-10-14', value: 'R$ 189,50', status: 'Cancelada', items: '2 itens' },
    { id: '#003', client: 'Ana Costa', date: '2025-10-10', value: 'R$ 445,29', status: 'Concluída', items: '5 itens' },
    { id: '#004', client: 'Carlos Souza', date: '2025-09-05', value: 'R$ 89,99', status: 'Cancelada', items: '1 item' },
    { id: '#005', client: 'Pedro Alves', date: '2025-10-13', value: 'R$ 320,00', status: 'Concluída', items: '4 itens' },
    { id: '#006', client: 'Juliana Martins', date: '2025-10-12', value: 'R$ 150,00', status: 'Pendente', items: '2 itens' },
    { id: '#007', client: 'Roberto Lima', date: '2025-08-20', value: 'R$ 75,50', status: 'Cancelada', items: '1 item' },
    { id: '#008', client: 'Fernanda Rocha', date: '2025-10-11', value: 'R$ 520,00', status: 'Concluída', items: '6 itens' },
  ];

  const filterByPeriod = (orders, period) => {
    const today = new Date();
    
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      
      switch(period) {
        case 'Hoje':
          return orderDate.toDateString() === today.toDateString();
        
        case 'Esta Semana':
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          return orderDate >= weekAgo && orderDate <= today;
        
        case 'Este Mês':
          return orderDate.getMonth() === today.getMonth() && 
                 orderDate.getFullYear() === today.getFullYear();
        
        case 'Este Ano':
          return orderDate.getFullYear() === today.getFullYear();
        
        default:
          return true;
      }
    });
  };

  const filteredOrders = useMemo(() => {
    let filtered = [...allOrders];

    filtered = filterByPeriod(filtered, selectedPeriod);

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(order => 
        selectedStatuses.includes(order.status)
      );
    } else {
      return [];
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(order => 
        order.client.toLowerCase().includes(searchLower) ||
        order.id.toLowerCase().includes(searchLower) ||
        order.value.toLocaleLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [search, selectedPeriod, selectedStatuses]);

  const handleSale = () => {
    console.log("Nova venda");
  };

  const handleViewOrder = (order) => {
    console.log("Ver pedido:", order);
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Vendas"
      />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>
          Vendas
        </Text>
            
        <Text style={commonUserStyles.screenDescription}>
          Gerencie todas as suas vendas e transações
        </Text>

        <Button 
          title={
            <View style={commonUserStyles.alignButtonText}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={commonUserStyles.saveText}>Nova Venda</Text>
            </View>          
          }
          onPress={handleSale}
        />

        <View style={styles.salesContainer}>
          <SalesCard 
            title="Vendas Hoje"
            amount="R$ 1.247,50"
            valuePlus="+12.5% vs ontem"
            icon={<DollarSign color={globalStyle.primary}/>}
            iconBgColor={globalStyle.primaryTransparent}
          />

          <SalesCard 
            title="Total de Vendas"
            amount="156"
            valuePlus="+8 esta semana"
            icon={<ShoppingCart color={globalStyle.primary}/>}
            iconBgColor={globalStyle.primaryTransparent}
          />

          <SalesCard 
            title="Ticket Médio"
            amount="R$ 89,50"
            valuePlus="+5.2% este mês"
            icon={<TrendingUp color={globalStyle.primary}/>}
            iconBgColor={globalStyle.primaryTransparent}
          />
        </View>

        <View style={commonUserStyles.filterContainer}>
          <Input 
            placeholder="Buscar Vendas por cliente, ID..." 
            styleInput={commonUserStyles.inputVariant}
            onChangeText={setSearch}
            value={search}
          />

          <View style={commonUserStyles.filters}>
            <PeriodSelector
              periods={["Hoje", "Esta Semana", "Este Mês", "Este Ano"]}
              defaultPeriod="Este Mês"
              containerStyle={{width: "49%", marginVertical: 0}}
              onPeriodChange={setSelectedPeriod}
            />

            <StatusFilter
              filters={[
                { id: 1, label: 'Concluída' },
                { id: 2, label: 'Pendente' },
                { id: 3, label: 'Cancelada' },
              ]}
              onFilterChange={setSelectedStatuses}
              containerStyle={{width: "49%"}}
            />
          </View>
        </View>

        <Text style={styles.resultCount}>
          {filteredOrders.length} {filteredOrders.length === 1 ? 'venda encontrada' : 'vendas encontradas'}
        </Text>

        <SalesInfo 
          orders={filteredOrders}
          onViewOrder={handleViewOrder}
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

export default Sales;