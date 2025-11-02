import { View, Text, TouchableOpacity } from "react-native"
import { Eye, Download, ChartColumn } from 'lucide-react-native'
import { styles } from "./styles"
import { globalStyle } from "../../styles/globalStyle"

import AccessibleView from "../AccessibleView"

const GeneratedReportCard = ({title, description, type, size, date, state}) => {
  return (
    <AccessibleView style={styles.card}>
      <AccessibleView style={[styles.iconBoxPrincipal, {borderColor: globalStyle.primary}]}><ChartColumn color={globalStyle.primary} size={24}/></AccessibleView>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.type}>Tipo: {type}</Text>
      <Text style={styles.size}>Tamanho: {size}</Text>
      <Text style={styles.date}>Data: {date}</Text>

      {state ? 
      <View style={styles.box}>
          <AccessibleView style={styles.prepared}><Text style={styles.textPrepared}>Pronto</Text></AccessibleView>
          <TouchableOpacity style={styles.iconBox}><Eye/></TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}><Download/></TouchableOpacity>
      </View> 
      : 
      <AccessibleView style={styles.unprepared}>
        <Text style={styles.textUnprepared}>Processando</Text>
      </AccessibleView>
      }
      
    </AccessibleView>
  )
}

export default GeneratedReportCard