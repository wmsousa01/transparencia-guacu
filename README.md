# Transparência Guacu

Este projeto tem como objetivo fornecer transparência sobre as receitas e despesas do município de Mogi Guaçu, utilizando dados abertos fornecidos pela API do Tribunal de Contas do Estado de São Paulo (TCESP). A plataforma permite visualizar a consolidação de despesas empenhadas, além de detalhar despesas por evento e comparar com as receitas municipais.

## Funcionalidades

- Visualização total de **receitas** e **despesas empenhadas**.
- Detalhamento de **despesas** por evento (empenhado, liquidado, pago, etc.).
- Filtro de dados por ano, permitindo ao usuário selecionar diferentes períodos.
- Integração com a API do Tribunal de Contas do Estado de São Paulo (TCESP).

## Tecnologias Utilizadas

- **Next.js**: Framework React para a criação de interfaces dinâmicas.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios**: Biblioteca para requisições HTTP, utilizada para consumir a API do TCESP.
- **GraphQL**: Usado para melhorar a organização das requisições de dados.
- **Tailwind CSS**: Framework CSS para estilização rápida e customizável.
  
## Instalação e Execução

### Pré-requisitos

- Node.js (versão 14.x ou superior)
- NPM ou Yarn

### Clonando o projeto

```bash
git clone https://github.com/wmsousa01/transparencia-guacu.git
cd transparencia-guacu

### Instalando dependências

```bash
npm install
# ou se estiver usando Yarn
yarn install

###Executando o projeto

npm run dev
# ou com Yarn
yarn dev

