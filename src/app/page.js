"use client"

import { Input } from '../components/Input'
import Link from "next/link"
import { useForm } from './hooks/useForm'

export default function Home() {
  const initialForm ={
    cargo: '',
    experiencia: '',
    salario: '',
    habilidad: '',
    requisitos: '',
    estudios:'',
    preguntas_claves:''
  }
  const [formValues, handleInputChange, reset] = useForm(initialForm)
  const { cargo, salario, experiencia, habilidad, requisitos, estudios, preguntas_claves } = formValues;

  const handleStartInterview = () => {
    localStorage.setItem('formValues', JSON.stringify(formValues));
 }
 

  return (
    <main >
      <form>
        <Input placeHolder='especifique el cargo' label='Cargo laboral' onChange={handleInputChange} name='cargo' value={cargo}/>
        <div className="flex flex-row gap-[20px]">
        <Input placeHolder='escriba un monto' label='Salario' name='salario' onChange={handleInputChange} value={salario}/>
        <Input placeHolder='escriba un numero' label='Años de experiencia' name='experiencia' onChange={handleInputChange} value={experiencia}/>
        </div>
        <Input placeHolder='Nivel academico' label='Estudios' name='estudios' onChange={handleInputChange} value={estudios}/>
        <Input placeHolder='separe con una coma (,) las habilidades' label='habilidades' name='habilidad' onChange={handleInputChange} value={habilidad}/>
        <Input placeHolder='separe con una coma (,) las preguntas claves' label='Preguntas claves' name='preguntas_claves' onChange={handleInputChange} value={preguntas_claves}/>
        <Input placeHolder='separe con una coma (,) los requisitos' label='Requisitos excluyentes' name='requisitos' onChange={handleInputChange} value={requisitos}/>
      </form>
      <Link href="/interview">
        <button  onClick={handleStartInterview}  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 mt-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Iniciar entrevista
        </span>
      </button>
      </Link>
    </main>
  )

}
