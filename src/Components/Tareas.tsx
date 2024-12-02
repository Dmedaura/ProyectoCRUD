import React, { FC } from 'react'
import { ITareas } from '../types/ITareas'

const Tareas: FC<ITareas> = ({finalizada,nombre,prioridad}) => {
  return (
    <div>
        <h2>{nombre}</h2>
        <h3>{prioridad}</h3>
        <h4>{finalizada}</h4>

    </div>
  )
}

export default Tareas