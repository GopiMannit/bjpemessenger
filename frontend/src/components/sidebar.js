import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMessage, faBook,faList } from '@fortawesome/free-solid-svg-icons';
import Message from './message';
import Profile from './profile';
import Summary from './summary';
import logo from '../assets/sidebarlogo.jpg'
import Logout from '../assets/logout.png'
import Report from './report';
const Sidebar = ({ selectedMenu, setSelectedMenu}) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
 
  const renderPage = () => {
    switch (selectedMenu) {
      case 'summary':
        return <Summary/>;
      case 'profile':
        return <Profile/>;
      case 'message':
        return <Message/>;
      case 'report':
        return <Report/>
      default:
        return <Message/>;
    }
  };
  return (
    <div className="flex h-full">
      <div className={`bg-[#00A650] h-screen p-5 pt-8 duration-300 relative ${open ? 'w-72' : 'w-20'}`}>
        <BsArrowLeftShort
          className={`bg-white text-[#00203f] text-3xl rounded-full absolute -right-3 top-9 border border-[#f97d09] cursor-pointer transform transition-transform ${!open ? 'rotate-180' : ''
            }`}
          onClick={() => setOpen(!open)}
        />
        <div className="ml-9 mt-1 w-fit">
          <h1 className={`text-white text-center origin-left font-medium text-2xl duration-500 ${!open ? 'scale-0' : '0'}  `}>
            OREY NADU
          </h1>
        </div>
        <div className="mt-3 ml-10">
          <img className={`h-28 w-26  ${!open ? 'scale-0' : '0'} rounded-full     shadow-[0px_0px_10px]  shadow-white`} src={logo} onClick={()=>setSelectedMenu('message')} />
        </div>
        <div className="mt-10">
          <ul className="ml-6 space-y-5 flex flex-col h-[400px]">
            <li
              className={`text-white cursor-pointer text-[18px] flex flex-row space-x-4 duration-300   ${!open ? 'scale-0' : '0'} `}
              onClick={() => handleMenuClick('summary')}
            >
              <div className={`${!open ? 'scale-0' : '0'} duration-300  ${selectedMenu === 'summary' ? 'mt-2' : ''}`}>
                <FontAwesomeIcon icon={faList} className='bg-[#00A650] h-4 ml-2  shadow-[0px_0px_10px]  shadow-white' />
              </div>
              <div className={`${!open ? 'scale-0 ' : '0'}duration-300 ${selectedMenu === 'summary' ? 'text-[26px]' : ''}`}>
                Summary
              </div>
            </li>
            <li
              className={`text-white cursor-pointer text-[18px] flex flex-row space-x-4 duration-300   ${!open ? 'scale-0' : '0'} `}
              onClick={() => handleMenuClick('report')}
            >
              <div className={`${!open ? 'scale-0' : '0'} duration-300 ${selectedMenu === 'report' ? 'mt-2' : ''}`}>
                <FontAwesomeIcon icon={faBook} className={`bg-[#00A650] ml-2  shadow-[0px_0px_10px]  shadow-white`} />
             
              </div>
              <div className={`${!open ? 'scale-0' : '0'} ${selectedMenu === 'report' ? 'text-[26px]' : ''} duration-300 `}>
                    Report
              </div>
            </li>
            <li
              className={`text-white cursor-pointer  text-[18px] flex flex-row space-x-4 duration-300  ${!open ? 'scale-0' : '0'} `}
              onClick={() => handleMenuClick('message')}
            >
              <div className={`${!open ? 'scale-0' : '0'} duration-300 ${selectedMenu === 'message' ? 'mt-2' : ''}`  }>
                <FontAwesomeIcon icon={faMessage} className='bg-[#00A650] h-4 ml-2  shadow-[0px_0px_10px]  shadow-white' />
              </div>
              <div className={`${!open ? 'scale-0' : '0'} duration-300 ${selectedMenu === 'message' ? 'text-[26px]' : ''}`}>
                Message
              </div>
            </li>
            <li
              className={`text-white cursor-pointer text-[18px] flex flex-row space-x-4 duration-300   ${!open ? 'scale-0' : '0'} `}
              onClick={() => handleMenuClick('profile')}
            >
              <div className={`${!open ? 'scale-0' : '0'} duration-300 ${selectedMenu === 'profile' ? 'mt-2' : ''}`}>
                <FontAwesomeIcon icon={faUser} className='bg-[#00A650] h-4 ml-2  shadow-[0px_0px_10px]  shadow-white' />
              </div>
              <div className={`${!open ? 'scale-0' : '0'}duration-300 ${selectedMenu === 'profile' ? 'text-[26px]' : ''}`}>
                Profile
              </div>
            </li>

          </ul>
        </div>
      </div>

      <div className={`background flex w-full `}>
        <div className='flex justify-center  mt-10 mx-auto'>
          {renderPage()}
        </div>
        <div className=' pr-5 pt-5 cursor-pointer h-fit ' onClick={() => navigate('/login')} >
          {/* <FontAwesomeIcon icon={faCircleLeft} className=' text-[#00a650] bg-white rounded-full h-10 ' /> */}
          <button>
              <img src={Logout} className='rounded-full h-12 w-12 bg-white  shadow-[0px_0px_5px] shadow-white ' />
          </button>
        </div>
      </div>
    </div>
    
    
  );
};
export default Sidebar;
