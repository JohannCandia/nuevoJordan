import { Router } from 'express';
import sql from 'mssql';
import config from "../config/dbConfig.js"

const router = Router();



router.post('/historico', async (req, res) => {
    const numOT = req.body.numOT;
  
    if (!numOT) {
      return res.status(400).json({ error: 'Por favor, ingrese un número de OT.' });
    }
  
    try {
      await sql.connect(config);
  
      // Verificar si el número de OT existe en la tabla
      const countQuery = 'SELECT COUNT(*) AS count FROM HISTORICO_PARTES WHERE Num_OT = @numOT';
      const countRequest = new sql.Request();
      countRequest.input('numOT', sql.VarChar(50), numOT);
      const countResult = await countRequest.query(countQuery);
      const count = countResult.recordset[0].count;
  
      if (count === 0) {
        return res.status(404).json({ error: `El número de OT ${numOT} no existe en la base de datos.` });
      }
  
      // Obtener los registros de historico de la OT
      const query = `
        SELECT TOP (100) Id, Num_Ot, Rut_Operador, Codigo_Area, Fecha, Cantidad, Tiros, Codigo_Maquina, Estado, Contador2
        FROM HISTORICO_PARTES
        WHERE Num_OT = @numOT AND Cantidad IS NOT NULL Order by Id desc
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
  });
  export default router;
