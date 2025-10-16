import { View, TextInput, Alert } from 'react-native'
import { useRef, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'

const CodeVerificator = ({ onCodeComplete }) => {
  const navigation = useNavigation()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  const handleChangeText = (text, index) => {
    if (!/^\d*$/.test(text)) return

    const newCode = [...code]
    newCode[index] = text

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus()
    }

    setCode(newCode)

    if (newCode.every(digit => digit !== '')) {
      const fullCode = newCode.join('')
      handleCodeComplete(fullCode)
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleCodeComplete = (fullCode) => {
    if (onCodeComplete) {
      onCodeComplete(fullCode)
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.input, digit !== '' && styles.inputFilled]}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            placeholder="0"
            placeholderTextColor="#ccc"
          />
        ))}
      </View>
    </View>
  )
}

export default CodeVerificator