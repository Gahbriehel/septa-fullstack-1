require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.CONNECTION_STRING;
// console.log(connectionString);
const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

/*
//FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBfx8eug2A_qQf3nIiSUBRH6KRkD5ajIjY",
  authDomain: "septa-fullstack.firebaseapp.com",
  projectId: "septa-fullstack",
  storageBucket: "septa-fullstack.appspot.com",
  messagingSenderId: "376473555779",
  appId: "1:376473555779:web:ff949610c7154fa7bd95f6",
  measurementId: "G-NNFVGKBF77"
};

*/