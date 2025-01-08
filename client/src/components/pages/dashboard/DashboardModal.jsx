import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DashboardModal = ({
  open,
  handleClose,
  updatedRowData,
  handleUpdate,
  handleSave,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit User
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={updatedRowData.name || ""}
            onChange={handleUpdate}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={updatedRowData.email || ""}
            onChange={handleUpdate}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={updatedRowData.gender || ""}
            onChange={handleUpdate}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 2 }}
          >
            <SaveIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleClose}
          >
            <DisabledByDefaultIcon />
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default DashboardModal;
