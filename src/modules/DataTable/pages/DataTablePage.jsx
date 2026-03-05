import React from 'react'
import { DataTable } from '../components/data-table'
import { columns } from '../components/columns'

export const payments = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
    {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
    {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
    {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
    {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
    {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
    {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
    {
    id: "489e1d42",
    amount: 125,
    status: "9",
    email: "example@gmail.com",
  },
    {
    id: "10",
    amount: 125,
    status: "10",
    email: "example@gmail.com",
  },
    {
    id: "11",
    amount: 125,
    status: "11",
    email: "example@gmail.com",
  },
    {
    id: "12",
    amount: 125,
    status: "12",
    email: "example@gmail.com",
  },
  // ...
]



export const DataTablePage = () => {
 return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={payments} />
    </div>
  )
}
