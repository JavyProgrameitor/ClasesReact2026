import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Controlled } from '../components/Controlled';
import { Uncontrolled } from '../components/Uncontrolled';
import { RHF } from '../components/RHF';
import { RHFZod } from '../components/RHFZod';
import { RHFZodShadcn } from '../components/RHFZodShadcn';

const tabItems = [
    // Agrega más tabs según sea necesario
    { value: 'Uncontrolled', title: 'Uncontrolled', component: <Uncontrolled /> },
    { value: 'Controlled', title: 'Controlled', component: <Controlled /> },
      { value: 'RHF', title: 'RHF', component: <RHF /> },
      { value: 'RHFZod', title: 'RHFZod', component: <RHFZod /> },
       { value: 'RHFZodShadcn', title: 'RHFZodShadcn', component: <RHFZodShadcn /> },

]




export const FormIndex = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">

            <h1 className="mb-4 text-2xl font-bold">Demo de formularios</h1>
            <Tabs orientation="horizontal" defaultValue="RHFPrueba" className="w-full">
                <TabsList >
                    {tabItems.map((item) => (
                        <TabsTrigger className="sm:w-full" key={item.value} value={item.value}>
                            {item.title}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabItems.map((item) => (
                    <TabsContent key={item.value} value={item.value}>
                        <div className="m-8">{item.component}</div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
