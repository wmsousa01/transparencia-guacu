"use client";  // Componente Client para permitir o uso de hooks

export default function Hero({ totalDespesas, totalReceitas, ano }) {
  const despesasPercent = totalReceitas > 0 ? (totalDespesas / totalReceitas) * 100 : 0;
  const resultadoFinal = totalReceitas - totalDespesas;
  const resultadoTexto = resultadoFinal >= 0 ? "Superávit" : "Déficit";

  return (
    <section className="hero">
      <div className="container">
        <h1>Comparativo de Receitas vs Despesas - {ano}</h1>
        <div className="totals">
          <div>
            <h2>Total Receitas: R$ {totalReceitas.toLocaleString('pt-BR')}</h2>
          </div>
          <div>
            <h2>Total Despesas Empenhadas: R$ {totalDespesas.toLocaleString('pt-BR')}</h2>
          </div>
        </div>

        <div className="resultado">
          <h2>Resultado Final: {resultadoTexto} de R$ {Math.abs(resultadoFinal).toLocaleString('pt-BR')}</h2>
        </div>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${despesasPercent}%`, backgroundColor: 'red' }}
          >
            {despesasPercent.toFixed(2)}% Despesas
          </div>
        </div>
      </div>

      {/* Estilos básicos para o Hero */}
      <style jsx>{`
        .hero {
          background-color: #f8f9fa;
          padding: 2rem;
          text-align: center;
        }
        .totals {
          display: flex;
          justify-content: space-around;
          margin-bottom: 1rem;
        }
        .resultado {
          margin-bottom: 1rem;
        }
        .progress-bar {
          height: 30px;
          background-color: #e9ecef;
          border-radius: 5px;
          overflow: hidden;
          margin: 1rem 0;
        }
        .progress {
          height: 100%;
          line-height: 30px;
          color: white;
          text-align: center;
        }
      `}</style>
    </section>
  );
}
