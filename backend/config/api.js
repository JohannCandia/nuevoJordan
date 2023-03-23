import sql from 'mssql';
import express from 'express';
const router = express.Router();

async () => {
  try {

      await sql.connect('Data Source=192.168.11.251;Initial Catalog=sot_archivert_des;User ID=mgarrido;Password=asdf123.;Connect Timeout=9999')
      const result = await sql.query`select * from AREAS where id = ${value}`
      console.dir(result)
  } catch (err) {
     
  }
}
        
export default router;

  



