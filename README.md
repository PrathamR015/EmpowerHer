# EmpowerHer

EmpowerHer is a full-stack mental wellness platform built with **HTML, CSS, JavaScript, Node.js, Express, and MongoDB**.

> **Note:** The backend is currently hosted on a local server.

## Features
- Peer Support Forum
- Create, update, and delete posts and comments
- Period Tracker
- Health Tracker
- AI Assistance using chatbots
- Write Journal
- Create To-Do Lists
- Mental Health Awareness
- Solution Remedies for Mental Health
- ... and more to come!

## Screenshots
<p align="center">
  <a href="#">
    <img src="./screenshot.png" alt="Comments page for a post">
  </a>
</p>

## Installation
### 1. Clone this repository
```sh
git clone https://github.com/PrathamR015/EmpowerHer.git
cd EmpowerHer
```

### 2. Install backend dependencies
```sh
cd backend
npm install
```

### 3. Install frontend dependencies
```sh
cd frontend
npm install
```

### 4. Configure environment variables
Create a `.env` file in the `config` folder and add the following, replacing with your own values:
```sh
PORT=5000
MONGO_URI=mongodb://localhost:27017/empowerher
JWT_SECRET=<YOUR_SECRET>
```

### 5. Create a MongoDB database
Ensure that you have MongoDB installed and create a database named **EmpowerHer**.

### 6. Run database migrations
```sh
cd backend
npm run db-migrate up
```

## Usage
### 1. Start the server
```sh
cd backend
node server.js
```

### 2. Start the client
```sh
open index.html
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

