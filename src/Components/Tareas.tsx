import React, { FC } from 'react'
import { ITareas } from '../types/ITareas'

interface ITareas {
  id: number;
  nombre: string;
  prioridad: string;
  finalizada: boolean;
  funcion: (id: number) => void;
}

const Tareas: FC<ITareas> = ({finalizada,nombre,prioridad,funcion,id}) => {
  return (
    <div>
        <h2>{nombre}</h2>
        <h3>{prioridad}</h3>
        <h4>{finalizada}</h4>
        <div className='flex'>
        <button onClick={() => funcion (id)}>{finalizada ? 'Sí' : 'No'}</button>
        </div>

    </div>
  )
}

export default Tareas