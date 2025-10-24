Installation Guide
Set up the Agent Management Portal by following these step-by-step instructions.

1. Clone the repository
bash

git clone <https://github.com/Omprasad-BL/agentwork
cd agentwork
Replace <your-repo-url> with the actual Github clone link.

2. Install Frontend dependencies
Navigate to the frontend project folder named "frontend".

bash  
cd frontend
npm install
This will install all required packages listed in package.json.

3. Install Backend dependencies
Open a new terminal, then navigate to the backend folder named "backend":

bash  
cd ../backend
npm install
This will install backend packages listed in its package.json.

4. Set environment variables
The backend expects its secret keys and configuration in a .env file. If a file named  .txt is present, rename or copy it as .env:

bash  
mv .env.txt .env
Now you can edit .env to enter your environment variables as needed.

5. Start the backend server

bash  
npm run dev
This launches the server from the backend folder.

6. Start the frontend development server

Return to the frontend folder and run:  
bash
npm run dev


7. Access the app  

Frontend: Visit http://localhost:5173 or your frontend server port.  

Backend API: Usually runs on http://localhost:3000 or the port set in your .env.