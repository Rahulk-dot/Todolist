import React from 'react'

export default function Todo({todo, toggleTodo}) {

    //A function to handle the click event on the checkbox.

    function handleTodoClick(){
        toggleTodo(todo.id)
    }
  return (
   

    //Here we added a checkbox right next to our task name.

    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '10vh',
    }} >
        <label >
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.task}

        </label>
    </div>
  )
}
