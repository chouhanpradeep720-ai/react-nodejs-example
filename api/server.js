const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const mongoose = require('mongoose');
// place holder for the data
mongoose 
.connect('mongodb://localhost:27017/my-db')
.then(() => console.log('MongoDB connected'))
.catch( err => console.error(err));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

const UserSchema = new mongoose.Schema({
        name:String,
        email:String
});

const User = mongoose.model('User', UserSchema);



app.get('/api/users', async (req, res) => {
    try {
     const users = await User.find();
     res.json(users);
    } catch (err) {
     res.status(500).json(err);
    }
});


app.post('/api/user', async (req, res) =>{
   try {
      const user = new User(req.body);
      await user.save();
      res.json({ message: 'User added successfully'});
   } catch (err) {
     res.status(500).json(err);
   }

   });



app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
