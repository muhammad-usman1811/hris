import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

function EmployeeTable() {
    const columns = [
        {
            name: 'ID',
            selector: row=> row.id,
        },
        {
            name: 'Name',
            selector: row=> row.name,
        },
        {
            name: 'Email',
            selector: row=> row.email,
        },
        {
            name: 'Designation',
            selector: row=> row.desigantion,
        },
        {
            name: 'Department',
            selector: row=> row.department,
        }
    ];
    const data = [
        {
            id: 1,
            name: 'Anas Safder',
            email: 'anas.safder@digifloat.com',
            desigantion: 'Associate Consultant',
            department: 'Web Development'

        },
        {
            id: 2,
            name: 'M Usman',
            email: 'm.usman@digifloat.com',
            desigantion: 'Associate Consultant',
            department: 'Web Development'

        },
        {
            id: 3,
            name: 'Hammas Nasir',
            email: 'hammas.nasir@digifloat.com',
            desigantion: 'Associate Consultant',
            department: 'HR'

        },
        {
            id: 4,
            name: 'Sana Miraj',
            email: 'sana.miraj@digifloat.com',
            desigantion: 'Human Resources Generalist',
            department: 'HR'

        },
        {
            id: 3,
            name: 'Komal Aqeel',
            email: 'Komal.aqeel@digifloat.com',
            desigantion: 'Associate Project Cordinator',
            department: 'Project Management'

        }
    ]
    
    return(
        <div className='container mt-5'>
            <DataTable
            columns= {columns}
            data={data}
            selectableRows
            fixedHeader
            pagination
            ></DataTable>


        </div>
    )   
}
export default EmployeeTable