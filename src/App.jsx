import { useState } from 'react'
import Nav from './components/Nav'
import Form from './components/Form'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import CreatePost from './pages/CreatePost/CreatePost'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost'

function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Nav/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/adicionar' element={<CreatePost />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/search' element={<Search />} />
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/posts/edit/:id' element={<EditPost/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
