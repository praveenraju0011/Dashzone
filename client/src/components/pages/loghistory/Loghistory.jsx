import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import { getLogDetails } from "../../../api/getLogDetails";

const Loghistory = () => {
  const [logData, setLogData] = useState([]);
  useEffect(() => {
    const fetchLogData = async () => {
      const data = await getLogDetails();
      setLogData(data.userLogData);
      console.log(data.userLogData);
    };
    fetchLogData();
  }, []);

  return (
    <div>
      {logData.length && logData.map((data) => {})}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logData.length &&
              logData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.userId}
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.time}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Loghistory;
