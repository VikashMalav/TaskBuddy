import React from 'react';
import { useTodo } from '../context';
import { useState } from 'react';

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { removeTodo, updateTodo, toggleComplete } = useTodo();

  const edit = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div className={`w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded px-2 flex flex-row flex-wrap transition duration-500 ease-in-out  ${todo.completed ? 'bg-red-200' : 'bg-purple-200'}`}>
     <div> <input
        type="checkbox"
        className='mr-2 '
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      {isTodoEditable ? (
        <input
          type="text"
          className={`${
            isTodoEditable ? 'border-black/10 px-2  bg-purple-200 ' : 'border-transparent bg-purple-200'
          } ${todo.completed ? 'line-through' : ''}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          
          readOnly={!isTodoEditable}
        />
      ) : (
        <span className={`${todo.completed ? 'line-through' : ''}  `}>{todoMsg}</span>
      )}

      <button
        type="button"
        className={`rounded p-[2px] m-1 bg-white  ${todo.completed?'bg-slate-300':''}`}
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            edit();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? '📂' : '✏️'}
      </button>
      <button className="bg-white rounded p-[2px] hover:bg-slate-200" onClick={() => removeTodo(todo.id)}>
        ❌
      </button>
      </div>
    </div>
  );
};

export default TodoItem;
