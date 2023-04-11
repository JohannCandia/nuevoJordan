import React from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

const ToExcel = ({ data, filenameByArea, sheetByArea }) => {
  const exportToExcel = (data, filenameByArea, sheetByArea) => {
    const wb = XLSX.utils.book_new();

    for (const area in data) {
      const sheetName = sheetByArea[area];
      if (data[area].length > 0) {
        const ws = XLSX.utils.json_to_sheet(data[area]);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      }
    }

    const filename = 'Monitoreo OT activas';
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleExportClick = () => {
    exportToExcel(data, filenameByArea, sheetByArea);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExportClick}>
      Exportar a Excel
    </Button>
  );
};

export default ToExcel;
