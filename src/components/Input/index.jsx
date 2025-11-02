import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./styles.js";

import AccessibleView from "../AccessibleView/index.jsx";

const Input = ({ label, placeholder, keyboardType, value, onChangeText, secureTextEntry = false, formatPHONE, style, maxLength, styleInput }) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleChangeText = (text) => {
    const formatted = formatPHONE ? formatPHONE(text) : text;
    onChangeText(formatted);
  };

  return (
    <AccessibleView style={[{ marginBottom: 16 }, style]}>
      {label && <Text style={styles.labelText}>{label}</Text>}

      <View style={[styles.inputContainer, styleInput]}>
        <TextInput
          key={isSecure ? "secure" : "text"}
          placeholder={placeholder}
          placeholderTextColor={111}
          style={[styles.inputField, { flex: 1 }]}
          keyboardType={keyboardType}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={isSecure}
          maxLength={maxLength}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.eyeButton}>
            <MaterialIcons name={isSecure ? "visibility-off" : "visibility"} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </AccessibleView>
  );
};

export default Input;
