import express from 'express';
import cors from 'cors';
import historicoRoutes from  './src/routes/historico.js';
import historico2Routes from './src/routes/historico2.js';
import otMonitorRoutes from  './src/routes/otMonitor.js';
import otDetalleRoutes from  './src/routes/otDetalle.js';
import liberaOTRoutes from   './src/routes/liberaOT.js';
import aaaaaRoutes from      './src/routes/aaaaa.js';
import dotenv from 'dotenv';
dotenv.config(); 



const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json()); 


app.use(historicoRoutes);
app.use(historico2Routes);
app.use(otMonitorRoutes);
app.use(otDetalleRoutes);
app.use(liberaOTRoutes);
app.use(aaaaaRoutes);


app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

