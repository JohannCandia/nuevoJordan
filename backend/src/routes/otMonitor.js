import { Router } from 'express';
import sql from 'mssql';
import config from "../config/dbConfig.js"

const router = Router();

router.post('otMonitor', async (req, res) => {
    const numOT = req.body.numOT;
  
    try {
      await sql.connect(config);
      const query = `
        SELECT * NumOt, Cantidad, Producto
        FROM OT_DETALLES
        WHERE Estado = '1' 
      `;
      const request = new sql.Request();
      request.input('numOT', sql.VarChar(50), numOT);
      const result = await request.query(query);
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error al obtener los datos' });
    } finally {
      await sql.close();
    }
  
  })

export default router;