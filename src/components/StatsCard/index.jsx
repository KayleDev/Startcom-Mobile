import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';

const StatsCard = ({ icon, color, value, description }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, {borderColor: color}]}>
        <View size={28} strokeWidth={2}>{icon}</View>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default StatsCard;