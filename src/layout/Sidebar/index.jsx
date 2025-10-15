import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StatusBar, Platform } from 'react-native';
import * as Lucide from "lucide-react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { styles } from './styles';

const Sidebar = ({ isOpen, onClose, navigation, currentRoute }) => {
  const { signOut, user } = useAuth();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (isOpen) {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    }
  }, [isOpen]);

  const menuItems = [
    { id: 1, name: 'Dashboard', icon: Lucide.ChartColumn, route: 'Dashboard' },
    { id: 2, name: 'Vendas', icon: Lucide.ShoppingCart, route: 'Sales' },
    { id: 3, name: 'Clientes', icon: Lucide.Users, route: 'Clients' },
    { id: 4, name: 'Estoque', icon: Lucide.Package, route: 'Inventory' },
    { id: 5, name: 'Relatórios', icon: Lucide.Clipboard, route: 'Reports' },
    { id: 6, name: 'Configurações', icon: Lucide.Settings, route: 'Settings' },
  ];

  const handleNavigate = (route) => {
    navigation.navigate(route);
    onClose();
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: async () => {
            await signOut();
            onClose();
          }
        }
      ]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent={true}
      />
      
      <View style={styles.overlay}>
      <TouchableOpacity 
        style={styles.overlayBackground} 
        activeOpacity={1} 
        onPress={onClose}
      />

      <View style={styles.sidebar}>
        <View style={[styles.sidebarHeader, { paddingTop: insets.top + 20 }]}>
          <Text style={styles.logoText}>StartCom</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Lucide.X size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.menuContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  currentRoute === item.route && styles.menuItemActive
                ]}
                onPress={() => handleNavigate(item.route)}
              >
                <item.icon size={20} color="#fff" />
                
                <Text style={[
                  styles.menuText,
                  currentRoute === item.route && styles.menuTextActive
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flex: 1 }} />

          <View style={[styles.logoutSection, { paddingBottom: insets.bottom + 12 }]}>
            <View style={styles.userCard}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>
                  {user?.name || 'Usuário'}
                </Text>
                <Text style={styles.userEmail} numberOfLines={1}>
                  {user?.email || 'usuario@email.com'}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Lucide.LogOut size={20} color="#fff" />
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
    </>
  );
};

export default Sidebar;