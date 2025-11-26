import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { commonUserStyles } from "../../../styles/commonUserStyles";
import { globalStyle } from "../../../styles/globalStyle";

import Header from "../../../layout/Header";
import Input from "../../../components/Input/";
import AccessibleView from "../../../components/AccessibleView/";
import { ArrowLeft, Save } from "lucide-react-native";
import api from "../../../services/api";

const CATEGORY_OPTIONS = [
  "Roupas", "Calçados", "Acessórios", "Eletrônicos", "Informática",
  "Alimentos", "Bebidas", "Móveis", "Decoração", "Livros",
  "Brinquedos", "Esportes", "Beleza", "Saúde", "Papelaria", 
  "Ferramentas", "Autopeças", "Pet Shop", "Limpeza", "Outros"
];

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: CATEGORY_OPTIONS[0],
    quantity: "",
    min: "",
    price: "",
    costPrice: ""
  });
  const navigation = useNavigation();
  const route = useRoute();
  const { onSuccess } = route.params || {};

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("Erro", "O campo Nome não pode estar vazio!");
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert("Erro", "O campo Descrição não pode estar vazio!");
      return false;
    }
    if (!formData.quantity || formData.quantity === "0") {
      Alert.alert("Erro", "O campo Quantidade não pode estar vazio!");
      return false;
    }
    if (!formData.min || formData.min === "0") {
      Alert.alert("Erro", "O campo Mínimo não pode estar vazio!");
      return false;
    }
    if (!formData.price.trim()) {
      Alert.alert("Erro", "O campo Preço não pode estar vazio!");
      return false;
    }
    if (!formData.costPrice.trim()) {
      Alert.alert("Erro", "O campo Custo de Preço não pode estar vazio!");
      return false;
    }
    return true;
  };

  const normalizePrice = (value) => {
    if (!value) return value;
    return value.replace(/^R\$\s*/i, "")
      .replace(/\s+/g, "")
      .replace(",", ".")
      .trim();
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const body = {
        product: {
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: normalizePrice(formData.price),
          costPrice: normalizePrice(formData.costPrice),
          quantity: formData.quantity,
          minQuantity: formData.min,
          category: formData.category
        }
      };

      const response = await api.post("/Company/inventory/create", body);

      Alert.alert(
        "Sucesso",
        "Produto registrado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              if (onSuccess) {
                onSuccess(response.data.product || response.data);
              }
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      const status = error.response?.status;
      if (status === 409) {
        Alert.alert("Erro", "Já existe um produto com esse nome.");
      } else if (status === 422) {
        Alert.alert("Erro", "A quantidade ou o preço informado é inválido.");
      } else if (status === 500) {
        Alert.alert("Erro", "Erro interno no servidor. Tente de novo mais tarde.");
      } else {
        Alert.alert("Erro", "Algo deu errado. Tente novamente.");
        console.log(error)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header title="Novo Produto" showBackButton onBackPress={() => navigation.goBack()} />
      <ScrollView style={commonUserStyles.screenBlock}>
        <AccessibleView style={{ marginTop: 20 }}>
          <Text style={commonUserStyles.screenTitle}>Registrar Novo Produto</Text>
          <View style={{ marginTop: 18 }}>
            <Input
              label="Nome"
              placeholder="Nome do produto"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              editable={!loading}
            />
            <Input
              label="Descrição"
              placeholder="Descrição do produto"
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              editable={!loading}
            />

            <Text style={styles.label}>Categoria</Text>
            <ScrollView horizontal style={{ marginBottom: 8 }}>
              <View style={styles.categoryRow}>
                {CATEGORY_OPTIONS.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryBtn,
                      formData.category === cat && styles.categoryBtnActive
                    ]}
                    onPress={() => handleInputChange("category", cat)}
                    disabled={loading}
                  >
                    <Text style={[
                      styles.categoryBtnText,
                      formData.category === cat && styles.categoryBtnTextActive
                    ]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Input
              label="Quantidade"
              placeholder="Quantidade atual"
              value={formData.quantity}
              onChangeText={(value) => handleInputChange("quantity", value.replace(/\D/g, ""))}
              keyboardType="numeric"
              editable={!loading}
            />
            <Input
              label="Quantidade Mínima"
              placeholder="Quantidade mínima para aviso"
              value={formData.min}
              onChangeText={(value) => handleInputChange("min", value.replace(/\D/g, ""))}
              keyboardType="numeric"
              editable={!loading}
            />
            <Input
              label="Preço de Venda"
              placeholder="Ex.: 39,99"
              value={formData.price}
              onChangeText={(value) => handleInputChange("price", value)}
              keyboardType="decimal-pad"
              editable={!loading}
            />
            <Input
              label="Preço de Custo"
              placeholder="Ex.: 22,50"
              value={formData.costPrice}
              onChangeText={(value) => handleInputChange("costPrice", value)}
              keyboardType="decimal-pad"
              editable={!loading}
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.cancelButton, loading && styles.buttonDisabled]}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <ArrowLeft size={20} color="#6B7280" />
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Save size={20} color="#FFF" />
                    <Text style={styles.saveButtonText}>Salvar Produto</Text>
                  </>
                )}
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
    color: "#1F2937"
  },
  categoryRow: {
    flexDirection: "row",
    gap: 8
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginHorizontal: 4
  },
  categoryBtnActive: {
    backgroundColor: `${globalStyle.primary}15`,
    borderColor: globalStyle.primary
  },
  categoryBtnText: {
    fontWeight: "500",
    color: "#6B7280"
  },
  categoryBtnTextActive: {
    color: globalStyle.primary
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
    marginBottom: 18
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
  buttonDisabled: {
    opacity: 0.5,
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

export default NewProduct;