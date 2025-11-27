import { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';
import SalesCard from '../../components/SalesCard';
import SalesInfo from '../../components/SalesInfo';
import AccessibleView from '../../components/AccessibleView';
import Input from '../../components/Input';
import PeriodSelector from '../../components/PeriodSelector';
import { Plus, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react-native';
import { globalStyle } from '../../styles/globalStyle';
import { commonUserStyles } from '../../styles/commonUserStyles';
import api from '../../services/api';
import { formatCurrency } from '../../utils/masks';
import styles from "./styles";

const Sales = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Este Mês');

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overview, setOverview] = useState({
    todayTotal: 0,
    todayComparison: 0,
    totalSales: 0,
    weekSales: 0,
    averageTicket: 0,
    averageTicketComparison: 0,
  });


  const fetchOverview = async () => {
    try {
      setOverviewLoading(true);
      const response = await api.post('/Company/sales/overview');
      const data = response.data.overview;

      setOverview({
        todayTotal: data.today.total,
        todayComparison: data.today.comparison,

        totalSales: data.sales.total,
        weekSales: data.sales.week,

        averageTicket: data.ticket.average,
        averageTicketComparison: data.ticket.comparison,
      });
    } catch (error) {
      console.error('Erro ao carregar overview:', error.response?.data || error);
    } finally {
      setOverviewLoading(false);
    }
  };

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await api.post('/Company/sales/get_all');
      const data = response.data.sales.map((sale) => ({
        id: sale._id,
        client: sale.clientName,
        date: new Date(sale.date),
        amount: sale.total,
        items: sale.items.reduce((acc, item) => acc + item.quantity, 0),
      }));
      setSales(data);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
    fetchSales();
  }, []);

  const filteredSales = sales.filter((sale) => {
    const today = new Date();
    const saleDate = sale.date;

    switch (selectedPeriod) {
      case 'Hoje':
        if (saleDate.toDateString() !== today.toDateString()) return false;
        break;
      case 'Esta Semana':
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        if (saleDate < weekAgo || saleDate > today) return false;
        break;
      case 'Este Mês':
        if (saleDate.getMonth() !== today.getMonth() || saleDate.getFullYear() !== today.getFullYear()) return false;
        break;
      case 'Este Ano':
        if (saleDate.getFullYear() !== today.getFullYear()) return false;
        break;
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      if (
        !sale.client.toLowerCase().includes(s) &&
        !sale.id.toLowerCase().includes(s) &&
        !String(sale.amount).toLowerCase().includes(s)
      )
        return false;
    }

    return true;
  });

  const handleNewSale = () => navigation.navigate('NewSale');
  const handleViewOrder = (order) => console.log('Ver pedido:', order);

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header onMenuPress={() => setIsSidebarOpen(true)} title="Vendas" />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>Vendas</Text>
        <Text style={commonUserStyles.screenDescription}>Gerencie todas as suas vendas e transações</Text>

        <Button
          title={
            <View style={commonUserStyles.alignButtonText}>
              <Plus size={20} color="#fff" />
              <Text style={commonUserStyles.saveText}>Nova Venda</Text>
            </View>
          }
          onPress={handleNewSale}
        />

        <AccessibleView style={commonUserStyles.salesOverview}>
          {overviewLoading ? (
            <View>
              <SalesCard
                title="Vendas Hoje"
                amount={formatCurrency(overview.todayTotal)}
                info={`${overview.todayComparison > 0 ? '+' : ''}${overview.todayComparison}% vs ontem`}
                progress={
                  overview.todayComparison > 0
                    ? 'good'
                    : overview.todayComparison < 0
                    ? 'bad'
                    : 'neutral'
                }
                icon={<DollarSign color={globalStyle.primary} />}
                iconBgColor={globalStyle.primaryTransparent}
              />

              <SalesCard
                title="Total de Vendas"
                amount={overview.totalSales.toString()}
                info={`${overview.weekSales} esta semana`}
                progress={
                  overview.weekSales > 0
                    ? 'good'
                    : overview.weekSales < 0
                    ? 'bad'
                    : 'neutral'
                }
                icon={<ShoppingCart color={globalStyle.primary} />}
                iconBgColor={globalStyle.primaryTransparent}
              />

              <SalesCard
                title="Ticket Médio"
                amount={formatCurrency(overview.averageTicket)}
                info={`${overview.averageTicketComparison > 0 ? '+' : ''}${overview.averageTicketComparison}% este mês`}
                progress={
                  overview.averageTicketComparison > 0
                    ? 'good'
                    : overview.averageTicketComparison < 0
                    ? 'bad'
                    : 'neutral'
                }
                icon={<TrendingUp color={globalStyle.primary} />}
                iconBgColor={globalStyle.primaryTransparent}
              />
            </View>
          ) : (
            <View>
              <SalesCard
                title="Vendas Hoje"
                amount={formatCurrency(overview.todayTotal)}
                info={`${overview.todayComparison > 0 ? '+' : ''}${overview.todayComparison}% vs ontem`}
                progress={
                  overview.todayComparison > 0
                    ? 'good'
                    : overview.todayComparison < 0
                    ? 'bad'
                    : 'neutral'
                }
                icon={<DollarSign color={globalStyle.primary} />}
                iconBgColor={globalStyle.primaryTransparent}
              />

              <SalesCard
                title="Total de Vendas"
                amount={overview.totalSales.toString()}
                info={`${overview.weekSales} esta semana`}
                progress={
                  overview.weekSales > 0
                    ? 'good'
                    : overview.weekSales < 0
                    ? 'bad'
                    : 'neutral'
                }
                icon={<ShoppingCart color={globalStyle.primary} />}
                iconBgColor={globalStyle.primaryTransparent}
              />

              <SalesCard
                title="Ticket Médio"
                amount={formatCurrency(overview.averageTicket)}
                info={`${overview.averageTicketComparison > 0 ? '+' : ''}${overview.averageTicketComparison}% este mês`}
                progress={
                  overview.averageTicketComparison > 0
                    ? 'good'
                    : overview.averageTicketComparison < 0
                    ? 'bad'
                    : 'neutral'
                }
                icon={<TrendingUp color={globalStyle.primary} />}
                iconBgColor={globalStyle.primaryTransparent}
              />
            </View>
          )}
        </AccessibleView>

        <View style={commonUserStyles.filterContainer}>
          <Input
            placeholder="Buscar Vendas por cliente, ID..."
            onChangeText={setSearch}
            value={search}
            styleInput={commonUserStyles.inputVariant}
          />

          <PeriodSelector
            periods={['Hoje', 'Esta Semana', 'Este Mês', 'Este Ano']}
            defaultPeriod="Este Mês"
            onPeriodChange={setSelectedPeriod}
          />
        </View>

        <Text style={commonUserStyles.resultCount}>
          {filteredSales.length} {filteredSales.length === 1 ? 'venda encontrada' : 'vendas encontradas'}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={globalStyle.primary} />
        ) : (
          <SalesInfo orders={filteredSales} onViewOrder={handleViewOrder} />
        )}
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
