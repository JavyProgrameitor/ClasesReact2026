import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

const postSchema = z.object({

    title: z.string().min(5, "El título deb tener al menos 5 caracteres"),
    body: z.string().min(1, "El body debe tener contenido")

})

//Libreria React-Hook-Form con Zod y Shadcnd

export const RHFZodShadcn = () => {

    const { handleSubmit, register, control, reset, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: zodResolver(postSchema)
    })


    //este es el unico estado pero no es del form en si
    const [posts, setPosts] = useState([]);

    console.log('El componente se ha renderizado');

    // Función para manejar el envío del formulario
    const onSubmit = (data) => {

        console.log(data)

        // Si llega aquí es porque NO hay errores
        const newPost = {
            id: Date.now(),
            title: data.title,
            body: data.body,
            published: false,
        };

        setPosts([...posts, newPost]);

        reset();
        toast.success("Post creado");
        
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
                            Formulario usando React Hook Form RHF con Zod y Shadcn
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                            <Controller
                                name="title"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Titulo</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Insertar el Titulo"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                                 <Controller
                                name="body"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Contenido</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Insertar el contenido del post"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Crear Post
                                </Button>
                            </div>
                    </form>
                    <DevTool control={control} />
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