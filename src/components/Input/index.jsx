import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./styles.js";

const Input = ({ label, keyboardType, value, onChangeText, secureTextEntry = false }) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={{ marginBottom: 4 }}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          key={isSecure ? "secure" : "text"}
          style={styles.inputField}
          placeholder={label}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
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
