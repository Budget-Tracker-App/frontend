import React, { useState } from 'react';

const FixedExpenses = ({ onAddExpense }) => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = () => {
    const newExpense = { category: '', amount: '' };
    setExpenses([...expenses, newExpense]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExpenses = [...expenses];
    updatedExpenses[index][name] = value;
    setExpenses(updatedExpenses);
  };

  const handleSubmit = () => {
    onAddExpense(expenses);
    // Reset expenses to an empty array after submitting
    setExpenses([]);
  };

  return (
    <div>
      <h2>Enter any Fixed Expenses during this period:</h2>
      {expenses.map((expense, index) => (
        <div key={index}>
          <input
            type="text"
            name="category"
            value={expense.category}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter category"
          />
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter amount"
          />
        </div>
      ))}
      <button onClick={handleAddExpense}>+ Add Expense</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default FixedExpenses;
