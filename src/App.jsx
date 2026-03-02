import Layout from "./layout/Layout"
import { Dashboard } from "./modules/dashboard/pages/Dashboard"
import { Prueba } from "./Prueba"
import { Prueba2 } from "./Prueba2"
import {Route,Routes} from "react-router-dom"

function App() {

  return (
    <>
    {/* ------ Comentarios ------- */}
      <Routes>
        <Route path="/" element={<Layout/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/prueba" element={<Prueba/>}></Route>
        <Route path="/prueba2" element={<Prueba2/>}></Route>      
      </Routes>
    </>
  )
}

export default App