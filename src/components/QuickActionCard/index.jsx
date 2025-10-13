import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';
const QuickActionCard = ({ 
  icon, 
  title, 
  description, 
  onPress,
  iconColor = globalStyle.primary,
  iconBgColor = globalStyle.primary
}) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        {icon}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuickActionCard;