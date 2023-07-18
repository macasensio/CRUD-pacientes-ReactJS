import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

    const [pacientes, setPacientes] = useState([]) //para agregar
    const [paciente, setPaciente] = useState({}) //para editar

    //este useEffect chequea si hay algo en el local storage
    useEffect(() => {
        const obtenerLS = () => {
            const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
            setPacientes(pacientesLS)
        }
        obtenerLS()
    }, [])

    //sincroniza el state con lo que haya en pacientes
    useEffect(() => {
        localStorage.setItem('pacientes', JSON.stringify(pacientes))
    }, [pacientes])



    const eliminarPaciente = id => { //para eliminar
        const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
        setPacientes(pacientesActualizados)
    }

    return (
        <div className="container mx-auto mt-20">
            <Header />

            <div className="mt-12 md:flex">
                <Formulario
                    pacientes={pacientes}
                    setPacientes={setPacientes}

                    paciente={paciente}
                    setPaciente={setPaciente}
                />
                <ListadoPacientes
                    pacientes={pacientes}

                    setPaciente={setPaciente}
                    eliminarPaciente={eliminarPaciente}
                />
            </div>
        </div>
    )
}

export default App
