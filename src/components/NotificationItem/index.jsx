import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { styles } from './styles';

const NotificationItem = ({ title, description, defaultValue = false, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(defaultValue);

  const handleToggle = (value) => {
    setIsEnabled(value);
    if (onToggle) {
      onToggle(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={handleToggle}
        trackColor={{ false: '#D1D5DB', true: '#000000ff' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D1D5DB"
      />
    </View>
  );
}

export default NotificationItem;