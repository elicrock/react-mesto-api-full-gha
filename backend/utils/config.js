require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mestodb';
const JWT_SECRET = process.env.PROD === 'production' ? process.env.JWT_SECRET : 'dev-secret';
console.log(JWT_SECRET);

const mongooseOptions = {
  useNewUrlParser: true,
};

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://mesto.rockelic.nomoreparties.co',
    'https://mesto.rockelic.nomoreparties.co',
  ],
  credentials: true,
};

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  mongooseOptions,
  corsOptions,
};
