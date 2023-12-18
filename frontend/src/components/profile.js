import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from './config';
function Profile() {
  const [user, setName] = useState(sessionStorage.getItem('name'));
  const [mobile, setPhoneNumber] = useState(sessionStorage.getItem('phoneNumber'));
  const [email, setEmail] = useState(sessionStorage.getItem('email'));
  const [posting, setPosting] = useState(sessionStorage.getItem('category'));
  const [dob, setDOB] = useState(sessionStorage.getItem('dob'));
  const [location,setlocation]=useState(sessionStorage.getItem('location'));
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    axios
    .patch(`${SERVER_URL}api/patchprofile/${user}`,{user,mobile,posting,dob,email,location})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
      sessionStorage.setItem('name',user);
      sessionStorage.setItem('phoneNumber',mobile);
      sessionStorage.setItem('category',posting);
      sessionStorage.setItem('email',email);
      sessionStorage.setItem('location',location);
      sessionStorage.setItem('dob',dob);
      console.log(sessionStorage.getItem('location')); 
    setIsEditing(false);

  };
  return (
    <div className="flex flex-col content justify-center  bg-white h-[450px] w-[1080px] space-y-10 mt-8 h-[650px] border shadow-[0px_0px_40px] shadow-white">
    <div className="flex flex-row justify-center space-x-20">
      <div className={`${isEditing?'space-y-5':'space-y-4'}`}> {/* Adjust the vertical spacing here */}
            {!isEditing && (
                <h1 className="text-[#278d27] font-bold">Name</h1>  
            )}
        <h1 className="text-[#278d27] font-bold ">Phone Number</h1>
        <h1 className="text-[#278d27] font-bold">Email Id</h1>
        <h1 className="text-[#278d27] font-bold">Category</h1>
        <h1 className="text-[#278d27] font-bold">DOB</h1>
        <h1 className="text-[#278d27] font-bold">Location</h1>
      </div>
      <div className="space-y-4"> 
        {isEditing ? (
          <>
          <div className="flex flex-col space-y-5">
            <input
              type="text"
              value={mobile}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-black rounded-sm"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded-sm"
            />
            <input
              type="text"
              value={posting}
              onChange={(e) => setPosting(e.target.value)}
              className="border border-black rounded-sm"
            />
            <input
              type="text"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
              className="border border-black rounded-sm"
            />
             <input
              type="text"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              className="border border-black rounded-sm"
            />
            </div>
          </>
        ) : (
          <>
            <h4 className="text-[#F47216] font-bold">{user}</h4>
            <h4 className="text-[#F47216] font-bold">{mobile}</h4>
            <h4 className="text-[#F47216] font-bold">{email}</h4>
            <h4 className="text-[#F47216] font-bold">{posting}</h4>
            <h4 className="text-[#F47216] font-bold">{dob}</h4>
            <h4 className="text-[#F47216] font-bold">{location}</h4>
          </>
        )}
      </div>
      </div>
      <div className="flex justify-end"> 
        {isEditing ? (
           <>
            <button onClick={handleSave} className="text-white px-4 py-2 mr-12 w-20 rounded-sm btncolor border shadow-[0px_0px_10px] shadow-[#fb660d] ">
                Save
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="text-white px-4 py-2 mr-12 w-20 rounded-sm btncolor border shadow-[0px_0px_10px] shadow-[#fb660d] ">
                Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default Profile;
