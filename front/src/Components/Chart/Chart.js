import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();
  const getEmailFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('email');
  };
  const email = getEmailFromURL(); // Assuming getEmailFromURL function exists

  const filteredIncomes = incomes.filter((income) => income.email === email);
  const filteredExpenses = expenses.filter((expense) => expense.email === email);

  const data = {
    labels: filteredIncomes.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: 'Income',
        data: filteredIncomes.map((income) => income.amount),
        backgroundColor: 'green',
        tension: 0.2,
      },
      {
        label: 'Expenses',
        data: filteredExpenses.map((expense) => expense.amount),
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 100%;
`;

export default Chart;
