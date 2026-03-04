import { configureStore } from '@reduxjs/toolkit'
// Importamos el reducer que exportamos por defecto desde nuestro Slice
import tasksReducer from './tasksSlice'

export const store = configureStore({
  // En este objeto declaramos todos los Slices de nuestra app.
  // En aplicaciones grandes aquí habría perfiles, carritos de compra, notificaciones, etc.
  reducer: {
    tareas: tasksReducer,  // 'tareas' es el nombre de la cajita dentro del estado global
  },
})

export default store