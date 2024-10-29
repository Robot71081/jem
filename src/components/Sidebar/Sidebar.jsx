import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
   
    const { onSent, prevPrompt, setRecentPrompt, newChat,extended,setExtended,toggleSidebar } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

   

    return (
        <>
           
            <div className={`sidebar ${extended ? 'open' : ''}`}>
                <div className="top">
                    <img onClick={toggleSidebar} className='menu' src={assets.menu_icon} alt="" />
                    <div onClick={() => newChat()} className="new-chat">
                        <img src={assets.plus_icon} alt="" />
                        {extended ? <span>New Chat</span> : null}
                    </div>
                    {extended && (
                        <div className="recent">
                            <span className="recent-title">Recent</span>
                            {prevPrompt.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                        <img src={assets.message_icon} alt="" />
                                        <p>{item.slice(0, 18)} ...</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
