// @mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//
import { CustomDialogProps } from "./types";
import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ----------------------------------------------------------------------

export default function CustomDialog({
  title,
  open,
  children,
  action,
  onClose,
  ...other
}: CustomDialogProps) {
  const handleClose = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={true}
      onClose={handleClose}
      {...other}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Box>{title}</Box>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              sx={{ minWidth: "auto" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ typography: "body2" }}> {children} </DialogContent>
      <DialogActions>
        {action}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}
          type="button"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
