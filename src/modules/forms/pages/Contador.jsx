import { Button } from "@/components/ui/button"
import { useState } from "react"

export const Contador = () => {

    const [contador, setContador] = useState(10)

    const sumar = () => {
        setContador(contador + 1)
    }

    const restar = () => {
        setContador(contador - 1)
    }

      const reset = () => {
        setContador (0)
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="grid grid-cols-2 gap-8 bg-white p-10 rounded-2xl shadow-lg">

                {/* Columna 1 - Número grande */}
                <div className="flex items-center justify-center">
                    <span className="text-8xl font-bold text-gray-800">
                        {contador}
                    </span>
                </div>

                {/* Columna 2 - Botones */}
                <div className="flex flex-col justify-center gap-4">
                    <Button
                        onClick={sumar}
                        className="bg-green-500 hover:bg-green-600 text-white text-lg py-6">
                        SUMAR +1
                    </Button>

                    <Button
                        onClick={restar}
                        className="bg-red-500 hover:bg-red-600 text-white text-lg py-6">
                        RESTAR -1
                    </Button>

                      <Button
                        onClick={reset}
                        className="bg-red-500 hover:bg-red-600 text-white text-lg py-6">
                        RESET
                    </Button>
                </div>

            </div>
        </div>
    )
}
