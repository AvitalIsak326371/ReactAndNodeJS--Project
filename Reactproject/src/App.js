import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/homepage'
import Admin from './components/admin';
import DataTable from './components/dataTable';
import ServicesList from './components/servicesList';
export default function App() {
    

    return (<div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/> } />
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/admin/services' element={<><Admin/><ServicesList/></>} />
                <Route path='/admin/meetings' element={<><Admin/><DataTable/></>}/>
            </Routes>
        </BrowserRouter>
        {/* <ButtonBaseDemo/> */}
    </div>)
}