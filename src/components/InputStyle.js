import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const Input = styled(TextField)({
  '& label.MuiInputLabel-root': {
    color: '#ffffff',
  },
  '& label.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiInput-root': {
    color: '#ffffff',
  },
  '& .css-ghsjzk-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
    borderBottomColor: '#ffffff'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#1976d2',
  },
});