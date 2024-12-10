import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { ITareas } from '../types/ITareas'
import { DELETE, PATCH } from '../services/Peticiones';
import TareasForm from './TareasForm';
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

interface ITareasProps {
  id: number | string | undefined;
  nombre: string;
  prioridad: string;
  finalizada: boolean;
  setTareas: Dispatch<SetStateAction<ITareas[]>>
}

const Tareas: FC<ITareasProps> = ({ finalizada, nombre, prioridad, setTareas, id }) => {
  const [abrir, setAbrir] = useState<boolean>(false);

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

  const calcularColor = () => {
    if (prioridad === "Alta" ) {
      return "bg-red-600"
    }
    if (prioridad === "Media") {
      return "bg-yellow-300"
    }
    if (prioridad === "Baja") {
      return "bg-green-300"
    }
  }
  const final = () => {
    if (finalizada === true) {
      return "line-through"
    }
  }

  return (
    <>
    <div className={`border p-4 mb-3 justify-between items-center  flex ${calcularColor()}`}>
      <div>
        <h2 className={`text-2xl ${final()}` }>{nombre}</h2>
        {/* <h3>Prioridad: {prioridad}</h3> */}
        <div className='flex'>
          <input type="checkbox" onClick={() => actualizarTarea()} checked={finalizada}/>
          
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <MdDeleteForever className="text-2xl" onClick={() => eliminarTarea(id)}/>
        <BiSolidEditAlt onClick={() => setAbrir(!abrir)}/>
      </div>
    </div>
    {abrir && (
      <div className="inset-0 fixed bg-black/10 flex items-center justify-center">
        <div className="bg-white p-5 ">
          <TareasForm setTareas={setTareas} setAbrir={setAbrir} metodo='PATCH' id={id} nombre={nombre} prioridad={prioridad}/>
        </div>
      </div>
      
    )}</>
  )
}

export default Tareas