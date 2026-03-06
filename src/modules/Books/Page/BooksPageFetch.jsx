import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function BooksPageFetch() {

  // estados para libros
  const [books, setBooks] = useState([])

  // estados para control de carga y errores
  // loading: true en la primera carga, false después
  const [loading, setLoading] = useState(true)
  // fetching: true durante cualquier carga (primera o refetch), false si no hay carga en curso
  const [fetching, setFetching] = useState(false)
  // error: null si no hay error, mensaje de error si ocurre
  const [error, setError] = useState(null)

  function loadBooks() {
    // Iniciar carga: si es la primera carga, loading=true; si es un refetch, fetching=true
    setFetching(true)
    setError(null)

    // Realizar fetch de libros
    // comprobando si la respuesta es ok, actualizando estados de libros 
    // o error según corresponda, y asegurando actualizar estados de carga al finalizar
    
    // Realizar petición HTTP
    // 1.fetch("http://localhost:3001/books")
    // 2.Comprobar si la respuesta HTTP es correcta y parsear JSON 
    // 3.Actualizar estado de libros con los datos recibidos
    // 4.Manejar errores de red o del servidor
    // 5.Finalmente, actualizar estados de carga (loading y fetching)
 

    fetch("http://localhost:3001/books")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar los libros")
        }
        return res.json()
      })
      .then((data) => {
        setBooks(data)
      })
      .catch((err) => {
        setError(err.message || "Ha ocurrido un error inesperado")
      })
      .finally(() => {
        setLoading(false)
        setFetching(false)
      })
 
  }

  // Cargar libros al montar el componente
  useEffect(() => {
    loadBooks()
  }, [])// El array vacío asegura que esto solo se ejecute una vez al montar

  return (
    <div className="p-6">
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Listado de libros</CardTitle>
            <p className="text-sm text-muted-foreground">
              Fetch tradicional con useEffect
            </p>
          </div>

          <div className="flex items-center gap-2">
            {fetching && !loading ? (
              <Badge>Actualizando...</Badge>
            ) : (
              <Badge variant="secondary">Fetch</Badge>
            )}

            <button
              onClick={loadBooks}
              className="text-sm underline text-muted-foreground hover:text-black"
            >
              Refetch
            </button>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="border rounded-lg p-4">
              <p className="font-medium">Error cargando libros</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          )}

          {!error && (
            <div className="border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Portada</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead className="text-right">Año</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    <TableHead className="text-right">Disponibilidad</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading && // Mientras se carga, mostrar filas de esqueleto
                    Array.from({ length: 6 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-16 w-12" />
                        </TableCell>

                        <TableCell>
                          <Skeleton className="h-4 w-[70%]" />
                        </TableCell>

                        <TableCell>
                          <Skeleton className="h-4 w-[60%]" />
                        </TableCell>

                        <TableCell className="text-right">
                          <Skeleton className="h-4 w-10 ml-auto" />
                        </TableCell>

                        <TableCell className="text-right">
                          <Skeleton className="h-4 w-10 ml-auto" />
                        </TableCell>

                        <TableCell className="text-right">
                          <Skeleton className="h-4 w-16 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))}

                  {!loading && // Cuando no se está cargando, mostrar los datos de los libros
                    books.map((book) => {
                      const copies = Number(book.copies ?? 0)
                      const available = Number(book.available ?? 0)
                      const isAvailable = available > 0

                      return (
                        <TableRow key={book.id}>
                          <TableCell>
                            <img
                              src={`/covers/${book.isbn}-M.jpg`}
                              alt={book.title}
                              className="h-16 w-12 object-cover rounded-md border"
                            />
                          </TableCell>

                          <TableCell>
                            <div className="font-medium">{book.title}</div>

                            <div className="text-xs text-muted-foreground">
                              {book.genre} · {book.pages} pág
                            </div>
                          </TableCell>

                          <TableCell className="text-muted-foreground">
                            {book.author}
                          </TableCell>

                          <TableCell className="text-right text-muted-foreground">
                            {book.year}
                          </TableCell>

                          <TableCell className="text-right">
                            {Number(book.rating).toFixed(1)}
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {isAvailable ? (
                                <Badge>
                                  Disponible
                                </Badge>
                              ) : (
                                <Badge variant="outline">Prestado</Badge>
                              )}

                              <span className="text-xs text-muted-foreground">
                                {available}/{copies}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </div>
          )}

          {!loading && !error && (// Si no hay carga ni error, mostrar el total de libros
            <p className="text-xs text-muted-foreground mt-3">
              Total libros: {books.length}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}