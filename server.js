const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// Definir o esquema GraphQL
const typeDefs = gql`
  type Despesa {
    orgao: String
    mes: String
    evento: String
    nr_empenho: String
    id_fornecedor: String
    nm_fornecedor: String
    dt_emissao_despesa: String
    vl_despesa: Float
  }

  type Receita {
    orgao: String
    mes: String
    ds_fonte_recurso: String
    vl_arrecadacao: Float
  }

  type Query {
    despesas(municipio: String!, ano: Int!, mes: Int!): [Despesa]
    receitas(municipio: String!, ano: Int!, mes: Int!): [Receita]
  }
`;

// Resolvers para as consultas
const resolvers = {
  Query: {
    despesas: async (_, { municipio, ano, mes }) => {
      try {
        const response = await axios.get(`https://transparencia.tce.sp.gov.br/api/json/despesas/${municipio}/${ano}/${mes}`);
        return response.data.map(despesa => ({
          ...despesa,
          vl_despesa: parseFloat(despesa.vl_despesa.replace(',', '.')) // Converter valor para Float
        }));
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        throw new Error('Erro ao buscar despesas');
      }
    },
    receitas: async (_, { municipio, ano, mes }) => {
      try {
        const response = await axios.get(`https://transparencia.tce.sp.gov.br/api/json/receitas/${municipio}/${ano}/${mes}`);
        return response.data.map(receita => ({
          ...receita,
          vl_arrecadacao: parseFloat(receita.vl_arrecadacao.replace(',', '.')) // Converter valor para Float
        }));
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
        throw new Error('Erro ao buscar receitas');
      }
    }
  }
};

// Configurar o Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Rodar o servidor
server.listen().then(({ url }) => {
  console.log(`🚀  Servidor GraphQL rodando em ${url}`);
});
