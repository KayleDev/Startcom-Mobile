import React from 'react';
import { View, Text } from 'react-native';
import { Mail, Phone, MapPin } from 'lucide-react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';

const ClientCard = ({ 
  name,
  badge,
  email,
  phone,
  location,
  totalSpent,
  lastPurchase 
}) => {
  
  const getBadgeColor = (badge) => {
    if(badge == "Premium") {
        return "#F59E0B";
    } else if(badge == "VIP") {
        return "#8B5CF6"
    } else {
        return "#6B7280";
    }
  }
  const color = getBadgeColor(badge)

  const getInitials = (fullName) => {
    const names = fullName.trim().split(' ');
    
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    } else if (names.length === 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    } else {
      return (names[0][0] + names[1][0] + names[2][0]).toUpperCase();
    }
  };

  const initials = getInitials(name);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: globalStyle.primary }]}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={[styles.badge, { backgroundColor: color + "20"}]}>
            <Text style={[styles.badgeText, { color }]}>
              {badge}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.infoRow}>
          <Mail size={16} color="#6B7280" />
          <Text style={styles.infoText}>{email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Phone size={16} color="#6B7280" />
          <Text style={styles.infoText}>{phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.infoText}>{location}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Total gasto</Text>
          <Text style={styles.footerValue}>{totalSpent}</Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Última compra</Text>
          <Text style={styles.footerDate}>{lastPurchase}</Text>
        </View>
      </View>
    </View>
  );
};

export default ClientCard;