import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Add, Delete, Search, Upgrade } from '@mui/icons-material';
import Button from '@mui/material/Button';




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
        {
            name: 'Date of Joining',
            selector: row=> row.dateofjoining,
            sortable: true
        }
        
    ];
    const data = [
        {
            id: 1,
            name: 'Anas Safder',
            email: 'anas.safder@digifloat.com',
            desigantion: 'Associate Consultant',
            department: 'Web Development',
            dateofjoining: '01/02/2020'

        },
        {
            id: 2,
            name: 'M Usman',
            email: 'm.usman@digifloat.com',
            desigantion: 'Associate Consultant',
            department: 'Web Development',
            dateofjoining: '01/02/2018'

        },
        {
            id: 3,
            name: 'Hammas Nasir',
            email: 'hammas.nasir@digifloat.com',
            desigantion: 'Associate Consultant',
            department: 'HR',
            dateofjoining: '01/02/2023'

        },
        {
            id: 4,
            name: 'Sana Miraj',
            email: 'sana.miraj@digifloat.com',
            desigantion: 'Human Resources Generalist',
            department: 'HR',
            dateofjoining: '01/02/2022'

        },
        {
            id: 5,
            name: 'Komal Aqeel',
            email: 'Komal.aqeel@digifloat.com',
            desigantion: 'Associate Project Cordinator',
            department: 'Project Management',
            dateofjoining: '01/02/2019'

        },
        {
            id: 6,
            name: 'Abc',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',
            dateofjoining: '01/01/01'

        },
        {
            id: 7,
            name: 'bca',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',
            dateofjoining: '01/01/01'

        },
        {
            id: 8,
            name: 'cab',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',
            dateofjoining: '01/01/01'

        },
        {
            id: 9,
            name: 'xyz',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',
            dateofjoining: '01/01/01'

        },
        {
            id: 10,
            name: 'mno',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',
            dateofjoining: '01/01/01'

        },
        {
            id: 11,
            name: 'pqr',
            email: '@digifloat.com',
            desigantion: 'Any',
            department: 'Any',
            dateofjoining: '01/01/01'

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
        <div className='container'>
            <div className='search' 
             style={{width: "fit-content",
              height: "fit-content",
              margin: "16px" }}>
                 <TextField sx={{width:'20ch'}} color='error'
        id="input-with-icon-textfield"
        placeholder='Search'
        onChange={handleFilter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
       <Button sx={{ml:4}} variant="outlined" color="error" startIcon={<Add />}>
        Add Employee
      </Button>
       <Button sx={{ml:4}} variant="outlined" color="error" startIcon={<Delete />}>
        Delete Employee
      </Button>
       <Button sx={{ml:4,}} color='error' variant="contained" endIcon={<Upgrade />}>
        Export to Excel
      </Button>
                 </div>
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