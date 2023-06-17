import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { rupee } from '../../utils/Icons';

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome } = useGlobalContext();
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const getEmailFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('email');
  };
  const email = getEmailFromURL(); // Assuming getEmailFromURL function exists

  useEffect(() => {
    getIncomes();
  }, []);

  useEffect(() => {
    // Filter incomes based on email
    const filtered = incomes.filter((income) => income.email === email);
    setFilteredIncomes(filtered);
  }, [incomes, email]);

  const calculateTotalIncome = () => {
    return filteredIncomes.reduce((total, income) => total + income.amount, 0);
  };

  return (
    <IncomeStyled>
      <InnerLayout>
        <SectionTitle>Incomes</SectionTitle>
        <TotalIncome>
          Total Income: <span>{rupee} {calculateTotalIncome()}</span>
        </TotalIncome>
        <ContentWrapper>
          <FormContainer>
            <Form />
          </FormContainer>
          <IncomesContainer>
            {filteredIncomes.map((income) => {
              const { _id, title, amount, date, category, description, type } = income;
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
                  deleteItem={deleteIncome}
                />
              );
            })}
          </IncomesContainer>
        </ContentWrapper>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  background: linear-gradient(135deg, #f1f8ff, #e2ebf9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SectionTitle = styled.h1`
  color: rgba(34, 34, 96, 0.9);
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

const TotalIncome = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #fff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 2rem;
  gap: 0.5rem;

  span {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-green);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
`;

const FormContainer = styled.div`
  flex: 1;
`;

const IncomesContainer = styled.div`
  flex: 1;
`;

export default Income;
