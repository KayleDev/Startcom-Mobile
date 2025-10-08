import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { styles } from "./styles";

const Button = ({ title, onPress, loading = false, disabled = false, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
