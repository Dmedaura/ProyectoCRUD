import React, { Dispatch, FC, SetStateAction } from 'react'
import { ITareas } from '../types/ITareas'
import { DELETE, PATCH } from '../services/Peticiones';

interface ITareasProps {
  id: number | string | undefined;
  nombre: string;
  prioridad: string;
  finalizada: boolean;
  setTareas: Dispatch<SetStateAction<ITareas[]>>
}

const Tareas: FC<ITareasProps> = ({ finalizada, nombre, prioridad, setTareas, id }) => {

  //Cambiar Tarea
  const actualizarTarea = async () => {
    try {
      const respuesta = await PATCH<ITareas>(`http://localhost:3000/tareas/${id}`, { finalizada: !finalizada });
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...{ finalizada: !finalizada } } : t))
      );
      console.log(respuesta)
    } catch (error) {
      console.error('Error modificando la tarea:', error)
    }
  }

  const eliminarTarea = async (id: string) => {
    const respuesta = await DELETE<ITareas>(`http://localhost:3000/tareas/${id}`)
    setTareas((tareas) => tareas.filter((tarea) => tarea.id !== id))
  }

  return (
    <div className="border p-4 mb-3 justify-between items-center flex">
      <div>
        <h2>Tarea: {nombre}</h2>
        <h3>Prioridad: {prioridad}</h3>
        <div className='flex'>
          <button onClick={() => actualizarTarea()}>finalizada: {finalizada ? 'Sí' : 'No'}</button>
        </div>
      </div>
      <div>
        <button onClick={() => eliminarTarea(id)}>Eliminar</button>
      </div>
    </div>
  )
}

export default Tareas