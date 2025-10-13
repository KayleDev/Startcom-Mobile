import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';

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
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          {icon}
        </View>
        
        <View style={styles.headerInfo}>
          <Text style={[styles.category, { color: categoryColor }]}>
            {category}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
};

export default ActivityCard;