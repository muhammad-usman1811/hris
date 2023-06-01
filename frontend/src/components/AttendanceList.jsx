import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "./common/DataTable";
import moment from "moment";
import axios from "axios";

const AttendanceList = () => {
  const columns = [
    {
      field: "name",
      headerName: <b>Name</b>,
      width: 150,
    },
    {
      field: "department",
      headerName: <b>Department</b>,
      width: 180,
    },
    {
      field: "statusxyz",
      headerName: <b>Status</b>,
      width: 150,
    },
    {
      field: "checkedIn",
      headerName: <b>Checked-In</b>,
      width: 150,
    },
    {
      field: "checkedOut",
      headerName: <b>Checked-Out</b>,
      width: 150,
    },
    {
      field: "workHours",
      headerName: <b>Work Hours</b>,
      width: 150,
    },
  ];

  const [attendance, setAttendance] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const calculateWorkHours = (starttime, endtime) => {
    if (!endtime) {
      return "";
    }
    let startTime = moment(starttime, "hh:mm:ss A");
    let endTime = moment(endtime, "hh:mm:ss A");
    let duration = moment.duration(endTime.diff(startTime));
    let hour = duration.hours();
    let minute = duration.minutes();
    let second = duration.seconds();
    let totalWorkHours = moment({
      hours: hour,
      minutes: minute,
      seconds: second,
    }).format("HH:mm:ss");
    return totalWorkHours;
  };

  const rowsData = attendance.map((row) => {
    return {
      id: row._id,
      name: row.name,
      department: row.department,
      status: "Present",
      checkedIn: row.checkIn,
      checkedOut: row.checkOut,
      workHours: calculateWorkHours(row.checkIn, row.checkOut),
    };
  });
  useEffect(() => {
    const fetchAttendance = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get("/api/attendance", config);
        setAttendance(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendance();
  }, [userInfo]);
  return <DataTable rows={rowsData} columns={columns} />;
};

export default AttendanceList;
