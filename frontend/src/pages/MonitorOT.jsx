import { Button, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import ToExcel from '../Components/ToExcel';
import TabPanel from '../Components/TabPanel';

const areas = {
  AI1: "Impresión", PC1: "Pinchado", AL1: "Laminado", AQ1: "Troquelado", AC1: "Control de calidad", AH1: "Holograma 1",
  H02: "Holograma 2", HST: "Hot stamping", AV1: "Muhlbauer Chips",
};
const areasList = Object.keys(areas);

const MonitorOT = () => {
  const [totales, setTotales] = useState([]);
  const [otDetalles, setOtDetalles] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const filenameByArea = {};
  const sheetByArea = {};
  const tableRef = useRef(null);

  const fetchHistorico = async () => {
    const res = await fetch('http://localhost:3000/historico2');
    const data = await res.json();
    setTotales(data);
    console.log(data)
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const fetchOtDetalles = async () => {
    const res = await fetch('http://localhost:3000/AAAAA');
    const data = await res.json();

    // Agrupar los detalles de OT por Num_OT
    const groupedOtDetalles = {};
    data.forEach((detalle) => {
      if (detalle.NumOt in groupedOtDetalles) {
        // Si ya hay detalles para este NumOt, sumar las cantidades y productos
        groupedOtDetalles[detalle.NumOt].Cantidad += detalle.Cantidad;
        groupedOtDetalles[detalle.NumOt].Producto += `, ${detalle.Producto}`;
      } else {
        // Si no hay detalles para este NumOt, crear un nuevo objeto
        groupedOtDetalles[detalle.NumOt] = {
          Cantidad: detalle.Cantidad,
          Producto: detalle.Producto,
          Cliente: detalle.NombreCliente
        };
      }
    });

    setOtDetalles(groupedOtDetalles);
    console.log(groupedOtDetalles)
  };

  useEffect(() => {
    fetchHistorico()
    fetchOtDetalles()
  }, [])
  const groupedTotales = totales.reduce((acc, registro) => {
    const { Num_OT, Codigo_Area, Total_Cantidad } = registro;
    if (!acc[Num_OT]) {
      acc[Num_OT] = {};
    }
    acc[Num_OT][Codigo_Area] = Total_Cantidad;
    return acc;
  }, {});

  // Obtener los códigos de área únicos
  const areasList = Object.keys(areas);
  const prepareDataForExcel = (groupedTotales, otDetalles, selectedArea) => {
    const data = [];

    Object.keys(groupedTotales).forEach((numOT) => {
      const item = {
        numOT,
        Cliente: otDetalles[numOT]?.Cliente || '',
        Producto: otDetalles[numOT]?.Producto || '',
        Cantidad: otDetalles[numOT]?.Cantidad || 0,
      };

      if (groupedTotales[numOT][selectedArea] !== undefined) {
        item.Procesado = groupedTotales[numOT][selectedArea] || 0;
        data.push(item);
      }
    });
    return data;
  };

  areasList.forEach((area) => {
    sheetByArea[area] = areas[area];
  });
  const tablesData = {};
  areasList.forEach((area) => {
    tablesData[area] = prepareDataForExcel(groupedTotales, otDetalles, area);
  });
  return (
    <>
      <div className="flex flex-row justify-between  mx-10 mt-10">
        <Typography variant='h4' align='center'>Monitor de OTs activas</Typography>
        <Link to="/OTS"> <Button variant="contained" color="primary">Necesitas consultar por una OT especifica?</Button></Link>
        <ToExcel data={tablesData} filenameByArea={filenameByArea} sheetByArea={sheetByArea} />
      </div>
      <div className="flex flex-col items-center justify-center mt-10 p-10">
        <Tabs value={activeTab} onChange={handleChange}>
          {areasList.map((area, index) => (
            <Tab key={index} label={areas[area]} />
          ))}
        </Tabs>
        {areasList.map((area, index) => (
          <TabPanel key={index} value={activeTab} index={index}>

            <Table ref={tableRef}>
              <TableHead>
                <TableRow>
                  <TableCell>Número de OT</TableCell>
                  <TableCell>Nombre de cliente</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Cantidad Solicitada</TableCell>
                  <TableCell>Procesado</TableCell>
                  <TableCell>Cantidad Total</TableCell>
                  <TableCell>Merma</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(groupedTotales)
                  .sort((a, b) => b - a)
                  .map((numOT) => (
                    <TableRow key={numOT}>
                      <TableCell>{numOT}</TableCell>
                      <TableCell>{otDetalles[numOT]?.Cliente || '-'}</TableCell>
                      <TableCell>{otDetalles[numOT]?.Producto || '-'}</TableCell>
                      <TableCell>
                        {otDetalles[numOT]?.Cantidad
                          ? otDetalles[numOT].Cantidad.toLocaleString()
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {groupedTotales[numOT][area]?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {groupedTotales[numOT][area] !== undefined
                          ? ` ${area === 'AI1'
                            ? (otDetalles[numOT]?.Cantidad / 12).toFixed(0).toLocaleString('es-ES', { minimumFractionDigits: 3 })
                            : area === 'PC1' || area === 'AL1'
                              ? (otDetalles[numOT]?.Cantidad / 12).toFixed(0).toLocaleString('es-ES', { minimumFractionDigits: 3 })
                              : otDetalles[numOT]?.Cantidad.toFixed(0).toLocaleString('es-ES', { minimumFractionDigits: 3 })
                          }`
                          : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabPanel>
        ))}
      </div>

    </>
  )
}
export default MonitorOT