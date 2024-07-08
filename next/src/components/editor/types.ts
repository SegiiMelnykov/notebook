import { ReactQuillProps } from 'react-quill';
// @mui
import { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export interface EditorProps extends ReactQuillProps {
  label?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: React.ReactNode;
}
