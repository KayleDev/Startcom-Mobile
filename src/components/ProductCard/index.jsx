import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles'
import AccessibleView from '../AccessibleView'

const ProductCard = ({title, value, icon, color, extra}) => {
  return (
    <AccessibleView style={styles.card}>
        <View style={styles.group}>
            <AccessibleView>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </AccessibleView>
            <View style={[styles.icon, {borderColor: color}]}>{icon}</View>
        </View>
        <Text style={[styles.extra, {color}]}>{extra}</Text>
    </AccessibleView>
  )
}

export default ProductCard