'use client'

import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { TodoProvider } from './context'

export default function Home() {
  const [todos, setTodos] = useState([])


  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    if(todos.length>0){

      localStorage.setItem('todos',JSON.stringify(todos))
    }
  },[todos])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
    console.log(id, todo)

  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev?.map((toggleTodo) => toggleTodo.id === id ? { ...toggleTodo, completed: !toggleTodo.completed } : toggleTodo))
  }

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, removeTodo, toggleComplete }}>
      <div className='w-full min-h-screen flex items-center flex-col '>
        <div className='my-10'>  <span className='text-4xl  text-cyan-400 font-extrabold '>Task</span><span className='text-black font-extrabold text-3xl '>Buddy</span>
        </div>    
        <TodoForm />
        <hr className='w-full h-1 border-t-4 border-gray-400 my-4' />
        {todos.map((item) => (
          <div className='w-full my-1 flex justify-center ' key={item.id}>
            <TodoItem todo={item} />
          </div>
        ))}
      </div>
    </TodoProvider>
  )
}
