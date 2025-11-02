
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';
import AccessibleView from '../AccessibleView';

const MetricCard = ({ 
  icon, 
  titulo, 
  value, 
  extra, 
  color = globalStyle.primary
}) => {
  return (
    <View style={styles.card}>
      <AccessibleView style={styles.header}>
        <AccessibleView style={[styles.iconContainer, { borderColor: color }]}>
          <Text style={[styles.icon, { color: color }]}>{icon}</Text>
        </AccessibleView>
        <AccessibleView style={[styles.arrowContainer, { backgroundColor: color + '15' }]}>
          <Text style={[styles.arrow, { color: color }]}>↗</Text>
        </AccessibleView>
      </AccessibleView>
      
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.value}>{value}</Text>
      
      {extra && (
        <Text style={[styles.extra, { color: color }]}>{extra}</Text>
      )}
    </View>
  );
};

export default MetricCard;