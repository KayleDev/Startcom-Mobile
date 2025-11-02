import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';
import AccessibleView from '../AccessibleView';

const ActivityCard = ({ 
  icon, 
  iconBgColor = globalStyle.primary,
  category,
  categoryColor = globalStyle.primary,
  time,
  title,
  subtitle
}) => {
  return (
    <View style={styles.card}>
      <AccessibleView style={styles.header}>
        <AccessibleView style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          {icon}
        </AccessibleView>
        
        <AccessibleView style={styles.headerInfo}>
          <Text style={[styles.category, { color: categoryColor }]}>
            {category}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </AccessibleView>
      </AccessibleView>
      
      <AccessibleView style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </AccessibleView>
    </View>
  );
};

export default ActivityCard;