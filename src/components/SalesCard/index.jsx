import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AccessibleView from '../AccessibleView';

const SalesCard = ({title, amount, valuePlus, icon}) => {
  return (
    <AccessibleView style={styles.container}>
      <AccessibleView style={styles.content}>
        <AccessibleView style={styles.leftSection}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.valuePlus}>{valuePlus}</Text>
        </AccessibleView>
        
        <TouchableOpacity  style={styles.iconButton}>
          <Text style={styles.icon}>{icon}</Text>
        </TouchableOpacity>
      </AccessibleView>
    </AccessibleView>
  );
};

export default SalesCard;