# EmpowerHer Backend

This is the backend for the **EmpowerHer** platform, which provides mental health support, a workout tracker, and other wellness features. It is built using **Node.js**, **Express.js**, and **MongoDB**.

## Prerequisites

Ensure you have the following installed before proceeding:
- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [MongoDB](https://www.mongodb.com/) (either local or cloud-based e.g., MongoDB Atlas)
- [Postman](https://www.postman.com/) (optional, for API testing)

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repository/backend.git
   cd backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory and add the following:
     ```sh
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/empowerher
     JWT_SECRET=your_secret_key
     ```
   - Update `MONGO_URI` if using a cloud-based database like MongoDB Atlas.

## Running the Server

Start the backend server with:
```sh
npm start
```

The server will run on `http://localhost:5000/` by default.

## API Endpoints

### Authentication
- **Register** - `POST /register`
- **Login** - `POST /login`

### Posts
- **Create a post** - `POST /posts`
- **Get all posts** - `GET /posts`
- **Add a comment to a post** - `POST /posts/:id/comments`
- **Soft delete a post** - `DELETE /posts/:id`

### Exercises (Workout Tracker)
- **Get exercises for a specific day** - `GET /exercises/:day`
- **Add a new exercise** - `POST /exercises`
- **Toggle completion status** - `PATCH /exercises/:id`
- **Delete an exercise** - `DELETE /exercises/:id`

### Therapists
Therapist data is stored in `therapists.json`. You can integrate this with a database if needed.

## Deployment

For deployment, use services like **Heroku**, **AWS EC2**, or **Railway** for the backend.

1. Set environment variables on the hosting platform.
2. Run `npm run start` in the production environment.

## Contributing
Feel free to submit issues and pull requests for improvements.

## License
This project is licensed under the MIT License.


