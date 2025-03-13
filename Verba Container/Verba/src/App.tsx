import './App.css'
import { Home } from './pages/Home/Home'
import { Clean } from './pages/Clean/Clean'
import { Translate } from './pages/Translate/Translate'
import { Type } from './pages/Type/Type'
import { Upload } from './pages/Upload/Upload'
import { Download } from './pages/Download/Download'
import { Navbar } from './components/Navbar/Navbar'
import {Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/clean' element={<Clean/>}/>
        <Route path='/translate' element={<Translate/>}/>
        <Route path='/type' element={<Type/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/download' element={<Download/>}/>
      </Routes>
    </>
  )
}

export default App
