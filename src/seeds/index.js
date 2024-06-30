import mongoose from 'mongoose';
import Product from '../models/product.js';
import productsSeedData from './productsSeedData.js';

const {connect,disconnect} = mongoose;

const URL1 = 'mongodb+srv://sample1:LyvivoDB@lyvivo.5glflir.mongodb.net/';

connect(URL1)
  .then(() => {
    console.log('Connect with DB to seed data');
  })
  .catch((error) => {
    console.error(error);
  });

const seedDB = async () => {

  try {
    await Product.deleteMany({});
    await Product.insertMany(productsSeedData);
    console.log('seed data inserted successfully');
  } catch (error) {
    console.log('error seed data insert ' + error);
  } finally {
    disconnect();
  }
};

seedDB();

