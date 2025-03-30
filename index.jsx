
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0.3);
  const [interestRate, setInterestRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const loanAmount = purchasePrice * (1 - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = term * 12;
  const monthlyPayment = loanAmount
    ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments))
    : 0;

  const closingCosts = loanAmount * 0.03;
  const cashToClose = purchasePrice * downPayment + closingCosts;

  return (
    <>
      <Head>
        <title>Calculadora de Préstamos</title>
      </Head>
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
        <h1 style={{ textAlign: 'center' }}>Calculadora de Préstamos</h1>
        <label>Precio de compra</label>
        <input
          type="number"
          onChange={(e) => setPurchasePrice(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <label>% Down Payment (ej. 0.3 para 30%)</label>
        <input
          type="number"
          step="0.01"
          onChange={(e) => setDownPayment(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <label>Tasa de interés (%)</label>
        <input
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <label>Término (años)</label>
        <input
          type="number"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '20px' }}
        />

        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <p><strong>Loan Amount:</strong> ${loanAmount.toLocaleString()}</p>
          <p><strong>Pago mensual (P&I):</strong> ${monthlyPayment.toFixed(2)}</p>
          <p><strong>Costos de cierre (3% estimado):</strong> ${closingCosts.toLocaleString()}</p>
          <p><strong>Total a llevar al cierre:</strong> ${cashToClose.toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}
