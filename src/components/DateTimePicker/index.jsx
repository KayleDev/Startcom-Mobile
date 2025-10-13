import { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../Input/styles.js';
import { styles as datePickerStyles } from './styles.js';
import { CalendarDays } from 'lucide-react-native';

export default function DatePickerInput({ date, setDate, label }) {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={{ width: "49%", marginBottom: 16 }}>
      {label && <Text style={styles.labelText}>{label}</Text>}
      
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={datePickerStyles.dateInputContainer}
      >
        <Text style={datePickerStyles.dateText}>
          {date.toLocaleDateString('pt-BR')}
        </Text>
        <Text style={{ fontSize: 18 }}><CalendarDays color="#017688" /></Text>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onChange}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}