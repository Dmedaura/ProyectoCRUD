import React, { Dispatch, FC, SetStateAction } from 'react'
import { ITareas } from '../types/ITareas'
import { PATCH } from '../services/Peticiones';

interface ITareasProps {
  id: number | string | undefined;
  nombre: string;
  prioridad: string;
  finalizada: boolean;
  setTareas: Dispatch<SetStateAction<ITareas[]>>
}

const Tareas: FC<ITareasProps> = ({finalizada,nombre,prioridad,setTareas,id}) => {

//Cambiar Tarea
const actualizarTarea = async () => {
  try {
    const respuesta = await PATCH<ITareas>(`http://localhost:3000/tareas/${id}`, {finalizada: !finalizada});
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...{finalizada:!finalizada} } : t))
    );
    console.log(respuesta)
  } catch (error) {
    console.error('Error modificando la tarea:', error)
  }
}

  return (
    <div>
        <h2>{nombre}</h2>
        <h3>{prioridad}</h3>
        <h4>{finalizada}</h4>
        <div className='flex'>
        <button onClick={() => actualizarTarea()}>{finalizada ? 'Sí' : 'No'}</button>
        </div>

    </div>
  )
}

export default Tareas