import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { observer } from 'mobx-react-lite';
import store from '../Store/businessDataStore';
// import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

//להביא את הפרופס מהקומפוננטה 
const ChangeLogo = observer((props) => {
  const { logo, setLogo } = props;
  const [newData, setNewData] = React.useState(logo);
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };
  function handleChange(feild, value) {
    let tempData = { ...logo }; // יצירת העתק חדש של נתוני הקומפוננטה
    tempData[feild] = value; // שינוי הערך בהעתק החדש
    setLogo(tempData); // עדכון הסטייט של הקומפוננטה
    setNewData(tempData); // עדכון הסטייט המקומי
  }
  
  function handleClick() {

    store.insert(newData);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change logo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Change logo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Change the logo,<br />
            please enter the details.<br />
            We
            will send updates occasionally.
          </DialogContentText>
          <TextField autoFocus required margin="dense" id="name" label="Name" variant="standard"
            onChange={(e) => { handleChange("name", e.target.value) }} /><br /><br />
          <TextField autoFocus required margin="dense" id="phone" label="Phone" variant="standard"
            onChange={(e) => { handleChange("phone", e.target.value) }} /><br /><br />
          <TextField autoFocus required margin="dense" id="owner" label="Owner" type="text" variant="standard"
            onChange={(e) => { handleChange("owner", e.target.value) }} /><br /><br />
          <TextField autoFocus required margin="dense" id="logo" label="Logo" type="text" variant="standard"
            onChange={(e) => { handleChange("logo", e.target.value) }} /><br /><br />
          <TextField autoFocus required margin="dense" id="description" label="Description" type="text" variant="standard"
            onChange={(e) => { handleChange("description", e.target.value) }} /><br /><br />
          <TextField autoFocus required margin="dense" id="address" label="Address" type="text" variant="standard"
            onChange={(e) => { handleChange("address", e.target.value) }} /><br /><br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClick}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
})
export default ChangeLogo;