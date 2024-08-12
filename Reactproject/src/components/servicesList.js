import Service from "./service";
import serviceStore from '../Store/serviceStore';
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import image1 from '../img/cyber.jpg'
import image2 from '../img/W.png'
import image3 from '../img/r.png'
import { observer } from "mobx-react-lite";
import Service1 from "./service";

const ServicesList=observer(()=>{ 
    const images = [image1,image2,image3]; // מערך של התמונות

    useEffect(() => { InitList() }, []);
    const [serviceArr, setServiceArr] = useState();
    async function InitList() {
        await serviceStore.initData();
        setServiceArr(serviceStore.list);
        
    }

    return (
        <>
            {/* <Grid container spacing={0.005}>
                {serviceArr?.map((p) =><Service key={p.id} {...p}  image={images[p.id]}  />)}
            </Grid> */}
                 <Grid container spacing={0.005}>
                {serviceArr && serviceArr.map((service, index) => (
                    <Service key={service.id} {...service} image={images[index]} />
                ))}
            </Grid>
        </>
    );
})

export default ServicesList;
