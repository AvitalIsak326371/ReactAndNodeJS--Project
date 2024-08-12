import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import store from '../Store/loginStore'
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Login=observer(()=>
{

  const [open, setOpen] = React.useState(false);
   const nav=useNavigate();
  const [log,setLog]=useState(false);
   const[user,setUser]= useState({
     name:"",
     password:"",
   })
  
   async function handleClick(){
      await store.ifAdmin(user);
      setLog(store.isAdmin);
   }
  
   
   

  const handleClickOpen = () => {
    setOpen(true);
  };
  function handleChange(feild,value)
  {
    let tempUser=user;
    tempUser[feild]=value;
    setUser(tempUser);
    console.log("user: name:"+ user.name+" password:"+user.password);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
     <Button 
  variant="outlined" 
  onClick={handleClickOpen} 
  style={{ color: 'black' }} // הגדרת צבע הטקסט לשחור
>
  Login
</Button>

      {log&&nav('/admin')}
      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            user.name=formJson.name;
            user.password=formJson.password;   
            console.log(user.name);
            console.log(user.password);
            handleClose();
          },
          
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your name and{<br/>}
             your password to be in touch.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="name"
            type="text"
            
            variant="outlined"
            onChange={(e)=>{handleChange("name",e.target.value)}}
          /><br/><br/>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            
            variant="outlined"
            onChange={(e)=>{handleChange("password",e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClick}>Subscribe</Button>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
})
export default Login