import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./styles.js";

const Input = ({ label, placeholder, keyboardType, value, onChangeText, secureTextEntry = false, formatPHONE, style, maxLength }) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleChangeText = (text) => {
    const formatted = formatPHONE ? formatPHONE(text) : text;
    onChangeText(formatted);
  };

  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label && <Text style={styles.labelText}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          key={isSecure ? "secure" : "text"}
          placeholder={placeholder}
          placeholderTextColor={111}
          style={[styles.inputField, { flex: 1 }]}
          keyboardType={keyboardType}
          value={value}
          onChangeText={handleChangeText}  // Usar handleChangeText ao invés de onChangeText direto
          secureTextEntry={isSecure}
          maxLength={maxLength}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.eyeButton}>
            <MaterialIcons name={isSecure ? "visibility-off" : "visibility"} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
