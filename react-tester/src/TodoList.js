import React from 'react'
import Todo from './Todo'

//To print eact one of our todos
//It is done inside loop
//We mapped over our current array and return element of our actual todos.

export default function TodoList({todos,toggleTodo}) {
  return (

    //Here we mapped over all of our todos
    //So for each one of our todo we return a Todo Component.

    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/>
        
        //Each child in a list should have a unique "key" prop --> This Warning will come without "key".
        //This key is unique and it allows react to only rerender or change 
        //the unique value given to it instead of the whole array.

    })
  )
}
