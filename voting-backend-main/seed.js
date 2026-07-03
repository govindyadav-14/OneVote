require('dotenv').config();
const mongoose = require('mongoose');
const Candidate = require('./models/candidate');

const mongoURL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/voting_app";

mongoose.connect(mongoURL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    
    // Clear existing candidates
    await Candidate.deleteMany({});
    
    // Create new candidates
    const candidates = [
        { name: "Alice Smith", party: "Democratic", age: 45 },
        { name: "Bob Johnson", party: "Republican", age: 52 },
        { name: "Charlie Brown", party: "Independent", age: 38 }
    ];
    
    await Candidate.insertMany(candidates);
    console.log('Successfully seeded candidates!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
