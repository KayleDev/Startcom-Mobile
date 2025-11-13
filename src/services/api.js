import axios from "axios";

const api = axios.create({
  baseURL:  "http://127.0.0.1:8000", // Backend URL
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerAPI = async (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error("Dados inválidos para registro");
  }

  if (data.password.length < 8) {
    throw new Error("Senha inválida");
  }
  
  try {
    console.log(data);
    const userData = {
      name: data.name,
      email: data.email,
      birth_date: new Date(data.date).toISOString(),
      phone_number: `+55${data.phone.replace(/\D/g, '')}`,
      cpf_cnpj: (data.document).replace(/\D/g, ''),
      password: data.password
    }
    
    const response = await api.post("/User/register", userData);

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Erro no registro");
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.response.data || error);
    console.error(error.response.data.detail || "Erro desconhecido");
    throw error;
  }
};

export const loginAPI = async (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error("Dados inválidos para login");
  }

  if (data.password.length < 8) {
    throw new Error("Senha inválida");
  }

  try {
    console.log(data);
    const userData = {
      email: data.email,
      password: data.password
    }

    const response = await api.post("/Auth/login", userData);

    if (response.data.success || response.data.token) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Erro no login");
    }

  } catch (error) {
    console.error("Erro ao realizar login:", error);
    throw error;
  }
};

export default api;
