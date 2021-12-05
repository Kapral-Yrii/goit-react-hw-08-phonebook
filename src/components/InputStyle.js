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
  '& div.MuiInput-root:hover:not(.Mui-disabled):before': {
    borderBottomColor: '#ffffff'
  },
  '& div.MuiInput-root:before': {
    borderBottomColor: "#1976d278"
  },
});