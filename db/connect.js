
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, // Set useFindAndModify to false
  
    });
    console.log(`MongoDB connected Succesfully ...`);
  } catch (error) {
    console.log(`Error Occurred: ${error.message}`);
  }
};

module.exports = { connectDB};

