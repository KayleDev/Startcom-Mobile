import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Eye } from 'lucide-react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';

const SalesInfo = ({ 
  orders = [
    { id: '#001', client: 'Maria Silva', date: '21/09/2025', value: 'R$ 256,8', status: 'Concluída', items: '3 itens' },
    { id: '#002', client: 'João Santos', date: '20/09/2025', value: 'R$ 189,5', status: 'Pendente', items: '2 itens' },
    { id: '#003', client: 'Ana Costa', date: '15/09/2025', value: 'R$ 445,29', status: 'Concluída', items: '5 itens' },
    { id: '#004', client: 'Carlos Souza', date: '05/08/2025', value: 'R$ 89,99', status: 'Cancelada', items: '1 itens' },
  ],
  onViewOrder
}) => {
  
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Concluída':
        return styles.statusConcluida;
      case 'Pendente':
        return styles.statusPendente;
      case 'Cancelada':
        return styles.statusCancelada;
      default:
        return styles.statusDefault;
    }
  };

  const renderOrderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => onViewOrder && onViewOrder(item)}
        >
          <Eye size={20} color={globalStyle.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Cliente</Text>
          <Text style={styles.value}>{item.client}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>{item.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Valor</Text>
          <Text style={styles.valuePrice}>{item.value}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Itens</Text>
          <Text style={styles.value}>{item.items}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default SalesInfo;