# Budget Tracker App (FrontEnd)

Welcome to the Budget Tracker App! This application is designed to help users manage their budgets effectively by providing a guided step-by-step process to input financial data and receive budget analysis based on user-provided information using AI tools.

**To set up the BackEnd, follow instructions in the read.me file for [this](https://github.com/sidvijay2004/budget-tracker-backend/tree/main) repository.**

## Overview

Budget Prompter is a web-based application that offers users the ability to:
- Answer budget-related prompts to receive personalized feedback.
- Utilize OpenAI GPT-3.5 for text-based insights.
- Generate relevant images through DALL-E integration.
- Store and manage budget plans.
- View and delete saved plans.
  
## Architecture Overview

![Architecture Diagram](Architecture%20Diagram.png)

The application follows a client-server architecture:

### Frontend (Client)

- **React**: The frontend is developed using React to create an interactive user interface with a multi-step form structure.
- **React Router**: Utilizes React Router for managing different steps of the form and navigation within the application.
- **API Interaction**: Communicates with backend APIs for processing user data and displaying budget analysis and generated images.
- **State Management**: Utilizes React's state and hooks (e.g., useState) to manage user input data throughout the form flow.

### Backend (Server)

- **Node.js and Express**: The backend is built on Node.js, leveraging the Express framework to handle API requests and serve endpoints for processing user data.
- **OpenAI Integration**: Interacts with the OpenAI API for generating budget analysis based on user-provided financial details.
- **Image Generation**: Utilizes a separate API endpoint for generating images that visualize budget-related data.
- **Database Interaction**: Incorporates MongoDB to store and retrieve user plans and information for persistence.
  

## Installation and Setup

### Prerequisites

- Node.js (v20.10.0) - [Install Node.js](https://nodejs.org/) or Yarn [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

### Frontend Setup

1. Clone the frontend repository:

    ```bash
    git clone https://github.com/your-username/budget-prompter-frontend.git
    ```

2. Navigate to the frontend directory:

    ```bash
    cd budget-prompter-frontend
    ```

3. Install dependencies:

    ```bash
    npm install
    # OR using Yarn
    yarn install
    ```

5. Start the frontend server:

    ```bash
    npm start
    # OR using Yarn
    yarn start
    ```

6. Access the frontend in your browser:

    ```
    http://localhost:3000
    ```

### Backend Setup

Follow similar steps for the backend setup in the corresponding repository.

## Usage

1. Upon accessing the frontend, users can interact with the budget prompts.
2. Users receive personalized feedback utilizing GPT-3.5 and relevant images through DALL-E.
3. The application provides options to store, view, and delete saved budget plans.

## Contributing

Thank you for considering contributing to Budget Prompter! Feel free to submit pull requests, report issues, or suggest improvements.

Please follow the guidelines specified in the CONTRIBUTING.md file.


## Contact

For any queries or support regarding this project, feel free to contact [Siddharth Vijayasankar] at [sidvijay2004@gmail.com].
