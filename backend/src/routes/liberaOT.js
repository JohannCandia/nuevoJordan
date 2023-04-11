import { Router } from 'express';
import sql from 'mssql';
import config from "../config/dbConfig.js"


const router = Router();

router.post('/liberaOT', async (req, res) => {
    const numOT = req.body.numOT;
    // const fechaEntrega = req.body.fechaEntrega;
    const valorSubOT = req.body.valorSubOT;
  
    if (!numOT) {
      return res.status(400).json({ error: 'Por favor, ingrese el número de OT y la fecha.' });
    }
  
    try {
      await sql.connect(config);
      const query = `
        INSERT INTO LIBERAROT (Num_OT, Cantidad_Inserto_1,rowguid,OTMadre, Proceso)
        VALUES (@numOT, @valorSubOT, NEWID(),@numOT,@numOT)
      `;
      const request = new sql.Request();
      request.input('numOT', sql.VarChar(50), numOT);
      // const fechaEntregaDate = new Date(fechaEntrega);
      //  const fechaEntregaSql = fechaEntregaDate.toISOString();
      //request.input('fechaEntrega', sql.Date,fechaEntregaSql);
      request.input('valorSubOT', sql.VarChar(50), valorSubOT); 
  
      const result = await request.query(query);
      res.status(200).json({ message: 'Los datos se han insertado correctamente.' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error al insertar los datos' });
    } finally {
      await sql.close();
    }
  });

export default router;
