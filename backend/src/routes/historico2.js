import { Router } from 'express';
import sql from 'mssql';
import config from "../config/dbConfig.js"
const router = Router();

router.get('/historico2', async (req, res) => {
    try {
      await sql.connect(config);
  
      // Obtener todos los registros de historico
      const query = `
      SELECT TOP 50 Num_OT, Codigo_Area, SUM(Cantidad) AS Total_Cantidad
      FROM HISTORICO_PARTES
      WHERE Cantidad IS NOT NULL
      GROUP BY Num_OT, Codigo_Area
      ORDER BY Num_OT Desc, Codigo_Area ASC
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