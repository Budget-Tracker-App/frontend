import React, { useState } from 'react';
// import SalaryQuestion from './Components/SalaryQuestion';


const SalaryQuestion = ({ onNextStep }) => {
  const [salary, setSalary] = useState('');

  const handleNext = () => {
    onNextStep({ salary });
  };

  return (
    <div>
      <h2>What is your total salary?</h2>
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Enter total salary"
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

const SavingsGoalQuestion = ({ onNextStep }) => {
  const [savings, setSavings] = useState('');

  const handleNext = () => {
    onNextStep({ savings });
  };

  return (
    <div>
      <h2>What is your savings goal?</h2>
      <input
        type="number"
        value={savings}
        onChange={(e) => setSavings(e.target.value)}
        placeholder="Enter savings goal"
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

const TimePeriodQuestion = ({ onNextStep }) => {
  const [timePeriod, setTimePeriod] = useState('');

  const handleNext = () => {
    onNextStep({ timePeriod });
  };

  return (
    <div>
      <h2>Over what time period do you want to plan this budget?</h2>
      <input
        type="text"
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value)}
        placeholder="Enter time period"
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

const FixedExpenses = ({ onAddExpense }) => {
  const [expenses, setExpenses] = useState([{ category: '', amount: '' }]);

  const handleAddExpense = () => {
    const newExpense = { category: '', amount: '' };
    setExpenses([...expenses, newExpense]);
  };

  const handleInputChange = (index, event) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][event.target.name] = event.target.value;
    setExpenses(updatedExpenses);
  };

  const handleSubmit = () => {
    onAddExpense(expenses);
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch('http://your-backend-url/endpoint', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (response.ok) {
  //       // Successful response from the server
  //       const responseData = await response.json();
  //       console.log('Server response:', responseData);
  //       // Reset form or navigate to another page if needed
  //     } else {
  //       // Handle error cases
  //       console.error('Failed to send data to the server');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <div>
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

const UserDescription = ({ onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(description);
  };

  return (
    <div>
      <h2>Describe yourself</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const DisplayUserData = ({ userData, expenses, description }) => {
  return (
    <div className="userDataDisplay">
      <h2>User Data Display</h2>
      <div>
        <strong>Total Salary:</strong> {userData.salary}
      </div>
      <div>
        <strong>Savings Goal:</strong> {userData.savings}
      </div>
      <div>
        <strong>Time Period:</strong> {userData.timePeriod}
      </div>
      <div>
        <strong>Expenses:</strong>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.category}: {expense.amount}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Description:</strong> {description}
      </div>
      {/* Add more fields here */}
    </div>
  );
};

const App = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });

    // Check the step to update the relevant state
    switch (step) {
      case 3:
        setExpenses([...expenses, ...data]);
        break;
      case 4:
        setDescription(data);
        break;
      default:
        break;
    }

    setStep(step + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <SalaryQuestion onNextStep={handleNextStep} />
            <DisplayUserData userData={userData} expenses={expenses} description={description} />
          </>
        );
      case 1:
        return (
          <>
            <SavingsGoalQuestion onNextStep={handleNextStep} />
            <DisplayUserData userData={userData} expenses={expenses} description={description} />
          </>
        );
      case 2:
        return (
          <>
            <TimePeriodQuestion onNextStep={handleNextStep} />
            <DisplayUserData userData={userData} expenses={expenses} description={description} />
          </>
        );
      case 3:
        return (
          <>
            <FixedExpenses onAddExpense={handleNextStep} />
            <DisplayUserData userData={userData} expenses={expenses} description={description} />
          </>
        );
      case 4:
        return (
          <>
            <UserDescription onSubmit={handleNextStep} />
            <DisplayUserData userData={userData} expenses={expenses} description={description} />
          </>
        );
      default:
        return null;
    }
  };

//   return (
//     <div className="App">
//       <h1>Budget Tracker</h1>
//       <div className="stepsContainer">
//         <div className="questionContainer">
//           {/* Use the SalaryQuestion component */}
//           <SalaryQuestion onNextStep={handleNextStep} />
//           {/* ... Other components */}
//         </div>
//       </div>
//     </div>
//   );

  return (
    <div className="App">
      <h1>Budget Tracker</h1>
      <div className="stepsContainer">
        <div className="questionContainer">{renderStep()}</div>
      </div>
    </div>
  );
};

export default App;