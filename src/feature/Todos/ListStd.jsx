import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

import {
  useGetStdQuery,
  useUpdateStdMutation,
  useDeleteStdMutation,
} from "../api/apiSlice";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListOfStd() {
  const { isLoading, isSuccess, isError, data: stdData } = useGetStdQuery();
  const [updateStd] = useUpdateStdMutation();
  const [deleteStd] = useDeleteStdMutation();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        <Link to={"/add-data"}>
          <Button variant="contained">Add Student Data</Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell align="center">
                Collge/School Name
              </StyledTableCell>
              <StyledTableCell align="center">Standard</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Completed</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <CircularProgress
                sx={{ width: "100px", height: "100px", marginLeft: "30px" }}
                size={"large"}
              />
            </Box>
          )}
          {isError&&(
            <Typography variant="h1">Something Went wrong </Typography>
          )}
          <TableBody>
            {stdData?.map((ele) => (
              <StyledTableRow key={ele.id}>
                <StyledTableCell component="th" scope="row">
                  {ele.std_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ele.std_school_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ele.std_standard}
                </StyledTableCell>
                <StyledTableCell align="center">{ele.std_age}</StyledTableCell>
                <StyledTableCell align="center">
                  <Checkbox
                    checked={ele.completed}
                    onChange={() =>
                      updateStd({ ...ele, completed: !ele.completed })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/add-data/${ele.id}`}>
                    <Button variant="contained" color="success" size="small">
                      Edit
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteStd(ele.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
