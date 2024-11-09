import { useState,useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import { faThumbtackSlash } from '@fortawesome/free-solid-svg-icons';

function Data({todos,setTodos}) {
    const [task,setTask] = useState('')
    const [error, setError] = useState('');

    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => {
          setError('');
        }, 1000);
        
        
        return () => clearTimeout(timer);
      }
    }, [error]);

    const handleSubmit= (e) => {
      e.preventDefault();

      const trimmedTask = task.trim();

      if( !trimmedTask || trimmedTask === '""' || trimmedTask === '" "'){
         setError('please provide value')
         return 
        }
        else if(Array.isArray(todos) && todos.find(item=>item.task.toLowerCase() === trimmedTask.toLowerCase())){
               setError(`${trimmedTask} is already in the list`)
               return
        }
        setError('')
    
    axios.post('http://localhost:3001/add',{task: trimmedTask})
    .then(result=>{
     
      
        setTodos(prevTodos => [...prevTodos, result.data]);
        setTask('');
    

     

  
    })

    .catch(err => {
      console.log(err)
     setError('Failed to add task');
    })
         
    
    }
  
  return (
    <div>
        <input type='text' value={task} placeholder='Add some items' onChange={(e)=>setTask(e.target.value)}/>
     <button onClick={handleSubmit}>Add</button>
     {error && <h1>{error}</h1>}
    </div>
  )
}

export default Data