import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';

const TaskCreate = () => {
  const navigate = useNavigate();
  const repeatOptions = ['EVERYDAY', 'EVERY_WEEK', 'EVERY_MONTH']
  const [categoryData,setCategoryData] = useState([])
  const [inputText, setInputText] = useState({
    label: "",
    start: "",
    end: "",
    repeatType: "",
    categoryId: "",
  })

  const labelHandler = (e)=>{
    const taskLabel = e.target.value
    setInputText({...inputText, label:taskLabel});
  }
  const startHandler = (e)=>{
    const taskStart = e.target.value
    setInputText({...inputText, start:taskStart});
  }
  const endHandler = (e)=>{
    const taskEnd = e.target.value
    setInputText({...inputText, end:taskEnd});
  }
  const RepeatHandler = (e)=>{
    const taskRepeat = e.target.value
    setInputText({...inputText, repeatType:taskRepeat});
  }
  const categoryHandler = (e)=>{
    const taskCategory = e.target.value
    setInputText({...inputText, categoryId:taskCategory});
  }

  const apiUrl2 = "http://localhost:8080/categories"
  useEffect(()=>{
    axios
    .get(apiUrl2)
    .then((response)=>{
      setCategoryData(response.data)
      console.log(response.data)
    })
  },[]);


  const taskHandler= (e) =>{
    e.preventDefault()
    console.log(inputText)
    if(!inputText.label ||!inputText.start ||!inputText.end ||!inputText.categoryId ||!inputText.repeatType ){
      alert("Please fill all the fields")
    }else{
      const apiUrl1 = 'http://localhost:8080/tasks';
      axios
      .post(apiUrl1, {label: inputText.label,startTime: inputText.start,endTime: inputText.end, categoryId: inputText.categoryId, repeatType: inputText.repeatType})
      .then((value)=>console.log(value))
      .then(()=>navigate('/'))
    }
  }
  return (
    <>
      <div className='m-auto w-80 mt-12'>
      <Link to="/"><IoArrowBackCircleOutline className='' size={30}/></Link>
        <div>
        <label className='text-lg font-medium'>Label</label>
          <div className='mt-2'>
          <input className='bg-gray-100 w-80 h-12 rounded-lg mb-2 p-2' 
          type='text' 
          placeholder='Create Instagram post' 
          name='label'
          id='label' required
          onChange={labelHandler}/>
          </div>
        </div>

        <div>
        <label className='text-lg font-medium'>Start Time</label>
          <div className='mt-2'>
            <input className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' 
            type='time' 
            name='start' 
            id='start' 
            onChange={startHandler}/>
            </div>
        </div>

        <div>
        <label className='text-lg font-medium'>End Time</label>
          <div className='mt-2'>
            <input className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' 
            type='time' 
            name='end' 
            id='end' 
            onChange={endHandler}/>
          </div>
        </div>

        <div>
          <label className='text-lg font-medium'>Category</label>
          <div className='mt-2'>
            <select className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' 
              name="categoryId" 
              id="categoryId" 
              type='text' 
              onChange={categoryHandler}>
                {
                  categoryData.map((category, index)=>{
                    return(
                      <option key={index} value={category.id}>{category.name}</option>
                    )
                  })
                }
              </select>
          </div>
        </div>
          
        <div>
          <label className='text-lg font-medium'>Repeat</label>
          <div className='mt-2'>
            <select 
              className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' 
              name='repeatType' 
              id='repeatType' 
              onChange={RepeatHandler}>
                {
                  repeatOptions.map((repeat, index)=>
                  <option key={index} value={repeat} onChange={RepeatHandler}>{repeat}</option>)
                }
            </select>
          </div>
        </div>
        

        <button className='bg-violet-500 w-80 h-11 rounded-md'onClick={taskHandler}>Create Task</button>
      </div>
    </>
  );
}

export default TaskCreate;
