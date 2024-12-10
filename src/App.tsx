import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { IPersona } from "./types/IPersona";
import PersonaForm from "./Components/TareasForm";
import { ITareas } from "./types/ITareas";
import Tareas from "./Components/Tareas";
import { PATCH, POST } from "./services/Peticiones";
import TareasForm from "./Components/TareasForm";

function App() {
  const [tareas, setTareas] = useState<ITareas[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState({ nombre: "", prioridad: "" });
  const [abrir, setAbrir] = useState<boolean>(false);

  const traerTareas = async () => {
    const res = await fetch("http://localhost:3000/tareas");
    const JSONres = await res.json();
    setTareas(JSONres);
  };

  useEffect(() => {
    traerTareas();
  }, [abrir]);

  console.log(nuevaTarea);

  return (
    <>
    <div className="p-2" >
      <button className="rounded p-2 mb-4  bg-gray-800 text-white" onClick={() => setAbrir(!abrir)}>Agregar Tarea</button>
      </div>
      <div>
        {tareas.map((tarea) => (
          <Tareas
            key={tarea.id}
            id={tarea.id}
            nombre={tarea.nombre}
            prioridad={tarea.prioridad}
            finalizada={tarea.finalizada}
            setTareas={setTareas}
          />
        ))}
      </div>

      {abrir && (
        <div className="inset-0 fixed bg-black/10 flex items-center justify-center">
          <div className="bg-white p-5 ">
            <TareasForm setTareas={setTareas} setAbrir={setAbrir} metodo="POST"/>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
