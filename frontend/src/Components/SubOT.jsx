import React, { useState } from 'react';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';

const SubOT = ({ id, valorSubOT, fechaEntrega, contadorSubOT, numOT, onRemove }) => {
  const [enProduccion, setEnProduccion] = useState(false);

  const handleProduccion = () => {
    setEnProduccion(true);
    console.log('En produccion');
  };

  const handleRemove = () => onRemove(id);
  
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 mx-7 p-3 my-5">
          <Typography>{numOT} - {id}</Typography>
          <Typography>Cantidad a producir: {valorSubOT}</Typography>
          <Typography>Fecha de entrega: {fechaEntrega}</Typography>
        </div>
        <div className="w-1/2 mt-10 p-5 border mb-10 flex flex-col justify-between">
          <div>
            <Button
               variant="contained"
               sx={{ m: 1, width: '25ch' }}

              onClick={handleProduccion}
              disabled={enProduccion}
            > 
              A Produccion
            </Button>
            {!enProduccion && (
              <Button
                variant="contained"
                color='error'
                sx={{ m: 1, width: '25ch' }}

                onClick={handleRemove}
                className="mr-2 bg-red-600 hover:bg-red-500 cursor-pointer text-white p-2 rounded-lg w-1/5 mt-2 font-roboto"
              >
                Eliminar
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="mx-10 mb-10">
    

      </div>
    </>
  )
}

export default SubOT