import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { observer } from 'mobx-react-lite';
import store from '../Store/meetingStore'
import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//להביא את הפרופס מהקומפוננטה 
const AddMeeting=observer((props)=>{
 
  const today = dayjs();
  const isInCurrentYear = (date) => date.get('year') === dayjs().get('year');

  const [open, setOpen] = useState(false);
  const {serviceType}=props
  
  const [meeting,setMeeting] = useState({
    id: 0,
    serviceType: serviceType,
    dateTime: "2021-06-20T10:00:54.000Z",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleChange(feild,value)
  {
    let tempMeeting=meeting
    tempMeeting[feild]=value
    setMeeting(tempMeeting)
  }


  function handleClick(){
  
    store.insert(meeting)

    //הוספה לשרת צריך לבדוק מה הוא מחזיר ולאיפה (אם התאריך תפוס צריך לומר את זה למשתמש)
  //  handleClose();
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
         Contact Us
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            // event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please leave your details<br/> and select a convenient date and time<br/> for a representative to contact you.<br/> We strive to provide you<br/> with the requested information<br/> as soon as possible.
          </DialogContentText>
          <TextField autoFocus required margin="dense" id="clientName" label="Name" variant="standard" 
          onChange={(e)=>{handleChange("clientName",e.target.value)}}/><br/><br/>
          <TextField autoFocus required margin="dense" id="clientPhone" label="Phone" variant="standard"
          onChange={(e)=>{handleChange("clientPhone",e.target.value)}} /><br/><br/>
          <TextField  autoFocus  required margin="dense" id="clientEmail" label="Email Address"  type="email" variant="standard" 
          onChange={(e)=>{handleChange("clientEmail",e.target.value)}} /><br/><br/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DateTimePicker']}>
        <DemoItem label="DateTimePicker">
          <DateTimePicker defaultValue={today} shouldDisableYear={isInCurrentYear}
           onChange={(e)=>{handleChange("dateTime",e)}} /><br/><br/>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>        
    </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClick}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
})
export default AddMeeting
