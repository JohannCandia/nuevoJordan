import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimeraEtapa from './PrimeraEtapa';
import { Tab, Tabs, Typography, Box } from "@mui/material";
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
          <h1 className="text-2xl mt-10">Consulta detalles OT </h1>
          <div className="mb-10 flex flex-col w-1/3">
            <input
              type="text"
              value={numOT}
              onChange={(e) => setNumOT(e.target.value)}
              placeholder="Ingrese número de OT"
              className="p-2 border border-black rounded-md"
            />
            <button
              className="bg-green-700 text-white p-2 mt-2 rounded-md hover:bg-green-500"
              onClick={fetchData}
            >
              Buscar
            </button>
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
                  <table className="table-auto table-sm rounded-md mr-10">
                    <thead className="bg-green-700 text-white">
                      <tr className="border border-black">
                        <th className="border p-4 text-center font-roboto uppercase border-black">
                          Num_OT
                        </th>
                        <th className="border p-4 text-center font-roboto uppercase border-black">
                          Id
                        </th>
                        <th className="border p-4 text-center font-roboto uppercase border-black">
                          Operador
                        </th>
                        <th className="border p-4 text-center font-roboto uppercase border-black">
                          Cantidad
                        </th>
                        <th className="border p-4 text-center font-roboto uppercase border-black">
                          Área
                        </th>
                        <th className="border p-4 text-center font-roboto uppercase border-black">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicoData
                        .filter((item) => item.Codigo_Area === row.area)
                        .map((filteredRow, index) => (
                          <tr
                            className="border border-black hover:bg-slate-100"
                            key={index}
                          >
                            <td className="border p-4 text-center border-black">
                              {filteredRow.Num_Ot}
                            </td>
                            <td className="border p-4 text-center border-black">
                              {filteredRow.Id}
                            </td>
                            <td className="border p-4 text-center border-black uppercase">
                              {filteredRow.Rut_Operador}
                            </td>
                            <td className="border p-4 text-center border-black">
                              {filteredRow.Cantidad}
                            </td>
                            <td className="border p-4 text-center uppercase border-black">
                              {obtenerNombreArea(filteredRow.Codigo_Area)}
                            </td>
                            <td className="border p-4 text-center border-black">
                              {formatDate(filteredRow.Fecha)}
              </td>
              </tr>
              ))}
              </tbody>
              </table>
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