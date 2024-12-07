import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { POST } from "../services/Peticiones";
import { IPersona } from "../types/IPersona";
import { ITareas } from "../types/ITareas";

interface ITareasForm {
  id?: string;
  nombre?: string;
  prioridad?: string;
  finalizada?: boolean;
  setTareas?: Dispatch<SetStateAction<ITareas[]>>;
}

const TareasForm: FC<ITareasForm> = ({ setTareas }) => {
  //const [nuevaTarea, setNuevaTarea] = useState({nombre: "",prioridad: ""})
  const [values, setValues] = useState<ITareas>({
    prioridad: "",
    nombre: "",
    finalizada: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  


  const handleSubmit = async () => {
    const nueva: ITareas= {
      nombre: values.nombre,
      prioridad: values.prioridad,
      finalizada: false,
    };
    
    setValues({ nombre: "", prioridad: "",finalizada: false }); // Limpia el formulario
    const res = await POST("http://localhost:3000/tareas", nueva);
    setTareas((prev) => [...prev, res]); // Agrega la nueva tarea al estado
    console.log(res);
    
    //setNuevaTarea ({nombre: values.nombre,prioridad: values.prioridad}); // Actualiza la lista de tareas
  };
  //setTareas((prev) => [...prev, respuesta]); // Agrega la nueva tarea al estado
  //setNuevaTarea({ nombre: "", prioridad: "" }); // Limpia el formulario

  return (
    <div>
      <form>
        <input
          value={values.nombre}
          name="nombre"
          onChange={handleChange} // {(e) => setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })}
          type="text"
          placeholder="Nombre de la tarea"
          className="border p-2 rounded w-full mb-3"
        />
        <div>
        <select
          value={values.prioridad}
          name="prioridad"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        >
          <option value=""></option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      
      </form>
      <div>
        <button onClick={handleSubmit} className="bg-blue-500 rounded ">Crear Tarea</button>
      </div>
    </div>
  );
};

export default TareasForm;
