import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { IPersona } from "./types/IPersona";
import PersonaForm from "./Components/PersonaForm";
import { ITareas } from "./types/ITareas";
import Tareas from "./Components/Tareas";
import { PATCH, POST } from "./services/Peticiones";

function App() {

  const [tareas, setTareas] = useState<ITareas[]>([])
  const [nuevaTarea, setNuevaTarea] = useState({ nombre: '', prioridad: '' });

  const traerTareas = async () => {
    const res = await fetch('http://localhost:3000/tareas');
    const JSONres = await res.json();
    setTareas(JSONres)
  }

  useEffect(() => {
    traerTareas()
  }, [])



  //Crear Tareas
  const crearTarea = async () => {
    const nueva: ITareas = {
      nombre: nuevaTarea.nombre,
      prioridad: nuevaTarea.prioridad,
      finalizada: false,
    };
    try {
      const respuesta = await POST<ITareas>('http://localhost:3000/tareas', nueva);
      setTareas((prev) => [...prev, respuesta]); // Agrega la nueva tarea al estado
      setNuevaTarea({ nombre: '', prioridad: '' }); // Limpia el formulario
    } catch (error) {
      console.error('Error creando la tarea:', error);
    }
  };

  //Cambiar Tarea
  const actualizarTarea = async (id: number, tareaActualizada: Partial<ITareas>) => {
    try {
      const respuesta = await PATCH<ITareas>('http://localhost:3000/tareas', tareaActualizada);
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...tareaActualizada } : t))
      );
    } catch (error) {
      console.error('Error modificando la tarea:', error)
    }
  }

  //console.log(tareas)

  return (


    <>
      <div>
        <div>
          <form>
            <input
              value={nuevaTarea.nombre}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })}
              type="text"
              placeholder="Nombre de la tarea"
            />
          </form>
        </div>
        <div>
          <form>
            <input
              value={nuevaTarea.prioridad}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, prioridad: e.target.value })}
              type="text"
              placeholder="Alta Media Baja" />
          </form>
        </div>
        <div><button onClick={crearTarea}>Crear Tarea</button></div>


        <div>
          {tareas.map((tarea) => (
            <Tareas
              key={tarea.id}
              id={tarea.id}
              nombre={tarea.nombre}
              prioridad={tarea.prioridad}
              finalizada={tarea.finalizada}
              funcion={actualizarTarea}
            />
          ))}
        </div>
      </div>


    </>
  );
}

export default App;
