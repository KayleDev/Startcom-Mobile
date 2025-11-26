import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { formatCurrency } from '../../utils/masks';
import { Eye } from 'lucide-react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';
import AccessibleView from '../AccessibleView';

const ProductsInfo = ({ 
  products = [],
  onViewOrder
}) => {
  
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Normal':
        return styles.statusNormal;
      case 'Baixo':
        return styles.statusBaixo;
      case 'Crítico':
        return styles.statusCritico;
      case 'Esgotado':
        return styles.statusEsgotado;
      default:
        return styles.statusDefault;
    }
  };

  const renderProductCard = ({ item }) => (
    <AccessibleView style={styles.card}>
      {/*<AccessibleView style={styles.cardHeader}>
        <Text style={styles.productId}>{item.id}</Text>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => onViewOrder && onViewOrder(item)}
        >
          <Eye size={20} color={globalStyle.primary} />
        </TouchableOpacity>
      </AccessibleView>*/}

      <AccessibleView style={styles.cardBody}>
        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Produto</Text>
          <Text style={styles.value}>{item.name}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Categoria</Text>
          <Text style={styles.value}>{item.category}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Quantidade</Text>
          <Text style={styles.value}>{item.quantity}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Mínimo</Text>
          <Text style={styles.value}>{item.minQuantity}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Preço</Text>
          <Text style={styles.valuePrice}>{item.unitPrice}</Text>
        </AccessibleView>

        <AccessibleView style={styles.infoRow}>
          <Text style={styles.label}>Status</Text>
          <AccessibleView style={[styles.statusBadge, getStatusStyle(item.status)]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </AccessibleView>
        </AccessibleView>

        <AccessibleView style={styles.cardFooter}>
          <Text style={styles.label}>Valor Total</Text>
          <Text style={styles.valuePrice}>{formatCurrency(item.totalValue)}</Text>
        </AccessibleView>
      </AccessibleView>
    </AccessibleView>
  );

  const renderEmptyList = () => (
    <AccessibleView style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#999', textAlign: 'center' }}>
        Nenhum produto encontrado com os filtros selecionados.
      </Text>
    </AccessibleView>
  );

  return (
    <AccessibleView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item, index) => String(item.id ?? item.code ?? `item-${index}`)}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListEmptyComponent={renderEmptyList}
      />
    </AccessibleView>
  );
};

export default ProductsInfo;