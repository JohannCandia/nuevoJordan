import express from 'express';
import cors from 'cors';
import historicoRoutes from  './src/routes/historico.js';
import historico2Routes from './src/routes/historico2.js';
import otMonitorRoutes from  './src/routes/otMonitor.js';
import otDetalleRoutes from  './src/routes/otDetalle.js';
import liberaOTRoutes from   './src/routes/liberaOT.js';
import aaaaaRoutes from      './src/routes/aaaaa.js';



const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); // Habilita el uso de JSON en solicitudes entrantes


app.use(historicoRoutes);
app.use(historico2Routes);
app.use(otMonitorRoutes);
app.use(otDetalleRoutes);
app.use(liberaOTRoutes);
app.use(aaaaaRoutes);


app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

