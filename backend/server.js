require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// User Schema (Simplified)
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

// Post Schema
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ body: String, date: Date, author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false } // Soft delete flag
});
const Post = mongoose.model('Post', PostSchema);

// Middleware for Auth
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// User Registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User Registered' });
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Create a Post
app.post('/posts', authenticate, async (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, author: req.user.id });
    await newPost.save();
    res.json(newPost);
});

// Get All Posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find({ isDeleted: false }).populate('author', 'username');
    res.json(posts);
});

// Add Comment to Post
app.post('/posts/:id/comments', authenticate, async (req, res) => {
    const { body } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ body, date: new Date(), author: req.user.id });
    await post.save();
    res.json(post);
});

// Soft Delete a Post (Moderation)
app.delete('/posts/:id', authenticate, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.isDeleted = true;
    await post.save();
    res.json({ message: 'Post deleted' });
});
const exerciseSchema = new mongoose.Schema({
    day: String,
    name: String,
    duration: String,
    completed: Boolean
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

// Get exercises for a specific day
app.get('/exercises/:day', async (req, res) => {
    const { day } = req.params;
    const exercises = await Exercise.find({ day });
    res.json(exercises);
});

// Add a new exercise
app.post('/exercises', async (req, res) => {
    const { day, name, duration } = req.body;
    const newExercise = new Exercise({ day, name, duration, completed: false });
    await newExercise.save();
    res.status(201).json(newExercise);
});

// Toggle completion status
app.patch('/exercises/:id', async (req, res) => {
    const { id } = req.params;
    const exercise = await Exercise.findById(id);
    exercise.completed = !exercise.completed;
    await exercise.save();
    res.json(exercise);
});

// Delete an exercise
app.delete('/exercises/:id', async (req, res) => {
    await Exercise.findByIdAndDelete(req.params.id);
    res.status(204).send();
});









const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
