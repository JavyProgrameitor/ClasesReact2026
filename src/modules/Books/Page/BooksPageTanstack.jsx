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

import { useMutation, useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

async function loadBooks() {
  const respuesta = await fetch("http://localhost:3001/books")
  if (!respuesta.ok) throw new Error("Error cargando libros")
  return respuesta.json()
}

async function deleteBook(idBook){
  const response =  await fetch(`http://localhost:3001/books${idBook}`,
    {
      method: `DELETE`
    }
  )
  if (!response.ok) throw new Error ("Error al borrado del libro" + idBook)
    response.json()
}


export function BooksPageTanstack() {

  const {data: books = [], isLoading: loading, isError: error, isFetching: fetching } = useQuery(
    {
      queryKey: ["books"],
      queryFn: loadBooks
    }
  )

  const deleteMutation = useMutation(
    {
      mutationKey: [],
      mutationFn: () => deleteBook(id)
    }
  )

 const handleDelete = (id) => {
  deleteMutation.mutate(id)
 }

  return (
    <div className="p-6">
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Listado de libros con Tanstack</CardTitle>
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
                            <Link to={`/books/${book.id}`}>
                            <div className="font-medium">{book.title}</div>
                          </Link>
                            <div className="text-xs text-muted-foreground">
                              {book.genre} · {book.pages} pág
                            </div>
                          </TableCell>

                          <TableCell className="text-muted-foreground">
                            <div onClick={() => handleDelete(book.id)}>Borrar</div>
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