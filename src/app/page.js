"use client";
import { useEffect, useState } from 'react';
import DespesasDetalhadas from '../components/DespesasDetalhadas';
import Hero from '../components/Hero';  
import { fetchDespesas, fetchDespesasEmpenhadas, fetchReceitas } from '../api/tce'; 

export default function Home() {
  const [despesasPorEvento, setDespesasPorEvento] = useState({});
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear()); 

  // Função para agrupar despesas por evento
  function agruparDespesasPorEvento(despesas) {
    const despesasAgrupadas = {};
    despesas.forEach(despesa => {
      const evento = despesa.evento;
      const valor = parseFloat(despesa.vl_despesa.replace(/\./g, '').replace(',', '.'));
      if (despesasAgrupadas[evento]) {
        despesasAgrupadas[evento] += valor;
      } else {
        despesasAgrupadas[evento] = valor;
      }
    });
    return despesasAgrupadas;
  }

  // Função para carregar receitas e despesas por ano
  useEffect(() => {
    async function carregarDados() {
      try {
        let despesasTotal = 0;
        let receitasTotal = 0;
        let despesasAgrupadas = {};

        // Loop para carregar dados de todos os meses
        for (let mes = 1; mes <= 12; mes++) {
          const despesas = await fetchDespesas('mogi-guacu', anoSelecionado, mes);
          const despesasEmpenhadas = await fetchDespesasEmpenhadas('mogi-guacu', anoSelecionado, mes);
          const receitas = await fetchReceitas('mogi-guacu', anoSelecionado, mes);

          // Agrupando despesas por evento
          despesasAgrupadas = {
            ...despesasAgrupadas,
            ...agruparDespesasPorEvento(despesas)
          };

          // Somando total de despesas empenhadas e receitas
          despesasTotal += despesasEmpenhadas.reduce((total, item) => total + parseFloat(item.vl_despesa.replace(/\./g, '').replace(',', '.')), 0);
          receitasTotal += receitas.reduce((total, item) => total + parseFloat(item.vl_arrecadacao.replace(/\./g, '').replace(',', '.')), 0);
        }

        // Atualiza os estados
        setTotalDespesas(despesasTotal); // Somente despesas empenhadas
        setTotalReceitas(receitasTotal); // Receitas totais
        setDespesasPorEvento(despesasAgrupadas); // Despesas agrupadas por evento
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    }

    carregarDados(); // Carregar dados quando o ano muda
  }, [anoSelecionado]);

  // Manipula a mudança de ano
  const handleAnoChange = (event) => {
    setAnoSelecionado(event.target.value);
  };

  return (
    <main>
      <section>
        <label htmlFor="ano">Selecione o ano:</label>
        <select id="ano" value={anoSelecionado} onChange={handleAnoChange}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </section>

      {/* Componente Hero com comparativo de Receitas vs Despesas */}
      <Hero totalDespesas={totalDespesas} totalReceitas={totalReceitas} ano={anoSelecionado} />

      {/* Passa despesasPorEvento como prop para DespesasDetalhadas */}
      <DespesasDetalhadas despesasPorEvento={despesasPorEvento} />

      {/* Outros conteúdos */}
      <section>
        <h2>Outros Conteúdos</h2>
        <p>Aqui você pode adicionar mais seções ou informações sobre a ONG, como missão, valores, etc.</p>
      </section>

      <style jsx>{`
        main {
          padding: 2rem;
          background-color: #fff;
          color: #333;
        }
        section {
          margin-top: 2rem;
        }
        h2 {
          margin-bottom: 1rem;
          color: #0056b3;
        }
        p {
          font-size: 1rem;
          line-height: 1.6;
        }
        label {
          margin-right: 0.5rem;
          font-weight: bold;
        }
        select {
          padding: 0.5rem;
          font-size: 1rem;
        }
      `}</style>
    </main>
  );
}
