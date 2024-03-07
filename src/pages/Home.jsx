import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgMenuLeft } from "react-icons/cg";
import { CiSquarePlus } from "react-icons/ci";
import c1 from "../assets/react.svg"
import { CiSquareCheck } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import './strike.css';
import axios from 'axios';

const Home = () => {    
    const navigate= useNavigate();

    const taskHandler = () => {
        navigate("/TaskCreate")
    }
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    const [categories,setCategories] = useState([]);
    const apiUrl = 'http://localhost:8080/categories'
    useEffect(()=>{
        axios
        .get(apiUrl)
        .then((response)=>{
            setCategories(response.data)
            console.log(response.data)
        })
    },[])

    const [tasks,setTasks] = useState([]);
    const apiUrl2 = 'http://localhost:8080/tasks'
    useEffect(()=>{
        axios
      .get(apiUrl2)
      .then((response) => {
        setTasks(response.data)
        console.log(response.data)
      })
    },[]);
    return (


        <>
        <form className='m-5'>
            <div className='flex justify-between mb-9'>
                <CgMenuLeft size={30}/>
                <div className='flex gap-2'>
                    <CiSearch size={30}/>
                    <IoIosNotificationsOutline size={30}/>
                </div>

            </div>

            <div className='mb-7'>
                <h1 className='font-medium text-xl mb-1'>Hey there, Vally</h1>
                <p>Organize your plans for the day</p>
            </div>


            <div className='flex align-middle justify-between'>
                <h2 className='font-medium text-lg mb-5'>Categories</h2>
                <Link to="/categoryCreate"><CiSquarePlus className='pl-2' size={30}/></Link>
            </div>
            <div className='flex mb-6 overflow-x-scroll gap-2'>
                {
                    categories.map((category)=>
                    <div className='pl-3' key={category.id}>
                    <div className='bg-gray-300 items-center rounded-xl'><img src={category.imageUrl} alt='category' className='text-center m-auto p-2 size-16'/></div>
                    <p className='text-center font-medium'>{category.name}</p>
                    </div>
                    )
                }
            </div>
            <div>
            <h3 className='font-medium text-lg mb-5'>Today's Tasks</h3>
            <div className='mb-10'>
                {
                    tasks.map((task) =>
                    <div className='bg-gray-200 w-full h-20 rounded-xl' key={task.id}>
                    <div className='flex gap-3 items-center align-middle p-4'>
                        <input type="checkbox" className="bordered border-blue-500 m-3 size-4" onChange={handleCheckboxClick}/>
                        <div>
                            <label className={isChecked ? 'font-medium completed' : 'font-medium'}>{task.label}</label>
                            <p>{task.startTime}-{task.endTime}</p>
                        </div>
                    </div>
                    </div>
                    )
                }
            </div>
            <button className='bg-violet-500 w-full h-11 rounded-md' type='submit' onClick={taskHandler}>+ Add a new task</button>
            </div>
            </form>
        </>
    );
}

export default Home;
