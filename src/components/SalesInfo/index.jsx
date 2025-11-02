import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Eye } from 'lucide-react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';
import AccessibleView from '../AccessibleView';

const SalesInfo = ({ 
  orders = [],
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const renderOrderCard = ({ item }) => (
    <AccessibleView style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => onViewOrder && onViewOrder(item)}
        >
          <Eye size={20} color={globalStyle.primary} />
        </TouchableOpacity>
      </View>

      <AccessibleView style={styles.cardBody}>
        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Cliente</Text>
          <Text style={styles.value}>{item.client}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>{formatDate(item.date)}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Valor</Text>
          <Text style={styles.valuePrice}>{item.value}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Itens</Text>
          <Text style={styles.value}>{item.items}</Text>
        </AccessibleView>
      </AccessibleView>

      <AccessibleView style={styles.cardFooter}>
        <AccessibleView style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </AccessibleView>
      </AccessibleView>
    </AccessibleView>
  );

  const renderEmptyList = () => (
    <AccessibleView style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#999', textAlign: 'center' }}>
        Nenhuma venda encontrada com os filtros selecionados.
      </Text>
    </AccessibleView>
  );

  return (
    <AccessibleView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListEmptyComponent={renderEmptyList}
      />
    </AccessibleView>
  );
};

export default SalesInfo;