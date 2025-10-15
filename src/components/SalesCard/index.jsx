import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const SalesCard = ({title, amount, valuePlus, icon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.valuePlus}>{valuePlus}</Text>
        </View>
        
        <TouchableOpacity  style={styles.iconButton}>
          <Text style={styles.icon}>{icon}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SalesCard;