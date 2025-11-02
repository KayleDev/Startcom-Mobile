// screens/Dashboard/index.jsx
import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import formattedDate from '../../utils/formattedDate.js';

import { UsersRound, TrendingUp, DollarSign, Package, ShoppingCart, UserPlus, FileText, Star, Clock, Plus } from 'lucide-react-native'

import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle.js';
import { commonUserStyles } from '../../styles/commonUserStyles.js';

// Components
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import PeriodSelector from '../../components/PeriodSelector';
import MetricCard from '../../components/MetricCard';
import SalesChart from '../../components/SalesChart';
import QuickActionCard from '../../components/QuickActionCard/';
import ActivityCard from '../../components/ActivityCard/';
import HighlightCard from '../../components/HighlightCard';

import AccessibleView from '../../components/AccessibleView';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7 dias');
  const navigation = useNavigation();
  const route = useRoute();

  const getMetrics = (period) => {
    const metricsData = {
      'Hoje': {
        vendas: 'R$ 2.847,50',
        vendasChange: '+12.5%',
        faturamento: 'R$ 2.847,50',
        faturamentoChange: '+12.5%',
        clientes: '12',
        clientesChange: '+2 novos',
        estoque: '8',
      },
      '7 dias': {
        vendas: 'R$ 18.450,00',
        vendasChange: '+8.3%',
        faturamento: 'R$ 24.580,30',
        faturamentoChange: '+8.2%',
        clientes: '156',
        clientesChange: '+5 novos',
        estoque: '8',
      },
      '30 dias': {
        vendas: 'R$ 89.500,00',
        vendasChange: '+15.2%',
        faturamento: 'R$ 94.320,00',
        faturamentoChange: '+12.8%',
        clientes: '423',
        clientesChange: '+28 novos',
        estoque: '8',
      },
      '1 ano': {
        vendas: 'R$ 1.125.000,00',
        vendasChange: '+22.4%',
        faturamento: 'R$ 1.180.500,00',
        faturamentoChange: '+18.9%',
        clientes: '2.450',
        clientesChange: '+340 novos',
        estoque: '8',
      },
      'Período completo': {
        vendas: 'R$ 3.890.000,00',
        vendasChange: '+45.2%',
        faturamento: 'R$ 4.120.000,00',
        faturamentoChange: '+42.1%',
        clientes: '5.890',
        clientesChange: '+890 novos',
        estoque: '8',
      }
    };

    return metricsData[period] || metricsData['7 dias'];
  };

  const metrics = getMetrics(selectedPeriod);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    console.log('Período selecionado:', period);
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Dashboard"
      />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>
          Dashboard
        </Text>
        <Text style={commonUserStyles.screenDescription}>
          Visão geral do seu negócio - {formattedDate(new Date())}
        </Text>

        <PeriodSelector 
          onPeriodChange={handlePeriodChange}
          defaultPeriod="7 dias"
        />

        {/* Dashboard content */}
        <View style={styles.metricsContainer}>
          <MetricCard
            icon={<DollarSign size={28} color={globalStyle.primary} />}
            titulo="Vendas"
            value={metrics.vendas}
            extra={metrics.vendasChange}
            color={globalStyle.primary}
          />

          <MetricCard
            icon={<TrendingUp size={24} color={globalStyle.primary}/>}
            titulo="Faturamento"
            value={metrics.faturamento}
            extra={metrics.faturamentoChange}
            color={globalStyle.primary}
          />

          <MetricCard
            icon={<UsersRound size={24} color={globalStyle.primary} />}
            titulo="Total de Clientes"
            value={metrics.clientes}
            extra={metrics.clientesChange}
            color={globalStyle.primary}
          />

          <MetricCard
            icon={<Package size={28} color={globalStyle.warningColor} />}
            titulo="Itens em Baixa"
            value={metrics.estoque}
            extra="Atenção necessária"
            color={globalStyle.warningColor}
          />
        </View>

        {/* Sales Chart Section */}
        <AccessibleView style={styles.salesChartContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <TrendingUp size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Desempenho de Vendas - {selectedPeriod}</Text>
          </View>

          <SalesChart period={selectedPeriod} />
        </AccessibleView>

        {/* Quick Actions Section */}
        <View style={styles.quickActionsContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <Plus size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Ações Rápidas</Text>
          </View>
          
          <QuickActionCard
            icon={<ShoppingCart size={24} color="#FFFFFF" />}
            title="Nova Venda"
            description="Registrar uma nova venda"
            onPress={() => navigation.navigate('Sales')}
            iconBgColor={globalStyle.primary}
          />

          <QuickActionCard
            icon={<UserPlus size={24} color="#FFFFFF" />}
            title="Cadastrar Cliente"
            description="Adicionar novo cliente"
            onPress={() => navigation.navigate('Clients')}
            iconBgColor={globalStyle.primary}
          />

          <QuickActionCard
            icon={<Package size={24} color="#FFFFFF" />}
            title="Adicionar Produto"
            description="Cadastrar produto no estoque"
            onPress={() => navigation.navigate('Inventory')}
            iconBgColor={globalStyle.primary}
          />

          <QuickActionCard
            icon={<FileText size={24} color="#FFFFFF" />}
            title="Gerar Relatório"
            description="Criar novo relatório"
            onPress={() => navigation.navigate('Reports')}
            iconBgColor={globalStyle.primary}
          />
        </View>
        
        <View style={styles.activitiesContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <Clock size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Atividades Recentes</Text>
          </View>

          <ActivityCard
            icon={<ShoppingCart size={20} color="#FFFFFF" />}
            iconBgColor={globalStyle.primary}
            category="Venda"
            categoryColor={globalStyle.primary}
            time="há 2 minutos"
            title="Nova venda realizada - Cliente Maria Silva"
            subtitle="R$ 156,80"
          />

          <ActivityCard
            icon={<UserPlus size={20} color="#FFFFFF" />}
            iconBgColor={globalStyle.primary}
            category="Cliente"
            categoryColor={globalStyle.primary}
            time="há 15 minutos"
            title="Novo cliente cadastrado - João Santos"
          />

          <ActivityCard
            icon={<Package size={20} color="#FFFFFF" />}
            iconBgColor="#F59E0B"
            category="Estoque"
            categoryColor="#F59E0B"
            time="há 1 hora"
            title="Estoque baixo - Camiseta Básica (apenas 3 unidades)"
          />

          <ActivityCard
            icon={<FileText size={20} color="#FFFFFF" />}
            iconBgColor="#475569"
            category="Relatório"
            categoryColor="#475569"
            time="há 2 horas"
            title="Relatório mensal de vendas gerado"
          />
        </View>
              
        <View style={styles.highlightCardsContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <Star size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Destaques do Mês</Text>
          </View>

          <HighlightCard
            title="Produto Mais Vendido"
            subtitle="Camiseta Premium"
            value="47 vendas"
            valueColor={globalStyle.primary}
          />

          <HighlightCard
            title="Cliente Top"
            subtitle="Ana Oliveira"
            value="R$ 1.240"
            valueColor={globalStyle.primary}
          />

          <HighlightCard
            title="Ticket Médio"
            subtitle="Último mês"
            value="R$ 89,50"
            valueColor={globalStyle.primary}
            extraInfo="+15% vs anterior"
            extraInfoColor="#10B981"
          />

          <HighlightCard
            title="Meta vs Realizado"
            subtitle="Meta: R$ 45.000"
            value="R$ 48.750"
            valueColor={globalStyle.primary}
            extraInfo="+8,3%"
            extraInfoColor="#10B981"
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

export default Dashboard;