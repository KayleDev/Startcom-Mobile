import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../Input/styles';
import { toggleStyles } from './styles';

export default function CPFCNPJToggle({ value, onChangeText, formatCPF, formatCNPJ }) {
  const [selectedType, setSelectedType] = useState('CPF');

  const handleChangeText = (text) => {
    const formatted = selectedType === 'CPF' ? formatCPF(text) : formatCNPJ(text);
    onChangeText(formatted);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onChangeText('');
  };

  return (
    <View style={{ marginBottom: 16, width: '100%' }}>      
      <View style={toggleStyles.toggleContainer}>
        <TouchableOpacity
          style={[
            toggleStyles.toggleButton,
            toggleStyles.leftButton,
            selectedType === 'CPF' && toggleStyles.activeButton
          ]}
          onPress={() => handleTypeChange('CPF')}
        >
          <Text style={[
            toggleStyles.toggleText,
            selectedType === 'CPF' && toggleStyles.activeText
          ]}>
            CPF
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            toggleStyles.toggleButton,
            toggleStyles.rightButton,
            selectedType === 'CNPJ' && toggleStyles.activeButton
          ]}
          onPress={() => handleTypeChange('CNPJ')}
        >
          <Text style={[
            toggleStyles.toggleText,
            selectedType === 'CNPJ' && toggleStyles.activeText
          ]}>
            CNPJ
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={selectedType === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
          style={styles.inputField}
          placeholderTextColor={111}
          keyboardType="numeric"
          value={value}
          onChangeText={handleChangeText}
          maxLength={selectedType === 'CPF' ? 14 : 18}
        />
      </View>
    </View>
  );
}