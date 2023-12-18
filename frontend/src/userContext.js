import React, { createContext, useState } from 'react';
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message,setmessage]=useState("");
  const [selected,setSelected]=useState('');
  const [open,setOpen]=useState(true);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [dob, setDOB] = useState('');
  const [location,setlocation]=useState('');
  const [data,setData]=useState("");
  const updateUser = (name,pass) => {
    setUser(name);
    setPassword(pass);
  };
  const setMessage =(mes)=>{
    setmessage(mes);
  }
  const setselected=(mes)=>{
    setSelected(mes);
  }
  const userState = {
    user,
    password,
    open,
    message,
    selected,
    name,
    phoneNumber,
    email,
    category,
    dob,
    location,
    data,
    updateUser,
    setCategory,
    setDOB,
    setEmail,
    setName,
    setPassword,
    setlocation,
    setMessage,
    setselected,
    setOpen,
    setUser,
    setData,
  };
  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};
