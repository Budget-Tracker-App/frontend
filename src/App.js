import React, { useState } from 'react';
import SalaryQuestion from './Components/SalaryQuestion';
import SavingsGoalQuestion from './Components/SavingsGoalQuestion';
import TimePeriodQuestion from './Components/TimePeriodQuestion';
import FixedExpenses from './Components/FixedExpenses';
import UserDescription from './Components/UserDescription';


const DisplayUserData = ({ userData, expenses, description, result }) => {
  const isFormSubmitted = Object.keys(userData).length > 0; // Check if form data is available

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
        {expenses.length > 0 ? (
          <ul>
            {expenses.map((expense, index) => (
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
      <div>
        <h3>Budget Analysis</h3>
        <p>{isFormSubmitted ? (result ? result : 'Loading...') : 'N/A'}</p>
      </div>
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
  const [resultData, setResultData] = useState('');


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
        setExpenses(data);
        break;
      case 4:
        setDescription(data);
        break;
      default:
        break;
    }

    setStep(step + 1);
    console.log('Current step:', step + 1);


  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

const handleSubmit = () => {
  console.log('Submit button clicked!');

  setResultData('');

  // Constructing an object with the user data for API submission
  const userDataForAPI = {
    salary: salary,
    savingsGoal: savingsGoal,
    timePeriod: timePeriod,
    expenses: expenses,
    description: description,
  };

  // Logging the data formatted for API submission
  console.log('User Data for API:', userDataForAPI);

  // Make a POST request to the backend API
  fetch('http://localhost:3001/openai', { // Using the port 3001 for backend
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDataForAPI),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the data received from the backend
      console.log('Data from backend:', data);
      setResultData(data.result); // Store the response in state

    })
    .catch(error => {
      // Handle errors that might occur during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
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
          {step === 4 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
        <DisplayUserData
        userData={userData}
        expenses={expenses}
        description={description}
        result={resultData} // Pass the result data to the component
        />
      </div>
    </div>
  );
};

export default App;
