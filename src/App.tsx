import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { IPersona } from "./types/IPersona";
import PersonaForm from "./Components/PersonaForm";
import { ITareas } from "./types/ITareas";
import Tareas from "./Components/Tareas";
import { POST } from "./services/Peticiones";

function App() {

  const [tareas, setTareas] = useState<ITareas[]>([])

  const traerTareas = async () => {
    const res = await fetch('http://localhost:3000/tareas');
    const JSONres = await res.json();
    setTareas(JSONres)
  }

  useEffect(() => {
    traerTareas()
  }, [])

  const crearTarea = async () => {
    const nuevaTarea: ITareas = {
      nombre: "Aprender TypeScript",
      prioridad: "Alta",
      finalizada: false,
    };

    try {
      const respuesta = await POST<ITareas>('http://localhost:3000/tareas', nuevaTarea);
      console.log('Tarea creada:', respuesta);
    } catch (error) {
      console.error('Error creando la tarea:', error);
    }
  };

  //console.log(tareas)

  return (


    <>
      <div>
        <form>
          <input type="text" placeholder="Nombre de la tarea" required />
          <button type="submit" >Agregar Tarea</button>
        </form>
      </div>
      <div><button onClick={crearTarea}>Crear Tarea</button></div>
      <div>
        {tareas.map((tarea) => (
          <div key={tarea.id}> {/* Usa un identificador único como `key` */}
            <p>Nombre: {tarea.nombre}</p>
            <p>Prioridad: {tarea.prioridad}</p>
            <p>Finalizada: {tarea.finalizada ? "Sí" : "No"}</p>
          </div>
        ))}
      </div>


    </>
  );
}

export default App;
