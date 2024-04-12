// @mui
import { DialogProps } from "@mui/material/Dialog";

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, "title" | "content"> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  onClose: VoidFunction;
};

export type CustomDialogProps = Omit<DialogProps, "title" | "content"> & {
  title: React.ReactNode;
  onClose: VoidFunction;
  action: React.ReactNode;
};
