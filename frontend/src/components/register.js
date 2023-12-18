import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLocationPin, faKey,faEnvelope,faBriefcase,faPhone,faMessage,faLock,faCalendarDays, faList, faMagnifyingGlass, faTrash, faPenToSquare, faNoteSticky, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from './config';
function Register() {
  const navigate = useNavigate();
  // const tohome = () => { navigate('/DashBoard') };
  const [user, userchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [mobile,mobilechange] = useState("");
  const [posting, postingchange] = useState("");
  const [password, passwordchange] = useState("");
  const [formattedDate,setBirthDate]=useState("");
  const [dob,setdob]=useState("");
  const [conformpassword, conformpasswordchange] = useState("");
  const [location,locationchange] = useState("");
  useEffect(() => {
      userchange("");
      namechange("");
      emailchange("");
      mobilechange("");
      postingchange("");
      passwordchange("");
      conformpasswordchange("");
      locationchange("");
      setBirthDate("");
  }, []);
  const IsValidate = () => {
    let isproceed=true;
    if(user==='' && name==='' && email==='' && mobile==='' && posting==='' && password==='' && conformpassword==='' && dob==='' && location==='')
    {
      isproceed=false;
    }
    return isproceed;
  }
  const handleDateChange = (date) => {
    setdob(formatCustomDate(date));
    setBirthDate(date);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let dobj = {
        user,
        mobile,
        email,
        posting,
        password,
        location,
        dob
    };
    if (IsValidate()) {
      fetch(`${SERVER_URL}api/register`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dobj)
      }).then((res) => {
        if(res.status === 204)
        {
            toast.error('User Exists', { autoClose: 500 });
        }
        else if(res.status === 200)
        {
            toast.success('Registered successfully.', { autoClose: 500 });  
            navigate('/login');
        }
      }).catch((err) => {
        toast.error('Failed :' + err.message);
      });
    }
  }
  function formatCustomDate(inputDate) {
    const dateObj = new Date(inputDate);
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const year = dateObj.getFullYear().toString();
  
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="flowerregister background">
    <div className="flex flex-row justify-end items-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5  h-[700px] w-[350px] items-center  mr-36 bg-[#00A650] rounded-3xl shadow-5xl border-r-0 border-b-0 border-opacity-30">
          <div className="flex flex-col items-center justify-center m-6 ">
            <div className=" p-1 rounded-full m-5">
              <div className="rounded-full m-1">
                <img className="h-[5.5rem] w-[5.5rem] rounded-full bg-blue-500  shadow-[0px_0px_15px] shadow-white" src={require('../assets/sidebarlogo.jpg')} alt="user" />
              </div>
            </div>
            <div>
              <p className="text-xl text-white"> Register Here</p>
            </div>
          </div>
          <div className="flex flex-col space-y-[24px] mt-2">
            <div className=' flex flex-row space-x-3'>
                      <FontAwesomeIcon icon={faUser} className='text-white mt-1 shadow-[0px_0px_5px]  shadow-white' />
                      <input value={user} onChange={e => userchange(e.target.value)} type="text" placeholder="Enter username" className="text-[15px] w-52  text-sm   text-white placeholder-white bg-transparent focus:outline-none border-b-2 required"
                        required
                        pattern=".*\S+.*" 
                      />
            </div>
            <div className="flex flex-row space-x-3">
           
                      <FontAwesomeIcon icon={faCalendarDays} className='text-white mt-1  shadow-[0px_0px_5px]  shadow-white' />
                
            <DatePicker
                selected={formattedDate}
                onChange={handleDateChange} 
                placeholderText="DOB"
                className="text-[15px] w-52 text-sm text-white placeholder-white bg-transparent focus:outline-none border-b-2"
            />
            </div>
            <div className="flex flex-row space-x-3">
            
                      <FontAwesomeIcon icon={faEnvelope} className='text-white mt-1   shadow-[0px_0px_5px]  shadow-white' />
               
                <input value={email} onChange={e => emailchange(e.target.value)} type="text" placeholder="Enter email" className="text-sm w-52 text-sm text-white placeholder-white bg-transparent focus:outline-none border-b-2" 
                   required
                   pattern=".*\S+.*" 
                />
            </div>
            <div className="flex flex-row space-x-3">
          
                      <FontAwesomeIcon icon={faPhone} className='text-white mt-1   shadow-[0px_0px_5px]  shadow-white' />
             
                <input value={mobile} onChange={e => mobilechange(e.target.value)} type="text" placeholder="Enter Mobile Number" className="text-sm w-52 text-sm text-white  placeholder-white bg-transparent focus:outline-none border-b-2"
                  required 
                /> 
            </div>
            <div className="flex flex-row space-x-3">
         
                      <FontAwesomeIcon icon={faBriefcase} className='text-white mt-1    shadow-[0px_0px_5px]  shadow-white' />
                
              <input value={posting} onChange={e => postingchange(e.target.value)} type="text" placeholder="Enter Posting" className="text-sm w-52 text-sm text-white placeholder-white  bg-transparent focus:outline-none border-b-2"
                required
              />
            </div>
            <div className="flex flex-row space-x-3">
        
                      <FontAwesomeIcon icon={faLock} className='text-white mt-1  shadow-[0px_0px_5px]  shadow-white' />
              <input value={password} onChange={e => passwordchange(e.target.value)} type="password" placeholder="Password" className="text-sm w-52 text-sm  text-white placeholder-white bg-transparent focus:outline-none  border-b-2"
                required
              />
            </div>
            <div className="flex flex-row space-x-3">
   
                      <FontAwesomeIcon icon={faKey} className='text-white mt-1   shadow-[0px_0px_5px]  shadow-white' />
    
                  <input value={conformpassword} onChange={e => conformpasswordchange(e.target.value)} type="password" placeholder="Conform Password" className="text-sm w-52 text-sm text-white  placeholder-white bg-transparent focus:outline-none border-b-2 " 
                    required
                  />
            </div>
            <div className="flex flex-row space-x-3">
        
                      <FontAwesomeIcon icon={faLocationPin} className='text-white mt-1   shadow-[0px_0px_5px]  shadow-white' />
                <input value={location} onChange={e => locationchange(e.target.value)} type="text" placeholder="Location" className="text-sm w-52 text-sm text-white placeholder-white  bg-transparent focus:outline-none border-b-2"
            
                />
            </div>
          </div>
        <div className="mt-6">
     <button className="text-white font-bold  h-8 w-40 ml-10 text-sm cursor-pointer font-poppins rounded-sm  px-5 btncolor border shadow-[0px_0px_5px] shadow-white" >
              Create Account
    </button>
    <div className='flex flex-row  mt-5 space-x-[10px]'>
            <p className='text-white text-sm'>Already Have an account?</p>
            <button className=' text-sm text-white' onClick={()=>{navigate('/')}}>Click here</button>
          </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
export default Register;
