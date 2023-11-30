import React, { useState } from 'react';
import SalaryQuestion from './Components/SalaryQuestion';
import SavingsGoalQuestion from './Components/SavingsGoalQuestion'; // Import the SavingsGoalQuestion component
import TimePeriodQuestion from './Components/TimePeriodQuestion'; // Import the TimePeriodQuestion component
import FixedExpenses from './Components/FixedExpenses'; // Import the FixedExpenses component
import UserDescription from './Components/UserDescription'; 


const DisplayUserData = ({ userData, expenses, description }) => {
  return (
    <div className="userDataDisplay">
      <h2>User Data Display</h2>
      <div>
        <strong>Total Salary:</strong> {userData.salary || 'N/A'}
      </div>
      <div>
        <strong>Savings Goal:</strong> {userData.savings || 'N/A'}
      </div>
      <div>
        <strong>Time Period:</strong> {userData.timePeriod || 'N/A'}
      </div>
      <div>
        <strong>Fixed Expenses:</strong>
        {userData.expenses ? (
          <ul>
            {userData.expenses.map((expense, index) => (
              <li key={index}>
                {expense.category}: {expense.amount}
              </li>
            ))}
          </ul>
        ) : (
          'N/A'
        )}
      </div>
      <div>
        <strong>Description:</strong> {description || 'N/A'}
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
  const [salary, setSalary] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });

    switch (step) {
      case 0:
        setSalary(data.salary);
        break;
      case 1:
        setSavingsGoal(data.savings);
        break;
      case 2:
        setTimePeriod(data.timePeriod);
        break;
      case 3:
        setUserData({ ...userData, expenses: data });
        break;
      case 4:
        setDescription(data);
        break;
      default:
        break;
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <SalaryQuestion onNextStep={handleNextStep} />;
      case 1:
        return <SavingsGoalQuestion onNextStep={handleNextStep} salaryValue={salary} />;
      case 2:
        return <TimePeriodQuestion onNextStep={handleNextStep} />;
      case 3:
        return <FixedExpenses onAddExpense={handleNextStep} />;
      case 4:
        return <UserDescription onSubmit={handleNextStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Budget Tracker</h1>
      <div className="stepsContainer">
        <div className="questionContainer">
          {renderStep()}
          {step > 0 && (
            <button onClick={handlePreviousStep}>Go Back</button>
          )}
        </div>
        <DisplayUserData userData={userData} expenses={expenses} description={description} />
      </div>
    </div>
  );
};

export default App;