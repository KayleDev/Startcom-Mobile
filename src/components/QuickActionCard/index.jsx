import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';
import AccessibleView from '../AccessibleView';
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
      <AccessibleView style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        {icon}
      </AccessibleView>
      
      <AccessibleView style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </AccessibleView>
    </TouchableOpacity>
  );
};

export default QuickActionCard;