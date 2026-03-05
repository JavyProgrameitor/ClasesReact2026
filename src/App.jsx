import { Error404 } from "./layout/Error404"
import Layout from "./layout/Layout"
import { Dashboard } from "./modules/dashboard/pages/Dashboard"
import { DataTablePage } from "./modules/DataTable/pages/DataTablePage"
import { Contador } from "./modules/forms/pages/Contador"
import { Forms } from "./modules/forms/pages/Forms"
import { FormsContext } from "./modules/forms/pages/FormsContext"
import { FormsRedux } from "./modules/forms/pages/FormsRedux"
import { ShadcnIndex } from "./modules/shadcndemo/pages/ShadcnIndex"
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
          <Route path="/context" element={<FormsContext />}></Route>
          <Route path="/redux" element={<FormsRedux />}></Route>
          <Route path="/contador" element={<Contador />}></Route>
          <Route path="/prueba" element={<Prueba />}></Route>
          <Route path="/prueba2" element={<Prueba2 />}></Route>
          <Route path="/shadcn" element={<ShadcnIndex />}></Route>
           <Route path="/data-table" element={<DataTablePage />}></Route>
        </Route>

          <Route path="*" element={<Error404/>}/>


      </Routes>
    </>
  )
}

export default App