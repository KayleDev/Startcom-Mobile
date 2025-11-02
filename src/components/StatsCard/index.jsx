import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';
import AccessibleView from '../AccessibleView';

const StatsCard = ({ icon, color, value, description }) => {
  return (
    <AccessibleView style={styles.card}>
      <AccessibleView style={[styles.iconContainer, {borderColor: color}]}>
        <View size={28} strokeWidth={2}>{icon}</View>
      </AccessibleView>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.description}>{description}</Text>
    </AccessibleView>
  );
};

export default StatsCard;