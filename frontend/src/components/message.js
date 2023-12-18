import React, { useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Video from "./video";
import { toast } from 'react-toastify';
import { SERVER_URL,BASE_URL,TOKEN_USER } from './config';
function Message()
{
  const [searchTerm,setSearchTerm] = useState("");
  const [data,setData]=useState([]);
  const navigate=useNavigate();
  const [bool,setbool]=useState(false);
  const [flag,setflag]=useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [videoid, setVideoUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [localurl,setlocalUrl]=useState("");
  const [tag,setInput]=useState("");
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const handleurlChange = (event) => {
    setInputUrl(event.target.value);
  };
  const handletagchange=(event)=>{
    setInput(event.target.value);
  }
  const handlePreviewClick = () => {
    var b=inputUrl.split("=");
    setVideoUrl('http://www.youtube.com/embed/'+b[b.length-1]);
    openPopup();
  };
  const user=sessionStorage.getItem('user');
  console.log(videoid);
  useEffect(() => {
      // If the searchTerm is not empty, fetch data from the API  
      if(searchTerm.includes(' '))  
      {
        setData([]);
        setflag(false);
        
      }
      else if(searchTerm!=='')
      {
        loadUserData();
      }
      else
      {
        setData([]);
        setflag(false);
      }
   
  }, [searchTerm]);
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };  
    const loadUserData = async () => {
      const response = await axios.post(`${SERVER_URL}api/user`, {
        searchTerm,
      });
      setData(response.data);
      //console.log(response.data);
      // setData(()=> response.data.map(item => {
      //   const keyValuePairs = item.split(',').map(pair => pair.trim());
      //   const itemObject = {};
      //   keyValuePairs.forEach(pair => {
      //     const [key, value] = pair.split(':');
      //     itemObject[key] = value;
      //   });
      //   return itemObject;
      // }))
      setflag(true);
      // setData(response.data);
      console.log(response.data);
      // setPhoneNumbers(response.data.map((user) => user.phonenumber));
      console.log(data);    
      };

    const [content, setcontent] = useState([]);
    const columns = useMemo(
        () => [
          {
            accessorKey: 'name', //access nested data with dot notation
            header: 'Name',
          },
          {
            accessorKey: 'phonenumber',
            header: 'Phone',
          },
          {
            accessorKey: 'posting', //normal accessorKey
            header: 'Posting',
          },
          {
            accessorKey: 'district', //normal accessorKey
            header: 'District',
          }
        ],
        [],
      );
      const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const inputText = event.target.value;
    // You can add logic here to limit the message to 200 words if needed
    setMessage(inputText);
  };
  const handlevideoChange=(event)=>{
      setlocalUrl(event.target.value);
      console.log(event.target.value);
  }
  const [rowSelection, setRowSelection] = useState({});
  const selectedIndices = Object.keys(rowSelection).filter(key => rowSelection[key]);
  const  filteredSelectedData= selectedIndices.map(index => {
    const item = data[index];
    if (item && item.name && item.phonenumber) {
      return {
        name: item.name,
        phone: item.phonenumber
      };  
    }
    return null;
  });
  const selectedData = filteredSelectedData
  .filter(item => item !== null) // Remove null values
  .map(item => [item.name, item.phone]);
  const member = filteredSelectedData
  .filter(item => item !== null) // Remove null values
  .map(item => "91"+item.phone);
  console.log(member);
  const sendMember = async () => {
    const url = `${BASE_URL}/api/v1/user/whatsapp/phone/919551530140/send-text`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN_USER}`,
    };
    console.log(url);
    const data = {
      to: member,
      // message:"Hi,\n\n"+message+"\n\n"+inputUrl,
      message: "Hi 🇮🇳\n\n"+inputUrl+" \n\n"+message+" \n\nJai Bharat 🪷",
    };
    // const data={
    //   to: ["919551530140"],
    //   caption: "Ammk Logo",
    //   photo_url: "C:/Users/Chenn/Downloads/ammk color.png"
    // }
    console.log(url);
    console.log(member);
    console.log(message);
    try {
      const response = await axios.post(url, data, { headers });
      console.log('Message sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  //console.log(selectedData);
  const sendMessage = async (e) => {    
  if(tag!=="" && videoid!=="" && data.length!==0)  
  {
    e.preventDefault();
    let dobj = {
      user,
      tag,
      videoid,
      message,
      selectedData
    };
      fetch(`${SERVER_URL}api/summaries`, {
        method: "POST",
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(dobj)
      }).then((res) => {
          console.log(member);
          sendMember();
          console.log('success');
          toast.success("Message Sent", { autoClose: 1000 })
          setMessage('');
          setData([]);
          setInput("");
          setInputUrl("");
          setSearchTerm("");
          setVideoUrl("");
          axios.get(`${SERVER_URL}api/summary`)  
          .then(response => {
            const dataString = JSON.stringify(response.data);
            console.log(dataString);
            sessionStorage.setItem('data', dataString);
            console.log(sessionStorage.getItem('data'));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            });
      }).catch((err) => {

      });
  }
  else
  {
      if(tag==="" && videoid==="")
      {
        toast.error("Please Enter Tag and URL",{ autoClose: 1000 })
      }
      else if(tag==="" && videoid!=="")
      {
        toast.error("Please Enter Video Tag",{ autoClose: 1000 });
      }
      else if(tag!=="" && videoid==="")
      {
        toast.error("Please Enter Video URL",{ autoClose: 1000 });
      }
      if(tag!=="" && videoid!=="" && data.length===0)
      {
        toast.error("Please Select Members", { autoClose: 1000  });
      }

  }
  };
  
  const [selectAll, setSelectAll] = useState(false);
  const sendSms=()=>{
    if(message==="")
    {
      toast.error("Please Enter Message",{autoClose:1000});
    }
  }
  const handleSelectAll = () => {
    const newSelection = {};
    if (!selectAll) {
      data.forEach((_, index) => {
        newSelection[index] = true;
      });
    }
    setRowSelection(newSelection);
    setSelectAll(!selectAll);
  };
    return(
  <div className="mt-8 bg-white h-[650px] overflow-y-auto flex-col  justify-center w-[1080px] border shadow-[0px_0px_10px] shadow-white">
      <div className="p-4 ">   
      <textarea
          className={`w-full h-[100px] resize-none border border-white  shadow-[0px_0px_5px] shadow-[#fb660d] ${message.length===0 ? 'p-1': 'p-4' } focus:outline-none `}
          placeholder="Enter your message (maximum 200 words)"
          value={message}
          onChange={handleChange}
      ></textarea>
      </div>
      <div className="flex flex-col justify-center items-center p-4 w-full">
          <div className="flex justify-between w-full">
               <input 
                type="text"
                placeholder="Enter Tag Name"
                value={tag} 
                onChange={handletagchange}
                className="border border-white w-[240px] shadow-[0px_0px_5px] shadow-[#fb660d] p-1 focus:outline-none"
                />
              <input 
                type="text"
                placeholder="Enter video URL"
                value={inputUrl}
                onChange={handleurlChange}
                className="border border-white w-[600px]  shadow-[0px_0px_5px] shadow-[#fb660d] p-1 focus:outline-none "
              />
              <button onClick={handlePreviewClick} className='py-1 px-3 rounded-sm text-white flex btncolor border shadow-[0px_0px_5px] shadow-[#fb660d]'>
                Preview
              </button>
              {popupOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <Video videoUrl={videoid} onClose={closePopup} />
                </div>
              )}
            </div>
        </div>
     
        <div className="pt-4 pl-4 pr-4 pb-1">
      <TextField
          label="Search"  
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-white w-full  shadow-[0px_0px_3px] shadow-[#fb660d] focus:outline-none"
          style={{ outline: 'none' }}
          
        />
        </div>
        {flag && (
                <div className='pl-4 mt-5'>
                  <button
                    onClick={handleSelectAll}
                    className="text-white h-8 w-52 cursor-pointer rounded-sm  py-1 btncolor border shadow-[0px_0px_5px] shadow-[#fb660d]"
                  >
                    {selectAll ? 'Unselect All' : 'Select All'}
                  </button>
                </div>
              )}
        <div className="pl-4 pr-4 pb-4">
        <MaterialReactTable 
          columns={columns}
          data={data}
          enableRowSelection
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableColumnActions={false}
          enableHiding={false}
          initialState={{ pagination: { pageSize: 5 } }}
          onRowSelectionChange={setRowSelection}
          state={{ rowSelection }}
          />
          
          </div>
   <div className="flex flex-row justify-end">    
    <div className="p-4">
      <button className="text-white  h-10 w-52  cursor-pointer  rounded-sm px-5 py-1 btncolor border shadow-[0px_0px_5px] shadow-[#fb660d] " onClick={sendMessage} >
            Publish Whatsapp
      </button>
    </div>
    {/* <div className="p-4">
      <button className="text-white  h-10 w-52  cursor-pointer  rounded-sm px-5 py-1 btncolor border shadow-[0px_0px_10px] shadow-[#fb660d]" onClick={sendSms}  >
            Publish Sms
      </button>
    </div> */}
 
    </div>
    </div>
    )
}
export default Message;

