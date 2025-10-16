import { View, Text, TouchableOpacity } from "react-native"
import { Eye, Download, ChartColumn } from 'lucide-react-native'
import { styles } from "./styles"
import { globalStyle } from "../../styles/globalStyle"

const GeneratedReportCard = ({title, description, type, size, date, state}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBoxPrincipal, {borderColor: globalStyle.primary}]}><ChartColumn color={globalStyle.primary} size={24}/></View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.type}>Tipo: {type}</Text>
      <Text style={styles.size}>Tamanho: {size}</Text>
      <Text style={styles.date}>Data: {date}</Text>

      {state ? 
      <View style={styles.box}>
          <View style={styles.prepared}><Text style={styles.textPrepared}>Pronto</Text></View>
          <TouchableOpacity style={styles.iconBox}><Eye/></TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}><Download/></TouchableOpacity>
      </View> 
      : 
      <View style={styles.unprepared}>
        <Text style={styles.textUnprepared}>Processando</Text>
      </View>
      }
      
    </View>
  )
}

export default GeneratedReportCard