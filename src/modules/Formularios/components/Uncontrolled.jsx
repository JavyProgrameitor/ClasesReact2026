import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const Uncontrolled = () => {
    //este es el unico estado pero no es del form en si
    const [posts, setPosts] = useState([]);

    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    // Referencias para los errores
    const titleErrorRef = useRef(null);
    const bodyErrorRef = useRef(null);

    console.log('El componente se ha renderizado');

    // Función para manejar el envío del formulario
    const onSubmit = (event) => {
        event.preventDefault();  // Previene el comportamiento por defecto del formulario
        const validationErrors = validate();

        // Limpiamos los errores del DOM antes de la validación
        clearErrors();

        const hasErrors = Object.keys(validationErrors).length > 0;

        if (hasErrors) {
            displayErrors(validationErrors);  // Muestra los errores en el DOM
            return;
        }

        // Si llega aquí es porque NO hay errores
        const newPost = {
            id: Date.now(),
            title: titleRef.current.value,
            body: bodyRef.current.value,
            published: false,
        };

        setPosts([...posts, newPost]);

        // Resetea los campos después de enviar el formulario
        titleRef.current.value = '';
        bodyRef.current.value = '';

        toast.success("Post creado");
    };

    // Función de validación que devuelve un objeto con los errores encontrados
    const validate = () => {
        let validationErrors = {};

        if (titleRef.current.value.length < 5) {
            validationErrors.title = "El título debe tener al menos 5 caracteres";
        }
        if (!bodyRef.current.value) {
            validationErrors.body = "El contenido es obligatorio";
        }

        return validationErrors;
    };

    //  Función para limpiar los mensajes de error del DOM
    const clearErrors = () => {
        if (titleErrorRef.current) {
            titleErrorRef.current.textContent = '';  // Limpia el mensaje de error del título
        }
        if (bodyErrorRef.current) {
            bodyErrorRef.current.textContent = '';  // Limpia el mensaje de error del contenido
        }
    };

    //  Función para mostrar los errores directamente en los ref del DOM
    const displayErrors = (errors) => {
        if (errors.title && titleErrorRef.current) {
            titleErrorRef.current.textContent = errors.title;  // Muestra el error del título
        }
        if (errors.body && bodyErrorRef.current) {
            bodyErrorRef.current.textContent = errors.body;  // Muestra el error del contenido
        }
    };

    // Función para eliminar un post
    const handleDelete = (id) => {
        setPosts(posts.filter(post => post.id !== id));
        toast.error(`Post ${id} eliminado`)
    };

    // Función para alternar el estado de publicación de un post
    const togglePublished = (id) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, published: !post.published } : post
        ));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Formulario de creación de posts */}
            <Card className="max-h-140">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Gestión de Posts</CardTitle>
                        <CardDescription>
                            Formulario con Refs a los elementos del DOM.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>

                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Título
                            </label>
                            <Input
                                ref={titleRef}
                                type="text"
                                id="title"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Insertar título del post"
                                required
                            />
                            {/* Contenedor para el mensaje de error del título */}
                            <span ref={titleErrorRef} className="text-red-500 text-sm"></span>
                        </div>

                        <div>
                            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                                Contenido
                            </label>
                            <Textarea
                                ref={bodyRef}
                                id="body"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Insertar contenido del post"
                                required
                            />
                            {/* Contenedor para el mensaje de error del contenido */}
                            <span ref={bodyErrorRef} className="text-red-500 text-sm"></span>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full"
                            >
                                Crear Post
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Listado de posts */}
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Listado de Posts</CardTitle>
                        <CardDescription>
                            Publica o elimina los posts creados.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {posts.length === 0 ? (
                        <p className="text-gray-600">No hay posts creados aún.</p>
                    ) : (
                        <ul className="space-y-4">
                            {posts.map(post => (
                                <li key={post.id} className="border p-4 rounded-md relative">
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="absolute top-3 right-3 text-red-500"
                                    >
                                        <Trash2 />
                                    </button>
                                    <h3 className="text-lg font-semibold">{post.title}</h3>
                                    <p className="text-gray-600 mt-2 break-words">{post.body}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className={`text-sm ${post.published ? 'text-green-600' : 'text-red-600'}`}>
                                            {post.published ? 'Publicado' : 'No publicado'}
                                        </span>
                                        <div className="flex items-center">
                                            <Switch
                                                id={`published-${post.id}`}
                                                checked={post.published}
                                                onCheckedChange={() => togglePublished(post.id)}
                                            />
                                            <label htmlFor={`published-${post.id}`} className="ml-2 text-sm text-gray-700">
                                                {post.published ? 'Despublicar' : 'Publicar'}
                                            </label>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}