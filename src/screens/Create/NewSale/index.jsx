import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { commonUserStyles } from "../../../styles/commonUserStyles";
import { globalStyle } from "../../../styles/globalStyle";

import Header from "../../../layout/Header";
import AccessibleView from "../../../components/AccessibleView/";
import Input from "../../../components/Input/";
import { ArrowLeft, Save } from "lucide-react-native";
import api from "../../../services/api";

const NewSale = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onSuccess } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    client: "",
    productId: "",
    quantity: "",
    price: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchClients();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.post("/Company/inventory/full");
      const list = response.data?.products || [];
      setProducts(list);

      if (list.length === 0) {
        Alert.alert("Erro", "Você não possui produtos cadastrados para realizar uma venda.", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
        return;
      }
    } catch (e) {
      Alert.alert("Erro", "Erro ao carregar produtos!");
    }
    setLoading(false);
  };

  const fetchClients = async () => {
    try {
      const response = await api.post("/Company/clients/names");
      setClients(response.data?.clients || []);
    } catch (e) {
    }
  };

  // Autocomplete cliente
  const handleClientChange = (value) => {
    setFormData((prev) => ({ ...prev, client: value }));

    if (!value.trim() || clients.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = clients.filter((name) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  const selectClient = (name) => {
    setFormData(prev => ({ ...prev, client: name }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleProductChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      productId: id,
      price: getProductPrice(id)
    }));
  };

  const getProductPrice = (id) => {
    const prod = products.find(p => p._id === id);
    if (!prod) return "";
    return prod.price ? String(prod.price).replace(".", ",") : "";
  };

  const validateForm = () => {
    if (!formData.client.trim()) {
      Alert.alert("Erro", "O campo Cliente não pode estar vazio!");
      return false;
    }
    if (!formData.productId) {
      Alert.alert("Erro", "Selecione um produto!");
      return false;
    }
    if (!formData.quantity || isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      Alert.alert("Erro", "Selecione uma quantidade válida!");
      return false;
    }
    if (!formData.price.trim()) {
      Alert.alert("Erro", "O campo Valor não pode estar vazio!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const selectedProduct = products.find((p) => p._id === formData.productId);

    const payload = {
      clientName: formData.client,
      items: [{
        productName: selectedProduct.name,
        quantity: Number(formData.quantity),
        price: selectedProduct.price,
      }],
    };

    try {
      setButtonLoading(true);
      await api.post("/Company/sales/create_sale", payload);

      Alert.alert(
        "Sucesso",
        "Venda registrada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              if (onSuccess) { onSuccess(); }
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      const status = error.response?.status;
      const backendMsg = error.response?.data?.message;

      if (status === 422) {
        Alert.alert("Erro", "A quantidade informada é inválida.");
      } else {
        Alert.alert("Erro", backendMsg || "Não foi possível registrar a venda.");
      }
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header title="Nova Venda" showBackButton onBackPress={() => navigation.goBack()} />
      <ScrollView style={commonUserStyles.screenBlock}>
        <AccessibleView style={{ marginTop: 20 }}>
          <Text style={commonUserStyles.screenTitle}>Registrar Nova Venda</Text>
          <View style={{ marginTop: 18 }}>
            <Input
              label="Cliente"
              placeholder="Insira o nome do cliente"
              value={formData.client}
              onChangeText={handleClientChange}
              editable={!loading && !buttonLoading}
              autoCapitalize="words"
            />
            {showSuggestions && (
              <View style={styles.suggestionBox}>
                <FlatList
                  data={suggestions}
                  keyExtractor={(item, i) => `${item}-${i}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => selectClient(item)}
                      style={styles.suggestionItem}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            <Text style={styles.label}>Produto</Text>
            <View style={styles.dropdownRow}>
              <ScrollView horizontal>
                {products.map((p) => (
                  <TouchableOpacity
                    key={p._id}
                    style={[
                      styles.dropdownOption,
                      formData.productId === p._id && styles.dropdownOptionActive
                    ]}
                    onPress={() => handleProductChange(p._id)}
                    disabled={loading || buttonLoading}
                  >
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        formData.productId === p._id && styles.dropdownOptionTextActive
                      ]}
                    >
                      {p.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Input
              label="Quantidade"
              placeholder="Quantidade do produto"
              value={formData.quantity}
              onChangeText={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: value.replace(/\D/g, ""),
                }))
              }
              keyboardType="numeric"
              editable={!loading && !buttonLoading}
            />

            <Input
              label="Valor"
              placeholder="Preço do produto"
              value={formData.price}
              editable={false}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.cancelButton, buttonLoading && styles.buttonDisabled]}
                onPress={() => navigation.goBack()}
                disabled={buttonLoading}
              >
                <ArrowLeft size={20} color="#6B7280" />
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, buttonLoading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={buttonLoading}
              >
                {buttonLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Save size={20} color="#FFF" />
                    <Text style={styles.saveButtonText}>Salvar Venda</Text>
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
  dropdownRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 8
  },
  dropdownOptionActive: {
    borderColor: globalStyle.primary,
    backgroundColor: `${globalStyle.primary}15`,
  },
  dropdownOptionText: {
    color: "#6B7280",
    fontWeight: "500"
  },
  dropdownOptionTextActive: {
    color: globalStyle.primary,
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
  suggestionBox: {
    position: "relative",
    zIndex: 12,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    maxHeight: 140,
    marginTop: -8,
    marginBottom: 8,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
};

export default NewSale;