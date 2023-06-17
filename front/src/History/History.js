import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
  const { transactionHistory } = useGlobalContext();

  const getEmailFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('email');
  };

  const email = getEmailFromURL(); // Call the function after its definition

  const history = transactionHistory().filter(item => item.email === email);

  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      {history.length > 0 ? (
        history.map((item) => {
          const { _id, title, amount, type } = item;
          return (
            <div key={_id} className="history-item">
              <p className="history-title" style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}>
                {title}
              </p>
              <p className="history-amount" style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}>
                {type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`}
              </p>
            </div>
          );
        })
      ) : (
        <p className="no-history">No transaction history available.</p>
      )}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .history-item {
    background-color: #ffffff;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    .history-title {
      font-size: 1.6rem;
      font-weight: 600;
    }

    .history-amount {
      font-size: 1.8rem;
      font-weight: 600;
    }
  }

  .no-history {
    font-size: 1.6rem;
    color: #6da398;
    text-align: center;
  }
}`;

export default History;
