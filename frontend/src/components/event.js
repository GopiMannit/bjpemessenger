import React from "react";
const MessagePreview = ({ message, onClose }) => {
  console.log(message);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close text-3xl cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <div
          className="bg-white p-4 rounded-md shadow-lg text-white flex flex-col items-center" 
          style={{ width: '800px', height: '500px' }}
        >
          <h1 className="text-center text-xl font-semibold text-black">Message Sent</h1>
         <div className="overflow-auto mt-20 justify-center border border-black" style={{ width:'700px',height: '300px' }}>
          <p className="text-base text-black text-center text-justify p-2">
            {/* Your long message content here */}
            {message ? message : 'No Message'}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePreview;