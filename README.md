
Agent Management Portal: Installation Guide
Set up the Agent Management Portal by following these step-by-step instructions.

Prerequisites
Before you begin, ensure you have the following installed on your system:

Git

Node.js (which includes npm)

Step 1: Clone the Repository
First, clone the project repository from GitHub to your local machine.

git clone https://github.com/Omprasad-BL/agentwork

Once cloned, navigate into the main project folder:  
cd agentwork

Step 2: Set Up the Backend
You'll need to install dependencies and configure the environment variables for the server.

Navigate to the backend folder:  
cd backend

Install backend dependencies: This command installs all required packages listed in package.json.  
npm install

Set environment variables: The backend requires a .env file for secret keys and configuration. A template is provided as .txt. You must rename or copy this file to .env.

Bash
# Use mv to rename the file
mv .env.txt .env

Step 3: Set Up the Frontend
Open a new terminal window or tab. You will need two terminals running at the same time: one for the backend and one for the frontend.

Navigate to the frontend folder: From the root agentwork directory:  
cd frontend

Install frontend dependencies:  
npm install

Step 4: Run the Application
You must run both the backend and frontend servers simultaneously.

Start the backend server:

In your backend terminal (the one in the backend folder):  
npm run dev

step 5: Access the App
Once both servers are running, you can access the application in your browser:

Frontend App: http://localhost:5173

Backend API: http://localhost:3000 (or the port set in your .env file)

"USE admin@gmail.com as admin email to signup and login"