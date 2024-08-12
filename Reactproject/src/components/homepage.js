import Logo from "./logo";
import serviceStore from '../Store/serviceStore';
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Service1 from "./Service1";
import businessDataStore from '../Store/businessDataStore';
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import image1 from '../img/cyber.jpg';
import image2 from '../img/W.png';
import image3 from '../img/r.png';

const HomePage = observer(() => {
    useEffect(() => {
        InitList();
        InitLogo();
    }, []);

    const [serviceArr, setServiceArr] = useState([]);
    const [logo, setLogo] = useState(null);

    async function InitList() {
        await serviceStore.initData();
        setServiceArr(serviceStore.list);
    }

    async function InitLogo() {
        await businessDataStore.initData();
        setLogo(businessDataStore.logo);
    }

    const images = [image1, image2, image3];

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#f0f8ff' }}>
            <Logo {...logo} />
            <Grid container spacing={0.005}>
                {serviceArr.map((service, index) => (
                    <Service1 key={service.id} {...service} image={images[index]} />
                ))}
            </Grid>
        </Box>
    );
});

export default HomePage;
