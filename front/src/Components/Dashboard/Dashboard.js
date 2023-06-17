import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const getEmailFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('email');
  };

  const email = getEmailFromURL();

  const filteredIncomes = incomes.filter((income) => income.email === email);
  const filteredExpenses = expenses.filter((expense) => expense.email === email);

  const calculateTotalIncome = () => {
    return filteredIncomes.reduce((total, income) => total + income.amount, 0);
  };

  const calculateTotalExpenses = () => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateTotalBalance = () => {
    return calculateTotalIncome() - calculateTotalExpenses();
  };

  const minIncome = Math.min(...filteredIncomes.map((item) => item.amount));
  const maxIncome = Math.max(...filteredIncomes.map((item) => item.amount));
  const minExpense = Math.min(...filteredExpenses.map((item) => item.amount));
  const maxExpense = Math.max(...filteredExpenses.map((item) => item.amount));

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {rupee} {calculateTotalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {rupee} {calculateTotalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {rupee} {calculateTotalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span> Max
            </h2>
            <div className="salary-item">
              <p>{isFinite(minIncome) ? `Rs ${minIncome}` : 'Not Available'}</p>
              <p>{isFinite(maxIncome) ? `Rs ${maxIncome}` : 'Not Available'}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span> Max
            </h2>
            <div className="salary-item">
              <p>{isFinite(minExpense) ? `Rs ${minExpense}` : 'Not Available'}</p>
              <p>{isFinite(maxExpense) ? `Rs ${maxExpense}` : 'Not Available'}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
  }

  .chart-con {
    grid-column: 1 / 4;
    height: 400px;
  }

  .amount-con {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }

  .income,
  .expense,
  .balance {
    background: #6da398;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
  }

  .income,
  .expense {
    grid-column: span 2;
  }

  .balance {
    grid-column: 1 / 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #a1bdbd;
    
    p {
      color: var(--color-green);
      opacity: 0.6;
      font-size: 4.5rem;
    }
  }

  .history-con {
    grid-column: 4 / -1;
  }

  .salary-title {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    
    span {
      font-size: 1.8rem;
    }
  }

  .salary-item {
    background: #457385;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 600;
      font-size: 1.6rem;
    }
  }
`;

export default Dashboard;
