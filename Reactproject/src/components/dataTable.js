import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import store from '../Store/meetingStore';
import { observer } from "mobx-react-lite";

const columns = [
  { field: 'id', headerName: 'ID', width: 20 },
  { field: 'serviceType', headerName: 'Service Type', width: 300 },
  { field: 'dateTime', headerName: 'Date Time', width: 250 },
  { field: 'clientName', headerName: 'Client Name', width: 150 },
  { field: 'clientPhone', headerName: 'Client Phone', width: 120 },
  { field: 'clientEmail', headerName: 'Client Email', width: 200 },
  { 
    field: 'meetingStatus', 
    headerName: 'Meeting Status', 
    width: 120,
    renderCell: (params) => {
      const currentDate = new Date();
      const meetingDate = new Date(params.row.dateTime);
      
      if (meetingDate < currentDate) {
        return <div style={{ color: 'red' }}>PASS</div>;
      } else if (meetingDate.toDateString() === currentDate.toDateString()) {
        return <div style={{ color: 'green' }}>TODAY</div>;
      } else {
        return <div style={{ color: 'blue' }}>FUTURE</div>;
      }
    }
  }
];

const DataTable = observer(() => {
 
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowsData, setRowsData] = React.useState([]);
   
  React.useEffect(() => {
    initMeetList();
  }, []);

  async function initMeetList() {
    const data = await store.get();
    // מיון הנתונים לפי תאריך בסדר עולה
    data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    setRowsData(data); 
  }

  const handleClose = () => {
    setOpenDialog(false);
  };
  

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ height: 400, width: 1200 }} >
        <DataGrid
          rows={rowsData}
          columns={columns}
          pageSize={5}
          autoHeight
        />
      </div>
    </div>
    </>
  );
});

export default DataTable;
