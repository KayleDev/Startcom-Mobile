import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import AccessibleView from '../AccessibleView';

const SalesCard = ({ title, amount, info, progress, icon }) => {
  
  const getProgressColor = () => {
    switch (progress) {
      case 'good':
        return styles.good;
      case 'bad':
        return styles.bad;
      default:
        return styles.neutral;
    }
  };

  return (
    <AccessibleView style={styles.container}>
      <AccessibleView style={styles.content}>

        <AccessibleView style={styles.leftSection}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amount}>{amount}</Text>

          <Text style={[styles.info, getProgressColor()]}>
            {info}
          </Text>
        </AccessibleView>

        <AccessibleView style={styles.iconButton}>
          {icon}
        </AccessibleView>

      </AccessibleView>
    </AccessibleView>
  );
};

export default SalesCard;
