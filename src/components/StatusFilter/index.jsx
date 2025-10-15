import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './styles';

import { globalStyle } from '../../styles/globalStyle';

const FilterSelector = ({ 
  icon,
  title,
  filters,
  defaultSelected,
  onFilterChange,
  buttonStyle,
  containerStyle,
  modalStyle
}) => {
  const initialSelected = defaultSelected || filters.map(f => f.label);
  const [selectedFilters, setSelectedFilters] = useState(initialSelected);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleFilter = (label) => {
    let newFilters;
    if (selectedFilters.includes(label)) {
      newFilters = selectedFilters.filter(item => item !== label);
    } else {
      newFilters = [...selectedFilters, label];
    }
    
    setSelectedFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.filterButton, buttonStyle]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.filterIcon}>{icon}</Text>
        <Text style={styles.buttonText}>{title}</Text>
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
            <Text style={styles.modalTitle}>Filtros</Text>
            
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={styles.filterOption}
                onPress={() => toggleFilter(filter.label)}
              >
                <View style={[
                  styles.checkbox,
                  selectedFilters.includes(filter.label) && styles.checkboxSelected
                ]}>
                  {selectedFilters.includes(filter.label) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.filterText}>{filter.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FilterSelector;