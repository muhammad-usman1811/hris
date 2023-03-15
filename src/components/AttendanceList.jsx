import React, { useState } from 'react';
import DataTable from 'react-data-table-component';




function EmployeeTable() {
    const columns = [
        
        {
            name: 'Serial No.',
            selector: row=> row.serial,
            sortable: true
        },
        {
            name: 'Emp ID',
            selector: row=> row.empid,
        },
        {
            name: 'Name',
            selector: row=> row.name,
        },
        {
            name: 'Department',
            selector: row=> row.department,
            sortable: true
        },
        {
            name: 'Status',
            selector: row=> row.status,
            sortable: true
        }
        
    ];
    const data = [
        {
            id: 1,
            serial: '1',
            empid: '45',
            name: 'Anas Safder',
            department: 'Web Development',
            status: 'Absent'

        },
        {
            id: 1,
            serial: '2',
            empid: '55',
            name: 'M Usman',
            department: 'Web Development',
            status: 'Present'

        },
        {
            id: 1,
            serial: '3',
            empid: '35',
            name: 'Osama Saeed',
            department: 'Web Development',
            status: 'Present'

        },
        {
            id: 1,
            serial: '4',
            empid: '75',
            name: 'Hamas Nasir',
            department: 'HR',
            status: 'Present'

        },
        {
            id: 1,
            serial: '5',
            empid: '88',
            name: 'Hamza Salman',
            department: 'Project Management',
            status: 'Present'

        },
        
    ]
    const [records, setRecords] = useState(data);

    function handleFilter(event) {
        const newData = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)

    }
    return(
        <div className='container'>
            
            <DataTable
            columns= {columns}
            data={records}
            fixedHeader
            pagination
            
            ></DataTable>


        </div>
    )   
}
export default EmployeeTable