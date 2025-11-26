import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { formatPHONE } from '../../../utils/masks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';

import Header from '../../../layout/Header/';
import Input from '../../../components/Input/';
import Button from '../../../components/Button/';
import AccessibleView from '../../../components/AccessibleView/';

import { ArrowLeft, Save } from 'lucide-react-native';

import { commonUserStyles } from '../../../styles/commonUserStyles';
import { globalStyle } from '../../../styles/globalStyle';

const CATEGORY_OPTIONS = [
  { label: 'Regular', value: 'regular' },
  { label: 'VIP', value: 'vip' },
  { label: 'Premium', value: 'premium' }
];

const NewClient = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onSuccess } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    category: 'regular',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("Erro", "O campo Nome não pode estar vazio!");
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert("Erro", "O campo Email não pode estar vazio!");
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Erro", "O campo telefone não pode estar vazio!");
      return false;
    }
    if (!formData.city.trim()) {
      Alert.alert("Erro", "O campo cidade não pode estar vazio!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('@app:token');

      if (!token) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        navigation.navigate('Login');
        return;
      }

      const body = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""),
        city: formData.city.trim(),
        category: formData.category || "regular"
      };

      const response = await api.post("/Company/clients/create", body);

      if (response.data.status === 'success') {
        Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              if (onSuccess) {
                onSuccess(response.data.client || response.data);
              }
              navigation.goBack();
            },
          }
        ]);
      } else {
        throw new Error(response.data.message || 'Erro ao cadastrar cliente');
      }
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || error.message || 'Erro ao cadastrar cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header
        title="Novo Cliente"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <AccessibleView style={{ margin: 20 }}>
          <Text style={commonUserStyles.screenTitle}>Registrar Novo Cliente</Text>
          <View style={{ marginTop: 20 }}>
            <Input
              label="Nome"
              placeholder="Digite o nome do cliente"
              value={formData.name}
              onChangeText={value => handleInputChange('name', value)}
              editable={!loading}
            />
            <Input
              label="Email"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              editable={!loading}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={formatPHONE(formData.phone)}
              onChangeText={value => handleInputChange('phone', value)}
              editable={!loading}
              keyboardType="phone-pad"
              maxLength={15}
            />
            <Input
              label="Cidade"
              placeholder="Cidade"
              value={formData.city}
              onChangeText={value => handleInputChange('city', value)}
              editable={!loading}
            />

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 30 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 14,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  backgroundColor: '#FFF',
                  gap: 8,
                  opacity: loading ? 0.5 : 1
                }}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <ArrowLeft size={20} color="#6B7280" />
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#6B7280' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 14,
                  borderRadius: 8,
                  backgroundColor: globalStyle.primary,
                  gap: 8,
                  opacity: loading ? 0.5 : 1
                }}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Save size={20} color="#FFF" />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFF' }}>Salvar Cliente</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </AccessibleView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewClient;