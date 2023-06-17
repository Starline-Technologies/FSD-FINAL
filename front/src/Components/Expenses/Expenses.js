import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { rupee } from '../../utils/Icons';

function Expenses() {
  const { addIncome, expenses, getExpenses, deleteExpense } = useGlobalContext();

  const getEmailFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('email');
  };

  const loggedInUserEmail = getEmailFromURL(); // Get the logged-in user's email

  const totalExpenses = () => {
    // Filter expenses based on the logged-in user's email and calculate the total amount
    const total = expenses
      .filter(expense => expense.email === loggedInUserEmail)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return total;
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <TotalIncome>
          Total Expense: <span>{rupee} {totalExpenses()}</span>
        </TotalIncome>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses
              .filter(expense => expense.email === loggedInUserEmail)
              .map(expense => {
                const { _id, title, amount, date, category, description, type } = expense;
                console.log(expense);
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                  />
                );
              })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;

  .income-content {
    display: flex;
    gap: 2rem;

    .form-container {
      flex: 1;
    }

    .incomes {
      flex: 1;
    }
  }
`;

const TotalIncome = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 2rem;
  gap: .5rem;

  span {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-green);
  }
`;

export default Expenses;
