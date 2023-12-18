import React from 'react';
import { useState } from 'react';
// import  {Header}  from './components/header';
import Sidebar from './components/sidebar';
import Login from './components/login';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Summary from './components/summary';
import Password from './components/password';
import Register from './components/register'
// import BackgroundColor from './BackgroundColor';
function App() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [close,setClose]=useState(true);
  
  return (
        <>
        {/* <BackgroundColor></BackgroundColor> */}
        {/* <Header/> */}
        <ToastContainer></ToastContainer>
        <BrowserRouter>
          <Routes>
                <Route path="/" element={<Login selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>} />
                <Route path="/login" element={<Login selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>} />
                <Route path="/sidebar" element={<Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>}>
                    <Route path="/sidebar/summary" element={<Summary close={close} setClose={setClose}/>}/>
                </Route>
                <Route path="/register" element={<Register/>}/>
                <Route path="/password" element={<Password/>}/>
          </Routes>
        </BrowserRouter></>
  );
}
export default App;


