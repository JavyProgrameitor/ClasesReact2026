import React from "react"
import Error404 from "./Error404"

/**
 * Captura errores de render (runtime) y muestra una pantalla amigable.
 * Nota: esto no captura errores en handlers async (fetch, eventos, etc.).
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Útil en desarrollo. En producción podrías enviarlo a un servicio (Sentry, etc.).
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught an error", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error404
          code={500}
          title="Ups… algo se rompió"
          message="Ocurrió un error inesperado. Prueba a volver atrás o recargar la página."
        />
      )
    }

    return this.props.children
  }
}
