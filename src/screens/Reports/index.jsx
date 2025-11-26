import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import PeriodSelector from '../../components/PeriodSelector';
import Button from '../../components/Button';
import ReportCard from '../../components/ReportCard';

import {
  Plus,
  DollarSign,
  TrendingUp,
  Users,
  Package,
  ChartLine,
  ChartPie,
  Clipboard,
} from 'lucide-react-native';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import { globalStyle } from '../../styles/globalStyle.js';

import BezierLineChart from '../../components/BezierLineChart';
import CategoryPieChart from '../../components/CategoryPieChart';
import GeneratedReportCard from '../../components/GeneratedReport';
import AccessibleView from '../../components/AccessibleView';

import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { formatCurrency, formatPercent } from '../../utils/masks.js';

const Reports = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, token, isAuthenticated, loading: pageLoading } = useAuth();
  const companyId = user?.companyId;

  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 6 meses");

  const [period, setPeriod] = useState("6m");
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const periodMap = {
    "Últimos 7 dias": "7d",
    "Últimos 30 dias": "30d",
    "Últimos 6 meses": "6m",
    "Último 1 ano": "1y",
  };

  const fetchOverview = async (selected) => {
    try {
      setLoading(true);
      const response = await api.post("/Company/report/sales/overview", {
        period: selected,
      });

      if (!response.data || typeof response.data !== "object") {
        setOverview({});
        return;
      }

      if (!response.data.overview) {
        setOverview({});
        return;
      }

      setOverview(response.data.overview);
    } catch (err) {
      console.error("Erro ao buscar overview:", err);
      setError("Erro ao carregar relatório");
      setOverview({});
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  if (pageLoading) return;

  if (!isAuthenticated) {
    navigation.navigate("Login");
    return;
  }

  if (companyId) {
    fetchOverview(period);
  }
}, [pageLoading, isAuthenticated, companyId]);


  const handlePeriodChange = (value) => {
    const mapped = periodMap[value];
    setSelectedPeriod(value);
    setPeriod(mapped);
    fetchOverview(mapped);
  };

  const handleReport = () => navigation.navigate("NewReport");

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Relatórios"
      />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>Relatórios</Text>
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

        {loading ? (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" color={globalStyle.primary} />
          </View>
        ) : (
          <AccessibleView style={styles.reportContainer}>
            <ReportCard
              icon={<DollarSign color={globalStyle.primary} />}
              color={globalStyle.primary}
              value={formatCurrency(overview?.monthRevenue?.total || 0)}
              title="Faturamento este mês"
              description={`${formatPercent(overview?.monthRevenue?.comparison) || "0%"} vs mês anterior`}
            />

            <ReportCard
              icon={<TrendingUp color={globalStyle.primary} />}
              color={globalStyle.primary}
              value={overview?.sales?.total || 0}
              title="Vendas realizadas"
              description={`${formatPercent(overview?.sales?.monthComparison) || "0%"} vs mês anterior`}
            />

            <ReportCard
              icon={<Users color={globalStyle.primary} />}
              color={globalStyle.primary}
              value={overview?.activeCustomers || 0}
              title="Clientes ativos"
              description={`${overview?.newCustomers || 0} novos clientes`}
            />

            <ReportCard
              icon={<Package color={globalStyle.primary} />}
              color={globalStyle.primary}
              value={formatCurrency(overview?.ticket?.average || 0)}
              title="Ticket médio"
              description={`${formatPercent(overview?.ticket?.comparison) || "0%"} vs mês anterior`}
            />
          </AccessibleView>
        )}

        <AccessibleView style={styles.reportChartContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <ChartLine size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Evolução das Vendas</Text>
          </View>

          <BezierLineChart data={overview?.salesTotals || {}} period={period} />
        </AccessibleView>

        <AccessibleView style={styles.reportChartContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <ChartPie size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Categorias de Vendas</Text>
          </View>

          <CategoryPieChart data={overview?.categoryDistribution || {}} />
        </AccessibleView>

        <View style={styles.generatedReportContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <Clipboard size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Relatórios Gerados</Text>
          </View>

          <GeneratedReportCard
            title="Vendas Mensais"
            description="Relatório completo das vendas do último mês"
            type="PDF"
            size="2.3 MB"
            date="16/07/2025"
            state={true}
          />

          <GeneratedReportCard
            title="Análise de Clientes"
            description="Perfil e comportamento dos clientes"
            type="Excel"
            size="1.8 MB"
            date="12/06/2025"
            state={true}
          />

          <GeneratedReportCard
            title="Controle de Estoque"
            description="Situação atual do inventário"
            type="PDF"
            size="3.1 MB"
            date="30/09/2025"
            state={false}
          />

          <GeneratedReportCard
            title="Fluxo de Caixa"
            description="Entradas e saídas financeiras"
            type="Excel"
            size="2.7 MB"
            date="08/05/2025"
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
