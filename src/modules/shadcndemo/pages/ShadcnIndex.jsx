import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccordionDemo } from '../components/AccordionDemo';
import { AlertDemo } from '../components/AlertDemo';
import { ButtonDemo } from '../components/ButtonDemo';
import { AlertDialogDemo } from '../components/AlertDialogDemo';
import { DialogDemo } from '../components/DialogDemo';
import { ContextMenuDemo } from '../components/ContextMenuDemo';
import { SheetDemo } from '../components/SheetDemo';
import { TableDemo } from '../components/TableDemo';


const tabItems = [
    // Agrega más tabs según sea necesario
    { value: 'AccordionDemo', title: 'Accordion', component: <AccordionDemo /> },
    { value: 'AlertDemo', title: 'Alert', component: <AlertDemo /> },
    { value: 'ButtonDemo', title: 'Button', component: <ButtonDemo /> },
    { value: 'AlertDialog', title: 'AlertDialog', component: <AlertDialogDemo /> },
    { value: 'DialogDemo', title: 'Dialog', component: <DialogDemo /> },
    { value: 'ContextMenuDemo', title: 'ContextMenu', component: <ContextMenuDemo /> },
    { value: 'SheetDemo', title: 'Sheet', component: <SheetDemo /> },
    { value: 'TableDemo', title: 'Table', component: <TableDemo /> },
]



export const ShadcnIndex = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">

            <h1 className="mb-4 text-2xl font-bold">Demo de componentes de Shadcn</h1>
            <Tabs orientation="horizontal" defaultValue="AccordionDemo" className="w-full">
                <TabsList >
                    {tabItems.map((item) => (
                        <TabsTrigger className="sm:w-full md:w-[130px]" key={item.value} value={item.value}>
                            {item.title}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabItems.map((item) => (
                    <TabsContent key={item.value} value={item.value}>
                        <div className="w-3/5 m-8">{item.component}</div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
