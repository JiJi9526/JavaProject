import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const CategoryCreate = () => {
  const [inputData, setInputData] = useState({
    name: "",
    image: "",
  })

  const navigate = useNavigate();

  const categoryInputHandler = (e)=> {
    const categoryName = e.target.value;
    setInputData({
      ...inputData,
      name: categoryName,
    })
  }

  const imageUrlInputHandler = (e)=> {
    const imageUrl = e.target.value;
    setInputData({
   ...inputData,
      image: imageUrl,
    })
  }

  const submitHandler = (e)=> {
    e.preventDefault();
    console.log(inputData)
    if(!inputData.name || !inputData.image){
      alert("Please fill all the fields")
    }

  const apiUrl = 'http://localhost:8080/categories';
  axios
    .post(apiUrl, {name: inputData.name, imageUrl: inputData.image})
    .then((value)=> console.log(value))
    navigate('/')
};

  
  return (
    <>
      <div className='m-auto w-80 mt-12'>
      <Link to="/"><IoArrowBackCircleOutline className=' mb-2' size={24} /></Link>
        <div>
          <label className='text-lg font-medium'>Name</label>
          <div className='mt-2'>
            <input className='bg-gray-100 w-80 h-12 rounded-lg mb-2 p-2' 
            type='text'
            name='name'
            id='name' 
            placeholder='Enter your name' 
            onChange={categoryInputHandler} />
            </div>
          </div>
        <div>
        <label className='text-lg font-medium'>ImageUrl</label>
          <div className='mt-2'>
          <input className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' 
          type='text' 
          name='imageUrl'
          id='imageUrl'
          placeholder='Enter your imageUrl' 
          onChange={imageUrlInputHandler} />
          </div>
        </div>
        <button className='bg-violet-500 w-80 h-11 rounded-md' onClick={submitHandler}>Create Category</button>
      </div>
    </>
  );
}

export default CategoryCreate;
