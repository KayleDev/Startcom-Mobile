// components/PeriodSelector/index.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { globalStyle } from '../../styles/globalStyle';
import { Calendar } from 'lucide-react-native';
import { styles } from './styles';

const PeriodSelector = ({ 
  periods = ['Hoje', '7 dias', '30 dias', '1 ano', 'Período completo'],
  defaultPeriod = '7 dias',
  onPeriodChange,
  buttonStyle,
  modalStyle
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectPeriod = (period) => {
    setSelectedPeriod(period);
    setIsModalVisible(false);
    
    // Chama o callback se fornecido
    if (onPeriodChange) {
      onPeriodChange(period);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selectorButton, buttonStyle]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.calendarIcon}>
          <Calendar color={globalStyle.primary} />
        </Text>
        <Text style={styles.selectedText}>{selectedPeriod}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalContent, modalStyle]}>
            {periods.map((period, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.periodOption,
                  selectedPeriod === period && styles.periodOptionSelected
                ]}
                onPress={() => handleSelectPeriod(period)}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period && styles.periodTextSelected
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PeriodSelector;