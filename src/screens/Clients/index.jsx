// src/screens/Clients/Clients.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';
import StatsCard from '../../components/StatsCard';
import Input from '../../components/Input';
import StatusFilter from '../../components/StatusFilter';
import ClientCard from '../../components/ClientCard';
import AccessibleView from '../../components/AccessibleView';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import { globalStyle } from '../../styles/globalStyle.js';

import { Plus, UserRound, Star, Calendar, Smile } from 'lucide-react-native';

const Clients = () => {
  const navigation = useNavigation();
  const route = useRoute();
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

  const fetchOverviewAndClients = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const companyId = await AsyncStorage.getItem('company_id');

      if (!token || !companyId) {
        throw new Error('Sessão expirada. Faça login novamente.', navigation.navigate('Dashboard'));
      }

      const response = await axios.post(
        'http://192.168.0.115:8000/Company/clients/overview_full',
        { companyId }
      );

      const data = response.data;

      if (data.status === 'success') {
          setOverview(data.overview.clients);

      const formatted = (data.clients || []).map((c) => ({
        name: c.name,
        badge: c.category
          ? c.category[0].toUpperCase() + c.category.slice(1)
          : 'Regular',
        email: c.email || 'Não Informado',
        phone: c.phone || 'Não Informado',
        location: c.address || 'Não Informado',
        totalSpent: c.totalSpent ? c.totalSpent.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }) : 'R$ 0,00',
        lastPurchase: c.lastPurchase.split("-").reverse().join("-") || 'Ainda não comprou',
      }));

      setClients(formatted);
    } else {
      throw new Error('Erro na resposta da API.');
    }
  } catch (error) {
    Alert.alert('Erro', error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchOverviewAndClients();
}, []);

const filteredClients = useMemo(() => {
  let filtered = clients;

  if (selectedStatuses.length > 0) {
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
  navigation.navigate('NewClientModal', {
    onSuccess: (apiResponse) => {
      const newClient = {
        name: apiResponse.name,
        badge: apiResponse.category
          ? apiResponse.category[0].toUpperCase() + apiResponse.category.slice(1)
          : 'Regular',
        email: apiResponse.email || 'Não Informado',
        phone: apiResponse.phone || 'Não Informado',
        location: apiResponse.city || 'Não Informado',
        totalSpent: '0',
        lastPurchase: 'Não há',
      };
      setClients((prev) => [newClient, ...prev]);
      fetchOverviewAndClients();
    },
  });
};

return (
  <SafeAreaView style={commonUserStyles.safeArea}>
    <Header title="Clientes" onMenuPress={() => setIsSidebarOpen(true)} />

    {loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={globalStyle.primary} />
        <Text style={{ color: '#6B7280', marginTop: 10 }}>Carregando dados...</Text>
      </View>
    ) : (
      <ScrollView style={commonUserStyles.screenBlock}>
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
            value={overview.averageSatisfaction?.toFixed(1)}
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
              <ClientCard key={index} {...client} />
            ))
          ) : (
            <Text
              style={{
                textAlign: 'center',
                color: '#6B7280',
                marginTop: 20,
              }}
            >
              Nenhum cliente encontrado.
            </Text>
          )}
        </AccessibleView>
      </ScrollView>
    )}

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
