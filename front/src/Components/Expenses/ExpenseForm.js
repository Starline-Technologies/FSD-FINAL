import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    email: '',
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    setInputState((prevState) => ({
      ...prevState,
      email: getEmailFromURL(),
    }));
  }, []);

  const getEmailFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('email');
  };

  const { email, title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      email: 'email',
      title: '',
      amount: '',
      date: '',
      category: '',
      description: '',
    });
  };
  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input
          type='text'
          value={title}
          name={'title'}
          placeholder='Expense Title'
          onChange={handleInput('title')}
        />
      </div>
      <div className='input-control'>
        <input
          value={amount}
          type='text'
          name={'amount'}
          placeholder={'Expense Amount'}
          onChange={handleInput('amount')}
        />
      </div>
      <div className='input-control'>
        <DatePicker
          id='date'
          placeholderText='Enter A Date'
          selected={date}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className='selects input-control'>
        <select
          required
          value={category}
          name='category'
          id='category'
          onChange={handleInput('category')}
        >
          <option value='' disabled>
            Select Option
          </option>
          <option value='education'>Education</option>
          <option value='groceries'>Groceries</option>
          <option value='health'>Health</option>
          <option value='subscriptions'>Subscriptions</option>
          <option value='takeaways'>Takeaways</option>
          <option value='clothing'>Clothing</option>
          <option value='travelling'>Travelling</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <div className='input-control'>
        <textarea
          name='description'
          value={description}
          placeholder='Add A Reference'
          id='description'
          cols='30'
          rows='4'
          onChange={handleInput('description')}
        ></textarea>
      </div>
      <div className='submit-btn'>
        <Button
          name='Add Expense'
          icon={plus}
          bPad='.8rem 1.6rem'
          bRad='30px'
          bg='var(--color-gradient)'
          color='var(--color-white)'
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: linear-gradient(45deg, #ffffff, #e8f5ff);
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
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.9);
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: var(--color-text);
    &::placeholder {
      color: var(--color-text-placeholder);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: var(--color-text);
      background-color: rgba(255, 255, 255, 0.9);
      &:focus,
      &:active {
        color: var(--color-text)`;

      export default ExpenseForm;