
import React from 'react';
import { useTodo } from '../context';
import { useState } from 'react';

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [todo, setTodo] = useState('');

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo('');
  };

  return (
    <div className='flex justify-center items-center  '>
      <form onSubmit={add} className='flex justify-center h-8 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[800px]'>
        <input
          type="text"
          className='bg-gray-300 w-full sm:w-[300px] outline-none text-black placeholder:text-slate-600 rounded-s px-2'
          placeholder='Enter your tasks....'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type='submit' className='text-white bg-green-500 px-4 rounded-e font-bold hover:bg-green-600'>
          ADD
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
