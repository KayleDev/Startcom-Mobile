import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles'

const ProductCard = ({title, value, icon, color, extra}) => {
  return (
    <View style={styles.card}>
        <View style={styles.group}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <View style={[styles.icon, {borderColor: color}]}>{icon}</View>
        </View>
        <Text style={[styles.extra, {color}]}>{extra}</Text>
    </View>
  )
}

export default ProductCard