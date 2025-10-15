import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Eye } from 'lucide-react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';

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
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.productId}>{item.id}</Text>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => onViewOrder && onViewOrder(item)}
        >
          <Eye size={20} color={globalStyle.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Produto</Text>
          <Text style={styles.value}>{item.product}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Código</Text>
          <Text style={styles.value}>{item.code}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Categoria</Text>
          <Text style={styles.value}>{item.category}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Quantidade</Text>
          <Text style={styles.value}>{item.amount}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Mínimo</Text>
          <Text style={styles.value}>{item.min}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Preço</Text>
          <Text style={styles.valuePrice}>{item.price}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status</Text>
          <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.label}>Valor Total</Text>
          <Text style={styles.valuePrice}>{item.totalValue}</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#999', textAlign: 'center' }}>
        Nenhum produto encontrado com os filtros selecionados.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

export default ProductsInfo;