import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import PeriodSelector from '../../components/PeriodSelector';
import Button from '../../components/Button';
import ReportCard from '../../components/ReportCard';

import { Plus, DollarSign, TrendingUp, Users, Package, ChartLine, ChartPie, Clipboard } from 'lucide-react-native';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import { globalStyle } from '../../styles/globalStyle.js';
import BezierLineChart from '../../components/BezierLineChart';
import CategoryPieChart from '../../components/CategoryPieChart';
import GeneratedReportCard from '../../components/GeneratedReport/index.jsx'

import AccessibleView from '../../components/AccessibleView';

const Reports = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 6 meses");

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    console.log('Período selecionado:', period);
  };

  const handleReport = () => {
    navigation.navigate("NewReport")
  }
  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Relatórios"
      />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>
          Relatórios
        </Text>
      
        <Text style={commonUserStyles.screenDescription}>
          Análises e insights do seu negócio
        </Text>

        <Button 
          title={
            <View style={commonUserStyles.alignButtonText}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={commonUserStyles.saveText}>Novo Relatório</Text>
            </View>          
          }
          onPress={handleReport}
          />

        <PeriodSelector
          periods={["Últimos 7 dias", "Últimos 30 dias", "Últimos 6 meses", "Último 1 ano"]}
          defaultPeriod="Últimos 6 meses"
          onPeriodChange={handlePeriodChange}
          containerStyle={{ marginVertical: 0 }}
        />

        <AccessibleView style={styles.reportContainer}>
          <ReportCard
            icon={<DollarSign color={globalStyle.primary}/>}
            color={globalStyle.primary}
            value="R$ 28.450"
            title="Faturamento este mês"
            description="+15% vs mês anterior"
          />

          <ReportCard
            icon={<TrendingUp color={globalStyle.primary}/>}
            color={globalStyle.primary}
            value="145"
            title="Vendas realizadas"
            description="+8% vs mês anterior"
          />

          <ReportCard
            icon={<Users color={globalStyle.primary}/>}
            color={globalStyle.primary}
            value="72"
            title="Clientes ativos"
            description="+12 novos clientes"
          />

          <ReportCard
            icon={<Package color={globalStyle.primary}/>}
            color={globalStyle.primary}
            value="R$ 196"
            title="Ticket médio"
            description="+5% vs mês anterior"
          />
        </AccessibleView>

        <AccessibleView style={styles.reportChartContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <ChartLine size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Evolução das Vendas</Text>
          </View>
        
          <BezierLineChart period={selectedPeriod} />
        </AccessibleView>
        
        <AccessibleView style={styles.reportChartContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <ChartPie size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Categorias de Vendas</Text>
          </View>
        
          <CategoryPieChart period={selectedPeriod} />
        </AccessibleView>

        <View style={styles.generatedReportContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
              <Clipboard size={24} color={globalStyle.primary} />
              <Text style={commonUserStyles.sectionTitle}>Relatórios Gerados</Text>
          </View>

          <GeneratedReportCard
            title="Vendas Mensais"
            description="Relatório completo de vendas do último mês"
            type="PDF"
            size="2.3 MB"
            date="16/09/2025"
            state={true}
          />

          <GeneratedReportCard
            title="Análise de Clientes"
            description="Perfil e comportamento dos clientes"
            type="Excel"
            size="1.8 MB"
            date="12/09/2025"
            state={true}
          />

          <GeneratedReportCard
            title="Controle de Estoque"
            description="Situação atual do inventário"
            type="PDF"
            size="3.1 MB"
            date="16/10/2025"
            state={false}
          />

          <GeneratedReportCard
            title="Fluxo de Caixa"
            description="Entradas e saídas financeiras"
            type="Excel"
            size="2.7 MB"
            date="08/09/2025"
            state={true}
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

export default Reports;