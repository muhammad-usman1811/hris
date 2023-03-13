import React, { useState } from 'react';
import DataTable from 'react-data-table-component';




function EmployeeTable() {
    const columns = [
        
        {
            name: 'Name',
            selector: row=> row.name,
            sortable: true
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
            sortable: true
        },
        
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
            id: 5,
            name: 'Komal Aqeel',
            email: 'Komal.aqeel@digifloat.com',
            desigantion: 'Associate Project Cordinator',
            department: 'Project Management',

        },
        {
            id: 6,
            name: 'Abc',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',

        },
        {
            id: 7,
            name: 'bca',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',

        },
        {
            id: 8,
            name: 'cab',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',

        },
        {
            id: 9,
            name: 'xyz',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',

        },
        {
            id: 10,
            name: 'mno',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',

        },
        {
            id: 11,
            name: 'pqr',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',

        }
        
    ]
    const [records, setRecords] = useState(data);

    function handleFilter(event) {
        const newData = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)

    }
    return(
        <div className='container mt-5'>
            <div className='search' 
             style={{width: "fit-content",
              height: "fit-content",
              margin: "16px" }}>
                <input type="text" placeholder='Search Employee'
                 style={{borderRadius: "10px",
                height: "25px",
                border: "1px solid lightgrey"}}
                 onChange={handleFilter} /></div>
            <DataTable
            columns= {columns}
            data={records}
            selectableRows
            fixedHeader
            pagination
            
            ></DataTable>


        </div>
    )   
}
export default EmployeeTable