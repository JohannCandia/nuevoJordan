
const config = {
  server: '192.168.11.251',
  database: 'sot_archivert_des',
  user: 'mgarrido',
  password: 'asdf123.',
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

