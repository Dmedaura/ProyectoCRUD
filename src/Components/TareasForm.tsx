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
    const res = await POST("http://localhost:3000/tareas", values);
    console.log(res);
  };

  return (
    <div>
      <form>
        <input
          value={values.nombre}
          name="nombre"
          onChange={handleChange} // {(e) => setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })}
          type="text"
          placeholder="Nombre de la tarea"
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
        <button onClick={handleSubmit}>Crear Tarea</button>
      </div>
    </div>
  );
};

export default TareasForm;
