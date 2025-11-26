import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { commonUserStyles } from "../../../styles/commonUserStyles";
import { globalStyle } from "../../../styles/globalStyle";

import Header from "../../../layout/Header";
import AccessibleView from "../../../components/AccessibleView/";
import { ArrowLeft, Save } from "lucide-react-native";

const TOPIC_OPTIONS = ["Vendas", "Clientes", "Estoque"];
const FORMAT_OPTIONS = ["PDF", "EXCEL"];
const PERIOD_OPTIONS = ["Última semana", "Último mês", "Último ano"];

const NewReport = () => {
  const navigation = useNavigation();
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [format, setFormat] = useState(FORMAT_OPTIONS[0]);
  const [period, setPeriod] = useState(PERIOD_OPTIONS[0]);

  const handleSubmit = () => {
    const data = { type: topic, format, period };
    console.log("Dados validados:", data);

    Alert.alert(
      "Sucesso",
      "Relatório gerado com sucesso!",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header title="Novo Relatório" showBackButton onBackPress={() => navigation.goBack()} />
      <ScrollView style={commonUserStyles.screenBlock}>
        <AccessibleView style={{ marginTop: 20 }}>
          <Text style={commonUserStyles.screenTitle}>Gerar Novo Relatório</Text>
          <View style={{ marginTop: 18 }}>
            <Text style={styles.label}>Tópico</Text>
            <View style={styles.row}>
              {TOPIC_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.optionButton,
                    topic === opt && styles.optionButtonActive
                  ]}
                  onPress={() => setTopic(opt)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      topic === opt && styles.optionButtonTextActive
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Formato</Text>
            <View style={styles.row}>
              {FORMAT_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.optionButton,
                    format === opt && styles.optionButtonActive
                  ]}
                  onPress={() => setFormat(opt)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      format === opt && styles.optionButtonTextActive
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Período</Text>
            <View style={styles.row}>
              {PERIOD_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.optionButton,
                    period === opt && styles.optionButtonActive
                  ]}
                  onPress={() => setPeriod(opt)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      period === opt && styles.optionButtonTextActive
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
              >
                <ArrowLeft size={20} color="#6B7280" />
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
              >
                <Save size={20} color="#FFF" />
                <Text style={styles.saveButtonText}>Gerar Relatório</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AccessibleView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 18,
    marginBottom: 6,
    color: "#1F2937",
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: "#FFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    alignItems: "center",
  },
  optionButtonActive: {
    backgroundColor: `${globalStyle.primary}15`,
    borderColor: globalStyle.primary,
  },
  optionButtonText: {
    fontWeight: "500",
    color: "#6B7280",
    fontSize: 15,
  },
  optionButtonTextActive: {
    color: globalStyle.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
    marginBottom: 18,
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFF",
    gap: 8,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: globalStyle.primary,
    gap: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
};

export default NewReport;