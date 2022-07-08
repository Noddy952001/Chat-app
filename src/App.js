import './App.css'
import {Chat} from "./Component/Navbar"
import {Route , Routes} from "react-router-dom"
import { Register } from './page/Register'
import { Login } from './page/login'
import { Messenger } from './page/Messenger'
import { Home } from './page/home'

import AuthProvider from './context/auth'


function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Chat/> 
            <Routes>
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/messenger' element={<Messenger/>} />
              <Route path='/' element={<Home/>} />
            </Routes>
        </AuthProvider>
    </div>
  )
}

export default App
