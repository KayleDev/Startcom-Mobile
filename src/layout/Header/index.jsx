import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

const Header = ({ onMenuPress, title = 'StartCom' }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <MaterialIcons name="menu" size={28} color="#1a1a1a" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.menuButton} />
    </View>
  );
};

export default Header;
