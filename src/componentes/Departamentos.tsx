import React, { useState } from "react";
import "./GestionUsuarios.css";

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  idDepartamento: number;
}

interface PropsDepartamento {
  departamentos: Departamento[];
  empleados: Empleado[]; // Para verificar si hay empleados asignados
  setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
}

const Departamentos: React.FC<PropsDepartamento> = ({ departamentos, empleados, setDepartamentos }) => {
  const [nombreDepartamento, setNombreDepartamento] = useState<string>("");
  const [idEditar, setIdEditar] = useState<number | null>(null); // Para editar el departamento

  const agregarOActualizarDepartamento = () => {
    if (nombreDepartamento.trim() !== "") {
      if (idEditar === null) {
        // Agregar
        setDepartamentos([
          ...departamentos,
          { id: departamentos.length + 1, nombre: nombreDepartamento },
        ]);
      } else {
        // Actualizar
        setDepartamentos(departamentos.map(dep =>
          dep.id === idEditar ? { ...dep, nombre: nombreDepartamento } : dep
        ));
        setIdEditar(null); // Resetear el modo edición
      }
      setNombreDepartamento("");
    }
  };

  const eliminarDepartamento = (id: number) => {
    const tieneEmpleados = empleados.some(emp => emp.idDepartamento === id);
    if (tieneEmpleados) {
      alert("No se puede eliminar el departamento porque tiene empleados asignados.");
    } else {
      const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este departamento?");
      if (confirmacion) {
        setDepartamentos(departamentos.filter(dep => dep.id !== id));
      }
    }
  };
  

  const editarDepartamento = (departamento: Departamento) => {
    setIdEditar(departamento.id);
    setNombreDepartamento(departamento.nombre); // Poner el nombre en la caja de escritura
  };

  return (
    <div>
      <h1>Departamentos</h1>
      <input
        type="text"
        value={nombreDepartamento}
        onChange={(e) => setNombreDepartamento(e.target.value)}
        placeholder="Nombre del departamento"
      />
      <button onClick={agregarOActualizarDepartamento}>
        {idEditar === null ? "Agregar Departamento" : "Actualizar Departamento"}
      </button>
      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.id}>
              <td>{departamento.id}</td>
              <td>{departamento.nombre}</td>
              <td>
                <button onClick={() => editarDepartamento(departamento)}>Editar</button>
                <button onClick={() => eliminarDepartamento(departamento.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departamentos;
