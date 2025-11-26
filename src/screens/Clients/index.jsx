import React, { useEffect, useState, useMemo } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api.js';

import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';
import StatsCard from '../../components/StatsCard';
import Input from '../../components/Input';
import StatusFilter from '../../components/StatusFilter';
import ClientCard from '../../components/ClientCard';
import AccessibleView from '../../components/AccessibleView';

import { useAuth } from '../../contexts/AuthContext';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import { globalStyle } from '../../styles/globalStyle.js';

import { Plus, UserRound, Star, Calendar, Smile } from 'lucide-react-native';

const Clients = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, loading: authLoading } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState(['VIP', 'Premium', 'Regular']);

  const [clients, setClients] = useState([]);
  const [overview, setOverview] = useState({
    total: 0,
    vip: 0,
    newThisMonth: 0,
    averageSatisfaction: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const formatPhone = (phone) => {
    if (!phone) return 'Não Informado';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const formatDateBR = (dateString) => {
    if (!dateString) return 'Ainda não comprou';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Ainda não comprou';
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  const fetchOverviewAndClients = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const token = await AsyncStorage.getItem('@app:token');
      
      if (!token) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        navigation.navigate('Login');
        return;
      }

      const response = await api.post("/Company/clients/overview_full");

      const data = response.data;

      if (data.status === 'success') {
        setOverview({
          total: data.overview?.total || 0,
          vip: data.overview?.vip || 0,
          newThisMonth: data.overview?.newThisMonth || 0,
          averageSatisfaction: data.overview?.averageSatisfaction || 0,
        });

        const formattedClients = (data.overview?.clients || [])
          .map((c) => ({
            id: c.id || c._id,
            name: c.name,
            badge: c.category
              ? c.category[0].toUpperCase() + c.category.slice(1)
              : 'Regular',
            email: c.email || 'Não Informado',
            phone: formatPhone(c.phone),
            location: c.address || c.city || 'Não Informado',
            totalSpent: formatCurrency(c.totalSpent),
            lastPurchase: formatDateBR(c.lastPurchase),
            rawLastPurchase: c.lastPurchase,
          }))
          .sort((a, b) => {
            if (!a.rawLastPurchase) return 1;
            if (!b.rawLastPurchase) return -1;

            const dateA = new Date(a.rawLastPurchase);
            const dateB = new Date(b.rawLastPurchase);
            return dateB - dateA;
          });

        setClients(formattedClients);
      } else {
        throw new Error('Erro na resposta da API.');
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      Alert.alert(
        'Erro', 
        error.response?.data?.message || error.message || 'Erro ao carregar clientes.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!authLoading && user) {
        fetchOverviewAndClients();
      }
    }, [authLoading, user])
  );

  useEffect(() => {
    if (!authLoading && !user) {
      navigation.navigate('Login');
    }
  }, [authLoading, user]);

  const filteredClients = useMemo(() => {
    let filtered = clients;

    if (selectedStatuses.length > 0 && selectedStatuses.length < 3) {
      filtered = filtered.filter((c) => selectedStatuses.includes(c.badge));
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.phone.toLowerCase().includes(term) ||
          c.location.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [clients, search, selectedStatuses]);

  const handleNewClient = () => {
    navigation.navigate('NewClient', {
      onSuccess: () => {
        fetchOverviewAndClients();
      },
    });
  };

  const onRefresh = () => {
    fetchOverviewAndClients(true);
  };

  if (authLoading || (loading && !refreshing)) {
    return (
      <SafeAreaView style={commonUserStyles.safeArea}>
        <Header title="Clientes" onMenuPress={() => setIsSidebarOpen(true)} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={globalStyle.primary} />
          <Text style={{ color: '#6B7280', marginTop: 10 }}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header title="Clientes" onMenuPress={() => setIsSidebarOpen(true)} />

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
        <Text style={commonUserStyles.screenTitle}>Clientes</Text>
        <Text style={commonUserStyles.screenDescription}>
          Gerencie sua base de clientes e relacionamentos
        </Text>

        <Button
          title={
            <View style={commonUserStyles.alignButtonText}>
              <Plus size={20} color="#FFF" />
              <Text style={commonUserStyles.saveText}>Novo Cliente</Text>
            </View>
          }
          onPress={handleNewClient}
        />

        <AccessibleView style={styles.statsContainer}>
          <StatsCard
            icon={<UserRound color={globalStyle.primary} />}
            color={globalStyle.primary}
            value={overview.total}
            description="Total de Clientes"
          />
          <StatsCard
            icon={<Star color="#A855F7" />}
            color="#A855F7"
            value={overview.vip}
            description="Clientes VIP"
          />
          <StatsCard
            icon={<Calendar color="#F59E0B" />}
            color="#F59E0B"
            value={overview.newThisMonth}
            description="Novos este mês"
          />
          <StatsCard
            icon={<Smile color="#10B981" />}
            color="#10B981"
            value={overview.averageSatisfaction?.toFixed(1) || '0.0'}
            description="Satisfação Média"
          />
        </AccessibleView>

        <View style={commonUserStyles.filterContainer}>
          <Input
            placeholder="Buscar nome, e-mail ou telefone..."
            styleInput={commonUserStyles.inputVariant}
            onChangeText={setSearch}
            value={search}
          />
          <StatusFilter
            title="Filtrar por tipo de cliente"
            filters={[
              { id: 1, label: 'VIP' },
              { id: 2, label: 'Premium' },
              { id: 3, label: 'Regular' },
            ]}
            selectedFilters={selectedStatuses}
            onFilterChange={setSelectedStatuses}
          />
        </View>

        <Text style={commonUserStyles.resultCount}>
          {filteredClients.length}{' '}
          {filteredClients.length === 1
            ? 'cliente encontrado'
            : 'clientes encontrados'}
        </Text>

        <AccessibleView style={styles.clientContainer}>
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <ClientCard 
                key={client.id || index} 
                {...client} 
                onPress={() => navigation.navigate('ClientDetails', { clientId: client.id })}
              />
            ))
          ) : (
            <Text
              style={{
                textAlign: 'center',
                color: '#6B7280',
                marginTop: 20,
                fontSize: 16,
              }}
            >
              {search || selectedStatuses.length < 3 
                ? 'Nenhum cliente encontrado com os filtros aplicados.'
                : 'Nenhum cliente cadastrado ainda.'}
            </Text>
          )}
        </AccessibleView>
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

export default Clients;