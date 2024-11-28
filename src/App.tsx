import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { IPersona } from "./types/IPersona";
import PersonaForm from "./Components/PersonaForm";
import { ITareas } from "./types/ITareas";

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

  console.log(tareas)
  
  return (

    
    <>
      
    </>
  );
}

export default App;
