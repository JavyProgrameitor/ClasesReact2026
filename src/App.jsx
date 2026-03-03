import { Error404 } from "./layout/Error404"
import Layout from "./layout/Layout"
import { Dashboard } from "./modules/dashboard/pages/Dashboard"
import { Contador } from "./modules/forms/pages/Contador"
import { Forms } from "./modules/forms/pages/Forms"
import { Prueba } from "./Prueba"
import { Prueba2 } from "./Prueba2"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      {/* ------ Comentarios ------- */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/forms" element={<Forms />}></Route>
          <Route path="/contador" element={<Contador />}></Route>
          <Route path="/prueba" element={<Prueba />}></Route>
          <Route path="/prueba2" element={<Prueba2 />}></Route>
        </Route>

          <Route path="*" element={<Error404/>}/>


      </Routes>
    </>
  )
}

export default App