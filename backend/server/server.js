const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth');

const UserSchema = new mongoose.Schema({
  email:{type: String, unique:true,required:true},
  username: {type: String,required:true},
  password: {type: String,required:true}
});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
    const { email, username, password } = req.body;
    
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already registered' });
    }
    
    // Hash the password and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).send();
  });
  

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send('Unauthorized');
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).send('Unauthorized');
  
  const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
  res.send({ token });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
