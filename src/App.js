import './App.css'
import {Chat} from "./Component/Navbar"
import {Fragment, useContext} from"react"
import {Route ,Router, Routes} from "react-router-dom"
import { Register } from './page/Register'
import { Login } from './page/login'
import { Home } from './page/home'
import AuthProvider from './context/auth'
import { PrivateRoute } from './Component/privateRoute'
import {AuthContext} from "./context/auth"
import {Profile} from "./page/profile"


function App() {
  const {user} = useContext(AuthContext)

  return (
    <div className="App">
        <AuthProvider>
            <Chat/> 
            <Routes>
              <Route path='/message' element={<Home/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/profile' element={<Profile/>} />

            </Routes>
        </AuthProvider>
    </div>
  )
}

export default App
