import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimeraEtapa from './PrimeraEtapa';
import { Tab, Tabs, Typography, Box, Button, TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter } from "@mui/material";
import TabPanel from './TabPanel';
import PropTypes from 'prop-types';
function Consulta() {
  const [numOT, setNumOT] = useState('');
  const [historicoData, setHistoricoData] = useState();
  const [otDetalleData, setOtDetalleData] = useState();
  const [dataPorArea, setDataPorArea] = useState([]);
  const [error, setError] = useState(null);
  const [totalCantidad, setTotalCantidad] = useState(null);
  const [encontrada, setEncontrada] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);


  const areas = {
    AC1: "Control de calidad",
    AC2: "Control de calidad (Personalizado)",
    AH1: "Holograma",
    AI1: "Impresión",
    AL1: "Laminado",
    AM1: "Mifare",
    AP1: "Personalizado",
    AQ1: "Troquelado",
    AS1: "Serigrafia",
    AV1: "Muhlbauer Chips",
    D01: "Desarrollo",
    M01: "Mecanizado",
    MT1: "Mantencion",
    PC1: "Pinchado",
    X01: "Area de prueba",
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const obtenerNombreArea = (codigoArea) => areas[codigoArea] || codigoArea;

  const fetchData = async () => {
    if (numOT === '') {
      window.alert('Debe ingresar el número de OT');
      return;
    }
    if (isNaN(numOT)) {
      window.alert('El número de OT debe ser un número');
      return;
    }

    setError(null);
    try {
      const historicoResult = await fetch('http://localhost:3000/historico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numOT }),
      });

      const otDetalleResult = await fetch('http://localhost:3000/otDetalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numOT }),
      });

      if (!historicoResult.ok) {
        setEncontrada(false);
        throw new Error("OT NO ENCONTRADA");
      } else {
        setEncontrada(true);
      }

      const historicoData = await historicoResult.json();
      const otDetalleData = await otDetalleResult.json();
      setHistoricoData(historicoData);
      setOtDetalleData(otDetalleData);
    
        // Objeto que guarda la cantidad total por área
        const totalPorArea = {};

        // Sumar las cantidades por área
        historicoData.forEach((row) => {
          const { Codigo_Area, Cantidad } = row;
          if (totalPorArea[Codigo_Area]) {
            totalPorArea[Codigo_Area] += Cantidad;
          } else {
            totalPorArea[Codigo_Area] = Cantidad;
          }
        });     
      

      // Generar la lista de objetos con la cantidad total por área
      const dataPorArea = Object.entries(totalPorArea).map(([area, cantidad]) => ({
        area,
        cantidad,
      }));

     // Calcular la suma total de todas las cantidades
     const totalCantidad = historicoData.reduce((accumulator, currentValue) => accumulator + currentValue.Cantidad, 0);
     
     setDataPorArea(dataPorArea);
     setTotalCantidad(totalCantidad);
   } catch (err) {
     setError(err.message);
   }}

 
    const formatDate = (isoDateString) => {
      const date = new Date(isoDateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
       return` ${day}-${month}-${year}`;
    };
  
    return (
      <>
        <div className="flex justify-between">
          <img src="./img/men_des_02.jpg" alt="logo" className="w-1/9 ml-10" />
        </div>
        <div></div>
        <div className="flex flex-col items-center">
          <Typography sx={{ mt: 2, mb: 4 }} variant="h5"
          >Consulta detalles OT </Typography>
          <div className="mb-10 flex flex-col w-1/3">
            <TextField
              type="text"
              value={numOT}
              onChange={(e) => setNumOT(e.target.value)}
              label="Número de OT"
            />
            <Button
              color='success'
              variant='contained'
              sx = {{mt: 2, mb: 2}}
              onClick={fetchData}
            >
              Buscar
            </Button>
          </div>
          
          {encontrada ? (
            <>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                {dataPorArea.map((row, index) => (
                  <Tab
                    key={index}
                    label={obtenerNombreArea(row.area)}
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
    
              {dataPorArea.map((row, index) => (
                <TabPanel key={index} value={tabIndex} index={index}>
                  <Table>
                    <TableHead>
                      <TableRow  sx={{ '&:last-child TableCell, &:last-child th': { border: 0 } }}>
                        <TableCell>   Numero de OT </TableCell>
                        <TableCell>   Id </TableCell>
                        <TableCell>   Operador </TableCell>
                        <TableCell>   Cantidad  </TableCell>
                        <TableCell>   Área </TableCell>
                        <TableCell>   Fecha </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historicoData
                        .filter((item) => item.Codigo_Area === row.area)
                        .map((filteredRow, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child TableCell, &:last-child th': { border: 0 } }}

                          >
                            <TableCell>
                              {filteredRow.Num_Ot}
                            </TableCell>
                            <TableCell>
                              {filteredRow.Id}
                            </TableCell>
                            <TableCell>
                              {filteredRow.Rut_Operador}
                            </TableCell>
                            <TableCell>
                              {filteredRow.Cantidad}
                            </TableCell>
                            <TableCell >
                              {obtenerNombreArea(filteredRow.Codigo_Area)}
                            </TableCell>
                            <TableCell>
                              {formatDate(filteredRow.Fecha)}
                            </TableCell>
              </TableRow>
              ))}
              </TableBody>
              <TableFooter>
                  <TableRow>
                      <TableCell colSpan={3} align="right">
                        <Typography  component="div">
                        Cantidad total del área
                        </Typography>
                      </TableCell>
                       <TableCell>
                          <Typography component="div">
                          {row.cantidad}
                          </Typography>
                       </TableCell>
                  <TableCell colSpan={2} />
                  </TableRow>
                          
              </TableFooter>
              </Table>
              </TabPanel>
              ))}
              </>
              ) : (
              <h2>No se ha encontrado la OT</h2>
              )}
              </div>
              </>
);
              }
export default Consulta;