import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { globalStyle } from "../../styles/globalStyle";

const Button = ({ title, onPress, loading = false, disabled = false, style, textStyle }) => {
  const backgroundColor = disabled || loading ? "#ccc" : globalStyle.primary;

  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor }]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
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
