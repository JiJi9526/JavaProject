import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import CategoryCreate from './pages/CategoryCreate'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskCreate from './pages/TaskCreate'

function App() {

  return (
    <>

     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/categoryCreate' element={<CategoryCreate/>}/>
      <Route path='/taskCreate' element={<TaskCreate/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
