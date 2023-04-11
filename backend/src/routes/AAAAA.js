import { Router } from 'express';
import sql from 'mssql';
import config from "../config/dbConfig.js"

const router = Router();

router.get('/AAAAA', async (req, res) => {
    try {
      await sql.connect(config);
  
      // Obtener los detalles de OT para los Num_OT de la tabla HISTORICO_PARTES
      const query = `
      SELECT NumOt, MIN(Producto) AS Producto, MIN(Cantidad) AS Cantidad, MIN(NombreCliente) AS NombreCliente
      FROM OT_DETALLES
      WHERE NumOT IN (
      SELECT DISTINCT Num_OT
      FROM HISTORICO_PARTES
      WHERE Cantidad IS NOT NULL
    )
    GROUP BY NumOt   
      `;
      const result = await sql.query(query);
  
      res.status(200).json(result.recordset);
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error al obtener los datos' });
    } finally {
      await sql.close();
    }
  });

export default router;
