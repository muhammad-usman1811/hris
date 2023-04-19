import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";

const LeaveQuotaModal = ({ open, handleClose }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const [message, setMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);

  const [leaveQuotas, setLeaveQuotas] = useState([
    { leaveType: "Earned", leaveCount: 12 },
    { leaveType: "Casual", leaveCount: 4 },
    { leaveType: "Sick", leaveCount: 4 },
    { leaveType: "Maternity", leaveCount: 90 },
    { leaveType: "Paternity", leaveCount: 3 },
    { leaveType: "Special Sick", leaveCount: 30 },
    { leaveType: "Bereavement", leaveCount: 2 },
  ]);

  const handleQuotaChange = (index, event) => {
    const newLeaveQuotas = [...leaveQuotas];
    newLeaveQuotas[index].leaveCount = event.target.value;
    setLeaveQuotas(newLeaveQuotas);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsToDisplay = leaveQuotas.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("/api/leaveQuotas", {
        leaveQuotas: leaveQuotas.map((quota) => ({
          leaveType: quota.leaveType,
          leaveCount: quota.leaveCount,
        })),
      });
      setMessage(response.data);
      setLeaveQuotas([
        { leaveType: "Earned", leaveCount: 0 },
        { leaveType: "Casual", leaveCount: 0 },
        { leaveType: "Sick", leaveCount: 0 },
        { leaveType: "Maternity", leaveCount: 0 },
        { leaveType: "Paternity", leaveCount: 0 },
        { leaveType: "Special Sick", leaveCount: 0 },
        { leaveType: "Bereavement", leaveCount: 0 },
      ]);
      setOpenToast(true);
    } catch (error) {
      setMessage(error);
    }
  };

  const handleCloseToast = () => {
    setOpenToast(false);
    setMessage("");
  };

  useEffect(() => {
    const fetchQuotas = async () => {
      try {
        const { data } = await axios.get("/api/leaveQuotas");
        setLeaveQuotas(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuotas();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set Leave Quota</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Quota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToDisplay.map((leave, index) => (
              <TableRow key={leave.leaveType}>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={leave.leaveCount}
                    onChange={(event) =>
                      handleQuotaChange(index + page * rowsPerPage, event)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5]}
          component="div"
          count={leaveQuotas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default LeaveQuotaModal;
