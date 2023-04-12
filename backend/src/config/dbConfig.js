
import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: process.env.SERVER,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  options: {
    encrypt: false,
    enableArithAbort: true,
    cryptoCretdentialsDetails: {
      minVersion: 'TLSv1',
    }
  },

  connectionTimeout: 9999,
  requestTimeout: 9999,
};

export default config;

