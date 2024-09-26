import axios from 'axios';

// Função para buscar todas as despesas de um município específico
export async function fetchDespesas(municipio, exercicio, mes) {
  const url = `https://transparencia.tce.sp.gov.br/api/json/despesas/${municipio}/${exercicio}/${mes}`;
  
  try {
    const response = await axios.get(url);
    return response.data; // Retorna todas as despesas
  } catch (error) {
    console.error('Erro ao buscar despesas do município', error);
    throw new Error('Erro ao buscar despesas');
  }
}

// Função para buscar apenas despesas empenhadas
export async function fetchDespesasEmpenhadas(municipio, exercicio, mes) {
  const url = `https://transparencia.tce.sp.gov.br/api/json/despesas/${municipio}/${exercicio}/${mes}`;
  
  try {
    const response = await axios.get(url);
    return response.data.filter(despesa => despesa.evento === "Empenhado"); // Filtra apenas as despesas empenhadas
  } catch (error) {
    console.error('Erro ao buscar despesas empenhadas', error);
    throw new Error('Erro ao buscar despesas empenhadas');
  }
}

// Função para buscar receitas de um município específico
export async function fetchReceitas(municipio, exercicio, mes) {
  const url = `https://transparencia.tce.sp.gov.br/api/json/receitas/${municipio}/${exercicio}/${mes}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar receitas do município', error);
    throw new Error('Erro ao buscar receitas');
  }
}
