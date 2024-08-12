import Logo from "./logo.js"
import { useState } from 'react';
import AddService from './addService.js';
import ChangeLogo from './changeLogo.js';
import { useEffect } from 'react';
import businessDataStore from '../Store/businessDataStore.js'
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
const Admin=observer(()=>{

    const nav = useNavigate();
    // useEffect(() => { InitList() }, [])
    // const [serviceArr, setServiceArr] = useState();
    // async function InitList() {
    //     await serviceStore.initData();
    //     setServiceArr(serviceStore.list);
    // }

    function handleServices() {
        nav('/admin/services');
    }
    function handleMeetings(){
        nav('/admin/meetings');
        // setAppointment(true);
    }
  
    useEffect(() => { InitLogo() },"")
    const[logo,setLogo]=useState();
    async function InitLogo(){
        await businessDataStore.initData();
        setLogo(businessDataStore.logo);
    }
    return (<>
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f8ff' }}>
      <Logo {...logo}/>
      <Button variant="outlined" onClick={handleServices}>Services</Button>
      <Button variant="outlined" onClick={handleMeetings}>Meetingss</Button>
        <AddService/>
        <ChangeLogo logo={logo} setLogo={setLogo}/>
        </Box>
    </>)
})
export default Admin