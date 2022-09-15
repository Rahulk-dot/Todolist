import React,{useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import './App.css';

//const LOCAL_STORAGE_KEY = 'todoApp.todos'

//useState is a hook used in this function. Initialsed with an empty array.
//We saved it in a variable const performing object destructuring.

//useRef is a hook that allows us to refrence elements inside our HTML in out case input.

//useEffect is a hook which takes it first parameter as a function. Every single time anything changes we 
  //we call this useEffect hook.

function App() {
  const [todos,setTodos]= useState([])
  const todoNameRef= useRef()
  

  useEffect(() => {
    
    //This function we use to load the todos.
    //Here we will pass an empty array since we want to call it only once when we load our page.
    
    //const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    //if(storedTodos) setTodos(storedTodos)
    console.log(1)
    fetch("http://localhost:9090/api/task/getAll").then((response) =>response.json()).then((data)=>{
      console.log("Todo items list:",data);
      setTodos(data);

    });

  },[])//Here used to empty array to call our function once. Since empty array never changes it will never recall the useEffect.

  
 // useEffect(() => {

    //This is the function where we want to do things. and a way to determine when to call this function
    //we pass a array of properties here '[todos]'.
    //Here we saved our todo in a localStorage where we have used the setItem method with LOCAL_STRING_KEY as
      //as key parameter and then we use JSON.stringify to save todos in json format.

   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

 // },[todos])//This array is going to be all of our dependencies so anytime anything in this array changes we want to run this useEffect.

  //We made a function to check the checkboxes at will.
  //Here first we save all our todos in newTodos --> newTodos=[...todos]
  //Then we find the todos by id and the change its complete status and then saved it in setTodos.
  //Since each todo is defined in other functions we have to pass toggleTodo to TodoList and Todo js files.

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete= !todo.complete
    setTodos(newTodos)
  }
 
  //We are making the function handleAddTodo, it will take an event property 'e'.
  //Here we initailised our hook in a varible name todoNameRef and then in our input we ref it to that varible.
  //after that in our function we saved the current value in the todoNameRef in a variable name.
  //and displayed in console to check if its working.

  function handleAddTodo(e){
    const name =todoNameRef.current.value
    if(name === '') return
    //console.log(name)

    //We used a function named 'uuidv4' which just generates a random id.
    //This is done to prevent an error --> Warning: Encountered two children with the same key, `1`. 
      //Keys should be unique so that components maintain their identity across updates. 
      //Non-unique keys may cause children to be duplicated and/or omitted

    setTodos(prevTodos => {
      return [...prevTodos,{id:uuidv4(),task:name,complete:false}]
    })

    const task={task:name,complete:false}

    fetch("http://localhost:9090/api/task",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(task)

    }).then(() => {
      console.log("New Task added")
    })
    
    todoNameRef.current.value=null
  }

  //In this function we just saved all the non complete todos in setTodos.

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)

    fetch("http://localhost:9090/api/task/completed",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(newTodos)

    }).then(() => {
      console.log("New Task added")
    })


  }
   
  //Here in the last line we just filtered the todos that are not complete and we printed out its length
  //with --> {todos.filter(todo => !todo.complete).length}
  
  return (
    <div >
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '10vh',
    }}>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddTodo}>Add Todo</button><br/>
    <button onClick={handleClearTodo}>Clear Todo</button><br/>
    <br />{todos.filter(todo => !todo.complete).length} left to do
    </div>
    </div>
  )
          
}

export default App;
