import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://api.startcomtech.com.br/",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@app:token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 403) {
      global.modalEmitter?.emit("modal", { code: "forbidden", action: "home" });
    }

    if (status === 419) {
      global.modalEmitter?.emit("modal", { code: "expired", action: "login" });

      await AsyncStorage.removeItem("@app:token");
      await AsyncStorage.removeItem("@app:user");
    }

    return Promise.reject(error);
  }
);

export const registerAPI = async (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error("Dados inválidos para registro");
  }

  try {
    const userData = {
      name: data.name,
      email: data.email,
      birth_date: new Date(data.date).toISOString(),
      phone_number: `+55${data.telefone.replace(/\D/g, '')}`,
      cpf_cnpj: (data.cpf || data.cnpj).replace(/\D/g, ''),
      password: data.password
    };

    const response = await api.post("/User/register", userData);
    console.log(response.data)
    if (response.data) return response.data;
    throw new Error("Erro ao registrar");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.response?.data || error);
    throw error;
  }
};
export const loginAPI = async (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error("Dados inválidos para login");
  }

  try {
    const response = await api.post("/Auth/login", {
      email: data.email,
      password: data.password
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao realizar login:", error.response?.data || error);
    throw error;
  }
};

export default api;