import React from 'react';
import { View, Text } from 'react-native';
import { Mail, Phone, MapPin } from 'lucide-react-native';
import { styles } from './styles';
import { globalStyle } from '../../styles/globalStyle';
import AccessibleView from '../AccessibleView';

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
        <AccessibleView style={[styles.avatar, { backgroundColor: globalStyle.primary }]}>
          <Text style={styles.initials}>{initials}</Text>
        </AccessibleView>
        
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <AccessibleView style={[styles.badge, { backgroundColor: color + "20"}]}>
            <Text style={[styles.badgeText, { color }]}>
              {badge}
            </Text>
          </AccessibleView>
        </View>
      </View>

      <AccessibleView style={styles.contactInfo}>
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
      </AccessibleView>

      <View style={styles.footer}>
        <AccessibleView style={styles.footerItem}>
          <Text style={styles.footerLabel}>Total gasto</Text>
          <Text style={styles.footerValue}>{totalSpent}</Text>
        </AccessibleView>

        <AccessibleView style={styles.footerItem}>
          <Text style={styles.footerLabel}>Última compra</Text>
          <Text style={styles.footerDate}>{lastPurchase}</Text>
        </AccessibleView>
      </View>
    </View>
  );
};

export default ClientCard;