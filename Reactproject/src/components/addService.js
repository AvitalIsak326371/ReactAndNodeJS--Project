import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import serviceStore from '../Store/serviceStore';
import { observer } from 'mobx-react-lite';

const AddService = observer((props) =>{
  const [open, setOpen] = React.useState(false);
  const [service, setService] = React.useState({
    id: 0,
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(field, value) {
    setService((prevService) => ({
      ...prevService,
      [field]: value
    }));
  }

  function handleClick() {
    
    console.log(service);
    serviceStore.insert(service);
    handleClose()
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Service
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: '500px' } // Customize the width of the dialog
        }}
      >
        <DialogTitle>Add Service</DialogTitle>
        <DialogContent
          sx={{ // Customize the spacing of the content
            '& > :not(style)': { mb: 2 },
          }}
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            variant="standard"
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth // Make the text field take the full width
          />
          <TextField
            required
            margin="dense"
            id="description"
            label="Description"
            variant="standard"
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth // Make the text field take the full width
          />
          <TextField
            required
            margin="dense"
            id="price"
            label="Price"
            variant="standard"
            onChange={(e) => handleChange("price", e.target.value)}
            fullWidth // Make the text field take the full width
          />
          <TextField
            required
            margin="dense"
            id="duration"
            label="Duration"
            variant="standard"
            onChange={(e) => handleChange("duration", e.target.value)}
            fullWidth // Make the text field take the full width
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClick}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default AddService;
