import React from "react";
import employee from "./images/userpic.png";


const EmployeeProfile = () => {
    return (
        <>
        <div className="employeeprofile">
            <form method="">
                <div className="row1"
                style={{width:"20%"}}>
                    <div className="column">
                    </div>
                   <img src={employee}
                   style={{width: "auto",
                    height: "200px",
                    margin: "70px"}}
                   alt="" />
                </div>
                



            </form>
        </div>
        </>
    )
}

export default EmployeeProfile