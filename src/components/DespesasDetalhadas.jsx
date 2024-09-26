"use client";  // Componente Client para permitir o uso de hooks

export default function DespesasDetalhadas({ despesasPorEvento }) {
  return (
    <section className="despesas-detalhadas">
      <h2>Despesas Detalhadas por Evento</h2>
      <div className="detalhes">
        {Object.keys(despesasPorEvento).length > 0 ? (
          Object.keys(despesasPorEvento).map((evento, index) => (
            <div key={index} className="evento-detalhe">
              <h3>{evento}:</h3>
              <p>Valor Total: R$ {despesasPorEvento[evento].toLocaleString('pt-BR')}</p>
            </div>
          ))
        ) : (
          <p>Nenhum dado disponível.</p>
        )}
      </div>

      {/* Estilos básicos para Despesas Detalhadas */}
      <style jsx>{`
        .despesas-detalhadas {
          padding: 1rem;
          background-color: #f1f1f1;
          border-radius: 8px;
          margin-top: 2rem;
        }
        .evento-detalhe {
          margin-bottom: 1rem;
        }
        h3 {
          color: #0056b3;
        }
        p {
          font-size: 1rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
