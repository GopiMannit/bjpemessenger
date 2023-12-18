import { useState, } from 'react';
import {useNavigate} from 'react-router-dom';
import { useContext,useEffect } from 'react';
import { toast } from 'react-toastify';
import logo from '../assets/sidebarlogo.jpg'
import axios from 'axios';
import { UserContext } from '../userContext';
import { SERVER_URL } from './config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
function Login({selectedMenu,setSelectedMenu})
{  
  const [username, usernameUpdate] = useState('');
  const { updateUser } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  setSelectedMenu('message');
  useEffect(() => {
    sessionStorage.clear()
  }, []);
  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post(`${SERVER_URL}api/check`, {
        username,
        password
      })
  .then((response) => {
        const a = response.data.message;
        if(a==="true")
        {
          toast.success('Logged in',{ autoClose: 500 });
          sessionStorage.setItem('user', username);
          sessionStorage.setItem('password', password);
          const user=sessionStorage.getItem('user');
          axios
          .get(`${SERVER_URL}api/profile/${user}`)
          .then(response => {
              sessionStorage.setItem('name',response.data.user);
              sessionStorage.setItem('category',response.data.posting);
              sessionStorage.setItem('email',response.data.email);
              sessionStorage.setItem('phoneNumber',response.data.mobile);
              if(response.data.location==='')
              {
                sessionStorage.setItem('location','Not Given');
              }
              else
              {
                sessionStorage.setItem('location',response.data.location);
              }
              if(response.data.dob==='')
              {
                sessionStorage.setItem('dob','Not Given'); 
              }
              else
              {
                    sessionStorage.setItem('dob',response.data.dob);
              }
              navigate('/sidebar');
              updateUser(username, password);   
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
        }
        else if(a==="false_user")
        {
           toast.error('Invalid user',{ autoClose: 500,className:'text-orange'});
           
        }
        else if(a==="false_password")
        {
          toast.error('Invalid Password', { autoClose: 500,className:'bg-orange-500'});
        }
    })
  .catch((error) => {
        toast.error('Failed :' + error.message);
      });
  }
  }
  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      
    }
    if (password === '' || password === null) {
      result =false;
      
    }
    return result;
  }

  const navigate=useNavigate();
  return(
  <div className="h-screen bg-custom-image  bg-cover bg-no-repeat">
    <nav className="bg-[#00A650] ">
      <div className="flex flex-row  items-center p-2 space-x-2">
      <img  className="h-14 w-14 p-2 rounded-full shadow-[0px_0px_15px] shadow-white" src={logo}/>
          <h1 className="font-mono text-[20px] text-white  font-bold tracking-10 ">OREY</h1>
          <h1 className="font-mono text-[20px] text-white  font-bold tracking-10 ">NADU</h1>
      </div>
    </nav>
    <div>
    <div className="flex flex-col right-0 h-screen lg:fixed  item-center mt-28 mr-16 ">
      <div className="h-[450px] w-[330px] bg-[#00A650] rounded-2xl shadow-5xl border-r-0 border-b-0 border-opacity-30">
        <div className="flex flex-col items-center justify-center space-y-[20px]">
        <div className=" p-1 rounded-full m-5">
              <div className="rounded-full m-1">
                <img className="h-[5.5rem] w-[5.5rem] rounded-full shadow-[0px_0px_15px] shadow-white bg-blue-500" src={require('../assets/sidebarlogo.jpg')} alt="user" />
              </div>
            </div>
          <div>
          <form onSubmit={ProceedLogin} className="flex flex-col items-center justify evenly space-y-[25px] m-5">
      <input
    value={username}  
    onChange={(e) => usernameUpdate(e.target.value)}
    type="text"
    required
    placeholder="Enter User Id"
    className="w-[230px] text-sm text-white placeholder-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0"
  />
    <div className="flex flex-row">
    <input
      value={password}
      required
      onChange={(e) => setPassword(e.target.value)}
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter Password"
      className="w-[230px] text-sm text-white placeholder-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0 pr-10"
    />
     <button
     type="button"
             className=" absolute right-0 top-1/7  transform -translate-y-1  mr-12 cursor-pointer bg-[#00A650] focus:outline-none border-b-[0.1px]"
          onClick={togglePasswordVisibility}
        >
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="text-white h-3"
      />
    </button>
  </div>
  <button
    type="submit" 
    className="text-white font-bold h-8 w-48 text-sm cursor-pointer font-poppins rounded px-5 py-1 rounded-sm btncolor border shadow-[0px_0px_5px] shadow-white"
  >
    LOGIN
  </button>
</form>

          </div>
          <div className="flex flex-row space-x-[45px] ">

            <div className="flex flex-row space-x-[3px]">
              <input type="checkbox" className='text-[#F47216]'/>
              <p className="text-sm text-white ">Remember me</p>
            </div>
            <button className=" text-sm  text-white" onClick={()=>{navigate('/password')}}>Forgot password?</button>
          </div>

          <div className='flex flex-row space-x-[10px]'>
            <p className='text-white text-sm'>Dont have an account?</p>
            <button className=' text-sm text-white' onClick={()=>{navigate('/Register')}}>Click here</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}
export default Login;
