import Layout from "./layout/Layout"
import { Dashboard } from "./modules/dashboard/pages/Dashboard"
import { Prueba } from "./Prueba"
import { Prueba2 } from "./Prueba2"
import {Route,Routes} from "react-router-dom"
import Error404 from "./layout/Error404"
import { ErrorBoundary } from "./layout/ErrorBoundary"


function App() {

  return (
    <>
    {/* ------ Comentarios ------- */}
      <ErrorBoundary>
        <Routes>
          {/* Rutas con layout (sidebar, header, etc.) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="prueba" element={<Prueba />} />
            <Route path="prueba2" element={<Prueba2 />} />
          </Route>

          {/* Catch-all: cualquier ruta no definida */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}

export default App