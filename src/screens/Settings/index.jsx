import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Alert, TouchableOpacity, Switch, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";
import { Save, Building, Bell, PersonStanding } from "lucide-react-native";
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import Input from "../../components/Input";
import PreferenceItem from "../../components/PreferenceItem";
import { formatCPF, formatCNPJ, formatPhone } from "../../utils/masks";
import { validateCPF, validateCNPJ, validatePhone } from "../../utils/validations";
import AccessibleView from "../../components/AccessibleView";
import { commonUserStyles } from "../../styles/commonUserStyles";
import { globalStyle } from "../../styles/globalStyle";
import { useAccessibility } from "../../contexts/AccessibilityContext";

const Settings = () => {
  const [businessName, setBusinessName] = useState("");
  const [document, setDocument] = useState("");
  const [cpfMode, setCpfMode] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [initialData, setInitialData] = useState({});

  const navigation = useNavigation();
  const route = useRoute();
  const { increasedSpacing, setIncreasedSpacing } = useAccessibility();

  const [notifications, setNotifications] = useState({
    estoqueBaixo: true,
    novasVendas: true,
    relatorios: false,
    novoCliente: true,
    lembretes: true,
  });

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const { data } = await api.get("/User/my-company");
        const phoneRaw = data.phone_number || "";
        const cleanedPhone = phoneRaw.startsWith("+55") ? phoneRaw.replace("+55", "") : phoneRaw;

        let docRaw = data.cpf_cnpj ? data.cpf_cnpj.replace(/\D/g, "") : "";
        let cpf = docRaw.length <= 11;
        setCpfMode(cpf);

        setDocument(docRaw);

        setBusinessName(data.name || "");
        setEmail(data.email || "");
        setPhone(cleanedPhone);
        setAddress(data.address || "");
        setInitialData({
          businessName: data.name || "",
          document: docRaw,
          cpfMode: cpf,
          email: data.email || "",
          phone: cleanedPhone,
          address: data.address || "",
        });

      } catch (err) {
        Alert.alert("Erro", "Erro ao carregar dados da empresa");
      }
    };
    loadCompany();
  }, []);

  const formattedDocument = cpfMode
    ? formatCPF(document)
    : formatCNPJ(document);

  const handleDocumentChange = (value) => {
    const digits = value.replace(/\D/g, "");
    setDocument(digits);

    if (digits.length <= 11) {
      setCpfMode(true);
    } else if (digits.length >= 12) {
      setCpfMode(false);
    }
  };

  const handleCpfCnpjToggle = () => {
    setCpfMode(prev => !prev);
  };

  const hasChanges =
    initialData &&
    (
      businessName.trim() !== (initialData.businessName || "").trim() ||
      document.trim() !== (initialData.document || "").trim() ||
      cpfMode !== initialData.cpfMode ||
      email.trim() !== (initialData.email || "").trim() ||
      phone.trim() !== (initialData.phone || "").trim() ||
      address.trim() !== (initialData.address || "").trim()
    );

  const validateForm = () => {
    if (!businessName.trim()) {
      Alert.alert("Erro", "Nome da empresa é obrigatório");
      return false;
    }
    if (!document.trim()) {
      Alert.alert("Erro", `${cpfMode ? "CPF" : "CNPJ"} é obrigatório`);
      return false;
    }
    if (cpfMode) {
      if (!validateCPF(document)) {
        Alert.alert("Erro", "CPF inválido");
        return false;
      }
    } else {
      if (!validateCNPJ(document)) {
        Alert.alert("Erro", "CNPJ inválido");
        return false;
      }
    }
    if (!email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      Alert.alert("Erro", "Email é obrigatório e deve ser válido");
      return false;
    }
    if (!phone.trim() || !validatePhone(phone)) {
      Alert.alert("Erro", "Telefone é obrigatório e deve ser válido");
      return false;
    }
    if (!address.trim()) {
      Alert.alert("Erro", "Endereço é obrigatório");
      return false;
    }
    return true;
  };

  const handleChanges = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const payload = {
        name: businessName.trim(),
        cpf_cnpj: document,
        email: email.trim(),
        telephone: `+55${phone.replace(/\D/g, "")}`,
        address: address.trim(),
      };
      await api.put("/User/my-company", payload);

      Alert.alert("Sucesso", "Informações atualizadas com sucesso!");

      setInitialData({
        businessName: businessName.trim(),
        document: document,
        cpfMode: cpfMode,
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim()
      });

    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar alterações");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Configurações"
      />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>Configurações</Text>
        <Text style={commonUserStyles.screenDescription}>
          Gerencie as preferências da sua conta e notificações
        </Text>

        <View style={styles.settingContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <Building size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Perfil da Empresa</Text>
          </View>

          <Input
            label="Nome da Empresa"
            placeholder="Minha Empresa"
            value={businessName}
            onChangeText={setBusinessName}
          />

          <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 14 }}>
            <TouchableOpacity
              style={[styles.toggleBtn, cpfMode && styles.toggleBtnActive]}
              onPress={() => setCpfMode(true)}
            >
              <Text style={cpfMode ? styles.toggleTextActive : styles.toggleText}>CPF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, !cpfMode && styles.toggleBtnActive]}
              onPress={() => setCpfMode(false)}
            >
              <Text style={!cpfMode ? styles.toggleTextActive : styles.toggleText}>CNPJ</Text>
            </TouchableOpacity>
          </View>

          <Input
            label={cpfMode ? "CPF" : "CNPJ"}
            placeholder={cpfMode ? "000.000.000-00" : "00.000.000/0000-00"}
            value={formattedDocument}
            onChangeText={handleDocumentChange}
            keyboardType="numeric"
            maxLength={cpfMode ? 14 : 18}
          />

          <Input
            label="E-mail"
            keyboardType="email-address"
            placeholder="email@gmail.com"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            label="Telefone"
            placeholder="(13) 99999-9999"
            value={formatPhone(phone)}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={15}
          />

          <Input
            label="Endereço"
            placeholder="Rua Exemplo, 123"
            value={address}
            onChangeText={setAddress}
          />

          <TouchableOpacity
            style={[
              styles.button,
              (!hasChanges || loading) && styles.buttonDisabled
            ]}
            onPress={handleChanges}
            disabled={!hasChanges || loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <View style={commonUserStyles.alignButtonText}>
                <Save size={20} color="#FFFFFF" />
                <Text style={commonUserStyles.saveText}>Salvar Alterações</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.notificationContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <Bell size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Notificações</Text>
          </View>
          <PreferenceItem
            title="Estoque Baixo"
            description="Receber alerta quando um produto atingir o estoque mínimo."
            value={notifications.estoqueBaixo}
            onToggle={value =>
              setNotifications(prev => ({ ...prev, estoqueBaixo: value }))
            }
          />
          <PreferenceItem
            title="Novas Vendas"
            description="Receber notificação a cada nova venda concluída."
            value={notifications.novasVendas}
            onToggle={value =>
              setNotifications(prev => ({ ...prev, novasVendas: value }))
            }
          />
          <PreferenceItem
            title="Relatórios Semanais"
            description="Receber um resumo do desempenho da semana por e-mail."
            value={notifications.relatorios}
            onToggle={value =>
              setNotifications(prev => ({ ...prev, relatorios: value }))
            }
          />
          <PreferenceItem
            title="Novo Cliente"
            description="Receber aviso sempre que um novo cliente for cadastrado no sistema."
            value={notifications.novoCliente}
            onToggle={value =>
              setNotifications(prev => ({ ...prev, novoCliente: value }))
            }
          />
          <PreferenceItem
            title="Lembretes de Tarefas"
            description="Ser lembrado de tarefas pendentes e agendadas."
            value={notifications.lembretes}
            onToggle={value =>
              setNotifications(prev => ({ ...prev, lembretes: value }))
            }
          />
        </View>

        <View style={styles.accessibilityContainer}>
          <View style={commonUserStyles.sectionTitleContainer}>
            <PersonStanding size={24} color={globalStyle.primary} />
            <Text style={commonUserStyles.sectionTitle}>Acessibilidade</Text>
          </View>
          <PreferenceItem
            title="Espaçamento Vertical Ampliado"
            description="Aumenta o espaçamento entre os elementos para melhor leitura."
            value={!!increasedSpacing}
            onToggle={value => setIncreasedSpacing(value ? 8 : 0)}
          />
        </View>
      </ScrollView>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navigation={navigation}
        currentRoute={route.name}
      />
    </SafeAreaView>
  );
};

const styles = {
  settingContainer: {
    marginBottom: 22,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#0002",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  notificationContainer: {
    marginBottom: 22,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#0002",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  accessibilityContainer: {
    marginBottom: 22,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#0002",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  button: {
    alignSelf: "center",
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: globalStyle.primary,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 6,
    backgroundColor: "#FFF",
  },
  toggleBtnActive: {
    borderColor: globalStyle.primary,
    backgroundColor: `${globalStyle.primary}15`,
  },
  toggleText: {
    color: "#6B7280",
    fontWeight: '600'
  },
  toggleTextActive: {
    color: globalStyle.primary,
    fontWeight: 'bold'
  },
};

export default Settings;