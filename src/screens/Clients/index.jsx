import React, { useState, useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';
import StatsCard from '../../components/StatsCard';
import Input from '../../components/Input';
import StatusFilter from '../../components/StatusFilter';
import ClientCard from '../../components/ClientCard';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import { globalStyle } from '../../styles/globalStyle.js';

import { Plus, UserRound, Star, Calendar, Smile } from 'lucide-react-native';

const Clients = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const [search, setSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState(['VIP', 'Premium', 'Regular']);

  const allClients = [
    {
      name: 'Carlos Soares Silva',
      badge: 'VIP',
      email: 'carlos@gmail.com',
      phone: '(11) 99999-9999',
      location: 'São Paulo',
      totalSpent: 'R$ 1266.80',
      lastPurchase: '14/04/2025'
    },
    {
      name: 'João Santos',
      badge: 'Regular',
      email: 'joao@gmail.com',
      phone: '(11) 88888-8888',
      location: 'Rio de Janeiro',
      totalSpent: 'R$ 845.30',
      lastPurchase: '11/07/2025'
    },
    {
      name: 'Pedro Henrique Pinheiro',
      badge: 'Premium',
      email: 'pedro@gmail.com',
      phone: '(11) 77777-7777',
      location: 'Belo Horizonte',
      totalSpent: 'R$ 2340.50',
      lastPurchase: '09/09/2025'
    }
  ];

  const filteredClients = useMemo(() => {
    let filtered = allClients;

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(client =>
        selectedStatuses.includes(client.badge)
      );
    } else {
      return [];
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.phone.toLowerCase().includes(term) ||
        client.location.toLowerCase().includes(term) ||
        client.totalSpent.toLowerCase().includes(term) ||
        client.lastPurchase.toLowerCase().includes(term)

      );
    }

    return filtered;
  }, [search, selectedStatuses]);

  const handleClient = () => {
    console.log("Novo cliente clicado");
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Clientes"
      />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>Clientes</Text>
        <Text style={commonUserStyles.screenDescription}>
          Gerencie sua base de clientes e relacionamentos
        </Text>

        <Button
          title={
            <View style={commonUserStyles.alignButtonText}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={commonUserStyles.saveText}>Novo Cliente</Text>
            </View>
          }
          onPress={handleClient}
        />

        <View style={styles.statsContainer}>
          <StatsCard
            icon={<UserRound color={globalStyle.primary} />}
            color={globalStyle.primary}
            value={156}
            description="Total de Clientes"
          />

          <StatsCard
            icon={<Star color="#A855F7" />}
            color="#A855F7"
            value={23}
            description="Clientes VIP"
          />

          <StatsCard
            icon={<Calendar color="#F59E0B" />}
            color="#F59E0B"
            value={12}
            description="Novos este mês"
          />

          <StatsCard
            icon={<Smile color="#10B981" />}
            color="#10B981"
            value={4.8}
            description="Satisfação Média"
          />
        </View>

        <View style={commonUserStyles.filterContainer}>
          <Input
            placeholder="Buscar cliente, e-mail ou cidade..."
            styleInput={commonUserStyles.inputVariant}
            onChangeText={setSearch}
            value={search}
          />

          <StatusFilter
            title={<>Filtrar por tipo de cliente</>}
            filters={[
              { id: 1, label: 'VIP' },
              { id: 2, label: 'Premium' },
              { id: 3, label: 'Regular' },
            ]}
            onFilterChange={setSelectedStatuses}
          />
        </View>
        
        <Text style={commonUserStyles.resultCount}>
          {filteredClients.length} {filteredClients.length === 1 ? 'cliente encontrado (a)' : 'clientes encontrados'}
        </Text>

        <View style={styles.clientContainer}>
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <ClientCard
                key={index}
                name={client.name}
                badge={client.badge}
                email={client.email}
                phone={client.phone}
                location={client.location}
                totalSpent={client.totalSpent}
                lastPurchase={client.lastPurchase}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 20 }}>
              Nenhum cliente encontrado.
            </Text>
          )}
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

export default Clients;
