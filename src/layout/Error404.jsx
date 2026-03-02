import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home, SearchX } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

/**
 * Página de error (404 por defecto).
 * La puedes reutilizar también para otros errores pasando props.
 */
export default function Error404({
  code = 404,
  title = "Página no encontrada",
  message = "La ruta que buscas no existe o fue movida.",
}) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="relative flex min-h-[calc(100vh-2rem)] items-center justify-center p-6">
      {/* Fondo suave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/70 via-background to-background"
      />

      <Card className="relative w-full max-w-2xl overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -left-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 size-64 rounded-full bg-secondary/25 blur-3xl"
        />

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-muted">
              <SearchX className="size-5" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Error <span className="font-medium text-foreground">{code}</span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-5">
          <div className="space-y-2">
            <p className="text-muted-foreground">{message}</p>
            <div className="rounded-lg border bg-muted/40 p-3 text-sm">
              <p className="text-muted-foreground">Intentaste entrar a:</p>
              <p className="mt-1 break-all font-mono text-[0.85rem]">{location.pathname}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="mr-2" />
              Volver
            </Button>

            <Button asChild>
              <Link to="/">
                <Home className="mr-2" />
                Ir al inicio
              </Link>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Tip: revisa la URL o usa el menú lateral para navegar.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
