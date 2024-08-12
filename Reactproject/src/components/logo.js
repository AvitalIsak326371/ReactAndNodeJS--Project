import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './login';
import AddService from './addService';
import DataTable from './dataTable';

export default function Logo(props) {
  const { id, name, address, phone, owner, logo, description } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h4" // גודל כותרת גדול יותר
                component="div"
                sx={{
                  fontFamily: 'Caveat, cursive', // שימוש בגופן Caveat
                  color: 'black', // צבע הטקסט שחור
                }}
              >
                {name} {/* שם העסק */}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {address} | {phone} {/* כתובת וטלפון */}
              </Typography>
            </Box>
          </Box>
          <Login />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
