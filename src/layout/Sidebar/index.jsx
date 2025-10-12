import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

const Sidebar = ({ isOpen, onClose, navigation, currentRoute }) => {
  const menuItems = [
    { id: 1, name: 'Dashboard', icon: 'dashboard', route: 'Dashboard' },
    { id: 2, name: 'Vendas', icon: 'shopping-cart', route: 'Sales' },
    { id: 3, name: 'Clientes', icon: 'people', route: 'Clients' },
    { id: 4, name: 'Estoque', icon: 'inventory', route: 'Inventory' },
    { id: 5, name: 'Relatórios', icon: 'assessment', route: 'Reports' },
    { id: 6, name: 'Configurações', icon: 'settings', route: 'Settings' },
  ];

  const handleNavigate = (route) => {
    navigation.navigate(route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity 
        style={styles.overlayBackground} 
        activeOpacity={1} 
        onPress={onClose}
      />

      <SafeAreaView style={styles.sidebar} edges={['top', 'left', 'bottom']}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.logoText}>StartCom</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                currentRoute === item.route && styles.menuItemActive
              ]}
              onPress={() => handleNavigate(item.route)}
            >
              <MaterialIcons 
                name={item.icon} 
                size={20} 
                color="#fff"
              />
              <Text style={[
                styles.menuText,
                currentRoute === item.route && styles.menuTextActive
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Sidebar;