import React, { useState } from "react";
import "./GestionUsuarios.css";

interface Departamento {
    id: number;
    nombre: string;
}

interface Empleado {
    id: number;
    nombre: string;
    idDepartamento: number;
}

interface PropsEmpleados {
    departamentos: Departamento[];
    empleados: Empleado[];
    setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

const Empleados: React.FC<PropsEmpleados> = ({ departamentos, empleados, setEmpleados }) => {

    const [nombreEmpleado, setNombreEmpleado] = useState<string>("");
    const [idDepartamentoSeleccionado, setIdDepartamentoSeleccionado] = useState<number>(0);
    const [idEditar, setIdEditar] = useState<number | null>(null); // Para editar

    const agregarOActualizarEmpleado = () => {
        if (nombreEmpleado.trim() !== "") {
            if (idEditar === null) {
                // Agregar
                setEmpleados([
                    ...empleados,
                    {
                        id: empleados.length + 1,
                        nombre: nombreEmpleado,
                        idDepartamento: idDepartamentoSeleccionado,
                    },
                ]);
            } else {
                
                setEmpleados(empleados.map(emp =>
                    emp.id === idEditar ? { ...emp, nombre: nombreEmpleado, idDepartamento: idDepartamentoSeleccionado } : emp
                ));
                setIdEditar(null); 
            }
            setNombreEmpleado("");
            setIdDepartamentoSeleccionado(0);
        }
    };

    const eliminarEmpleado = (id: number) => {
        const empleado = empleados.find(emp => emp.id === id);
        if (empleado?.idDepartamento !== 0) {
            alert("No se puede eliminar el empleado porque tiene un departamento asignado.");
        } else {
            setEmpleados(empleados.filter(emp => emp.id !== id));
        }
    };

    const editarEmpleado = (empleado: Empleado) => {
        setIdEditar(empleado.id);
        setNombreEmpleado(empleado.nombre);
        setIdDepartamentoSeleccionado(empleado.idDepartamento); 
    };

    return (
        <div>
            <h1>Empleados</h1>
            <input
                type="text"
                value={nombreEmpleado}
                onChange={(e) => setNombreEmpleado(e.target.value)}
                placeholder="Nombre del empleado"
            />
            <select
                value={idDepartamentoSeleccionado}
                onChange={(e) => setIdDepartamentoSeleccionado(Number(e.target.value))}
            >
                <option value={0}>Sin Departamento</option>
                {departamentos.map((departamento) => (
                    <option key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                    </option>
                ))}
            </select>
            <button onClick={agregarOActualizarEmpleado}>
                {idEditar === null ? "Agregar Empleado" : "Actualizar Empleado"}
            </button>
            <br />
            <table border={1} style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Departamento</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => (
                        <tr key={empleado.id}>
                            <td>{empleado.id}</td>
                            <td>{empleado.nombre}</td>
                            <td>
                                {departamentos.find((dep) => dep.id === empleado.idDepartamento)?.nombre || "Sin Departamento"}
                            </td>
                            <td>
                                <button onClick={() => editarEmpleado(empleado)}>Editar</button>
                                <button onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Empleados;
