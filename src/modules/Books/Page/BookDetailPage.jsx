import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"

async function loadBook(id) {
  const respuesta = await fetch(`http://localhost:3001/books/${id}`)
  if (!respuesta.ok) {
    throw new Error("Error cargando libro")
  }
  return respuesta.json()
}

export function BookDetailPage() {
  //necesitamos el id del libro para cargar su detalle
  //??
 const { id } = useParams()

const {
  data: book,
  isLoading: loading,
  isError,
  error,
} = useQuery({
  queryKey: ["books", id],
  queryFn: () =>loadBook(id),
  
})


  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-64 w-full max-w-xl" />
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="p-6">
        <p>Error cargando libro</p>
        <Link to="/books-tanstack" className="underline">
          Volver
        </Link>
      </div>
    )
  }

  const copies = Number(book.copies ?? 0)
  const available = Number(book.available ?? 0)
  const isAvailable = available > 0

  return (
    <div className="p-6">
      <Link
        to="/books-tanstack"
        className="text-sm underline text-muted-foreground hover:text-black"
      >
        ← Volver al listado
      </Link>

      <Card className="mt-4 max-w-3xl">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>{book.title}</CardTitle>
              <p className="text-muted-foreground">{book.author}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              {isAvailable ? (
                <Badge>Disponible</Badge>
              ) : (
                <Badge variant="outline">No disponible</Badge>
              )}

              <span className="text-xs text-muted-foreground">
                {available}/{copies} disponibles
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex gap-6">
          <img
            src={`/covers/${book.isbn}-M.jpg`}
            alt={book.title}
            className="h-56 w-40 object-cover rounded-lg border"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/book-${book.id}/200/300`
            }}
          />

          <div className="space-y-2 text-sm">
            <p>
              <strong>ID:</strong> {book.id}
            </p>

            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>

            <p>
              <strong>Año:</strong> {book.year}
            </p>

            <p>
              <strong>Páginas:</strong> {book.pages}
            </p>

            <p>
              <strong>Editorial:</strong> {book.publisher}
            </p>

            <p>
              <strong>Idioma:</strong> {book.language}
            </p>

            <p>
              <strong>Género:</strong> {book.genre}
            </p>

            <p>
              <strong>Ubicación:</strong> {book.location}
            </p>

            <p>
              <strong>Rating:</strong> {book.rating}
            </p>

            <p>
              <strong>Ejemplares:</strong> {copies} (disponibles: {available})
            </p>

            {Array.isArray(book.tags) && book.tags.length > 0 ? (
              <div className="pt-2">
                <p className="font-medium mb-2">Etiquetas</p>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}