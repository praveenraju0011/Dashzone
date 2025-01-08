import Table from "@mui/joy/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useDashboard from "../../../hooks/useDashboard";
import { useState } from "react";
import DashboardModal from "./DashboardModal";

const Dashboard = () => {
  const { data, isLoading, isError, error, updateMutation, deleteMutation } =
    useDashboard();

  const [rowId, setRowId] = useState(null);
  const [updatedRowData, setUpdatedRowData] = useState({});
  const [open, setOpen] = useState(false);

  function handleRowEdit(row) {
    setRowId(row.id);
    setUpdatedRowData({ ...row });
    setOpen(true);
  }

  function handleUpdate(e) {
    const { name, value } = e.target;
    setUpdatedRowData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRowSave() {
    if (rowId && updatedRowData) {
      updateMutation.mutate(updatedRowData);
      setUpdatedRowData({});
      setRowId(null);
      setOpen(false);
    }
  }

  function handleRowDelete(row) {
    deleteMutation.mutate(row.id);
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.users &&
            data.users.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>
                  {row.password.length > 5
                    ? `${row.password.slice(0, 20)}.....`
                    : row.password}
                </td>
                <td>{row.gender}</td>
                <td>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleRowEdit(row)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleRowDelete(row)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <DashboardModal
        open={open}
        handleClose={() => setOpen(false)}
        updatedRowData={updatedRowData}
        handleUpdate={handleUpdate}
        handleSave={handleRowSave}
      />
    </div>
  );
};

export default Dashboard;
