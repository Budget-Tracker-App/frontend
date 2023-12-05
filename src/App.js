import React, { useState } from 'react';
import SalaryQuestion from './Components/SalaryQuestion';
import SavingsGoalQuestion from './Components/SavingsGoalQuestion';
import TimePeriodQuestion from './Components/TimePeriodQuestion';
import FixedExpenses from './Components/FixedExpenses';
import UserDescription from './Components/UserDescription';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import SavedPlans from './Components/SavedPlans';





const DisplayUserData = ({ userData, expenses, description, result, genImage}) => {
  const isResultAvailable  = Object.keys(result).length > 0; // Check if form data is available

  const renderFormattedResult = () => {
    const formattedResult = result.replace(/(?:\r\n|\r|\n)/g, '<br>'); // Replace newlines with HTML line breaks
    return { __html: formattedResult };
  };

  const displayResult = isResultAvailable ? (
    <div dangerouslySetInnerHTML={renderFormattedResult()} />
  ) : (
    'N/A'
  );

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
        <strong>Description:</strong> {userData.description || 'N/A'}
      </div>
      <div>
        <h3>Budget Analysis</h3>
        <div>{displayResult}</div>
      </div>
      <div>
        <h3>Images</h3>
        <div>
          {genImage ? (
            <img src={genImage} alt={`Generated Image`} />
          ) : (
            <span>No image generated</span>
          )}
        </div>
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
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const location = useLocation();

  


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
        console.log("data.description", data.description)
        setDescription(data.description || 'N/A');
        break; 
      default:
        break;
    }

    setStep(step + 1);
    console.log('Current step:', step + 1);


  };

  const handleDescriptionSubmit = ({ description }) => {
    handleNextStep({ description });
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {

    console.log('Submit button clicked!');
    setLoading(true); // Set loading state to true on submit

      // Add logic to submit description when step is 4
    if (step === 4) {
      handleNextStep({ description });
    }

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

    // Make a POST request to the backend API for text response
    fetch('http://localhost:3001/openai', { // Using the port 3001 for backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataForAPI),
    })
      .then(response => {
        setLoading(false); // Set loading state back to false after response received
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
        
      })
      .then(data => {
        // Handle the data received from the backend
        // const stringifiedData = JSON.stringify(data, null, 2);
        // console.log('Data from backend:', stringifiedData);
        // setResultData(stringifiedData); // Store the stringified response in state

        const resultText = data.result.replace(/\n/g, '<br>'); // Replace newlines with HTML line breaks
        console.log('Received data with appropriate line breaks:');
        console.log(resultText);
        setResultData(resultText); // Store the formatted response in state
      })
      .catch(error => {
        setLoading(false); // Set loading state back to false on error
        // Handle errors that might occur during the fetch
        console.error('There was a problem with the fetch operation:', error);
      });



    // For image response
    fetch('http://localhost:3001/openai/image', { // Using the port 3001 for backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataForAPI),
    })
    .then(response => {
      setLoading(false);
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Convert the response to JSON
      return response.json();
    })
    // Your existing code for the fetch call...
    .then(data => {
      setLoading(false); // Set loading state back to false after response received

      // Check if the 'image_url' property exists in the received data
      if (data && data.image_url) {
        setImageData(data.image_url); // Set the image URL to state (setImageData is a state setter)
      } else {
        // If 'image_url' is not present or empty in the data received
        setImageData('N/A'); // Set 'N/A' or an appropriate default value to signify no image generated
      }

      console.log(data.image_url);


    })
    .catch(error => {
      setLoading(false); // Set loading state back to false on error
      // Handle errors that might occur during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });


  };


    // Function to save user data
  const saveUserData = async () => {
    try {
      const response = await fetch('http://localhost:3001/putData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData, // Include user data you want to save
          expenses,
          description,
          resultData,
          imageData,
        }),
      });
      if (response.ok) {
        // Handle success, display a message or update UI
        console.log('User data saved successfully!');
      } else {
        // Handle error, show an error message or alert
        console.error('Failed to save user data');
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error('Error saving user data:', error);
    }
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
        return (
          <UserDescription
            onSubmitDescription={handleDescriptionSubmit}
            onSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };
  
  const NotFound = () => {
    return <div>Page Not Found</div>;
  };

  return (
    <div className="App">
      <h1>Budget Tracker</h1>
      {/* Render the link only on the home page */}
      {location.pathname === '/' && (
        <div className="topRightButton">
          <Link to="/saved-plans">View Saved Plans</Link>
          <button onClick={saveUserData}>Save Current Plan</button>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className="stepsContainer">
              <div className="questionContainer">
                {renderStep()}
                {step > 0 && <button onClick={handlePreviousStep}>Go Back</button>}
                {step === 5 && <button onClick={handleSubmit}>Submit</button>}
              </div>
              <DisplayUserData
                userData={userData}
                expenses={expenses}
                description={description}
                result={resultData}
                genImage={imageData}
              />
            </div>
          }
        />
        <Route path="/saved-plans" element={<SavedPlans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );

};

export default App;
