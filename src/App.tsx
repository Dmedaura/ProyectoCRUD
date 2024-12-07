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

  const traerTareas = async () => {
    const res = await fetch("http://localhost:3000/tareas");
    const JSONres = await res.json();
    setTareas(JSONres);
  };

  useEffect(() => {
    traerTareas();
  }, []);

  console.log(nuevaTarea);

  // //Crear Tareas
  // const crearTarea = async () => {
  //   const nueva: ITareas = {
  //     nombre: nuevaTarea.nombre,
  //     prioridad: nuevaTarea.prioridad,
  //     finalizada: false,
  //   };
  //   console.log(nueva);
  //   try {
  //     const respuesta = await POST<ITareas>(
  //       "http://localhost:3000/tareas",
  //       nueva
  //     );
  //     setTareas((prev) => [...prev, respuesta]); // Agrega la nueva tarea al estado
  //     setNuevaTarea({ nombre: "", prioridad: "" }); // Limpia el formulario
  //   } catch (error) {
  //     console.error("Error creando la tarea:", error);
  //   }
  // };

  //console.log(tareas)

  return (
    <>

      <TareasForm setTareas={setTareas} />
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
    </>
  );
}

export default App;
