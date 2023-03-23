import React from 'react'
import { Link } from 'react-router-dom'
import PrimeraEtapa from '../Components/PrimeraEtapa'
const ReporteMermas = () => {
  return (
    <>
    <div className='bg-cyan-300 p-9 border border-black'>
      <h1 className='text-5xl font-bold uppercase text-center'>
      Reporte de mermas
      </h1>
      <Link to="/" className='text-blue-800 font-bold text-right hover:bg-sky-300 w-full'> Inicio </Link>

      </div>
    <div className='mt-2'>
       <form className='flex'>
            <div className='flex flex-col mx-auto w-1/3'>
                <label className='text-xl font-bold'>Fecha inicio:</label>
                <input type="date" className='border border-black ' />
            </div>
            <div className='flex flex-col mx-auto w-1/3'>
                <label className='text-xl font-bold'>Fecha termino:</label>
                <input type="date" className='border border-black ' />
            </div>
            <div className='flex flex-col mx-auto w-1/6 mt-3'>
                <button className='bg-blue-500 text-white font-bold p-3 w-1/3'>Buscar</button>
            </div>
       </form>
            <div>
                <PrimeraEtapa />
            </div>
    </div>  
  
    </>
  )
}

export default ReporteMermas