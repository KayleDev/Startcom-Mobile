
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';

const MetricCard = ({ 
  icon, 
  titulo, 
  value, 
  extra, 
  color = globalStyle.primary
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { borderColor: color }]}>
          <Text style={[styles.icon, { color: color }]}>{icon}</Text>
        </View>
        <View style={[styles.arrowContainer, { backgroundColor: color + '15' }]}>
          <Text style={[styles.arrow, { color: color }]}>↗</Text>
        </View>
      </View>
      
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.value}>{value}</Text>
      
      {extra && (
        <Text style={[styles.extra, { color: color }]}>{extra}</Text>
      )}
    </View>
  );
};

export default MetricCard;