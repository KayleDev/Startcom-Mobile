import { TextInput } from "react-native"
import { styles } from "./styles.js"

const index = ({label, keyboardType}) => {
  return (
    <TextInput
        placeholder={label}
        style={styles.input}
        keyboardType={keyboardType}
    />
  )
}

export default index