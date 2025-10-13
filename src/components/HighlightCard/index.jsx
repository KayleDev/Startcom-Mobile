import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';

const HighlightCard = ({ 
  title, 
  subtitle, 
  value, 
  valueColor = globalStyle.primary,
  extraInfo,
  extraInfoColor = '#10B981'
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      
      <View style={styles.rightContent}>
        <Text style={[styles.value, { color: valueColor }]}>
          {value}
        </Text>
        {extraInfo && (
          <Text style={[styles.extraInfo, { color: extraInfoColor }]}>
            {extraInfo}
          </Text>
        )}
      </View>
    </View>
  );
};

export default HighlightCard;