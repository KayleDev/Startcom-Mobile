import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { formatCurrency } from '../../utils/masks';
import { globalStyle } from '../../styles/globalStyle';
import AccessibleView from '../AccessibleView';

const SalesInfo = ({ orders = [], onViewOrder }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const renderOrderCard = ({ item }) => (
    <AccessibleView style={styles.card}>
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
          <Text style={styles.valuePrice}>{formatCurrency(item.amount)}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Itens</Text>
          <Text style={styles.value}>{item.items}</Text>
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