//import { type } from "@testing-library/user-event/dist/type";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import CryptoJS from 'crypto-js';
import {db} from "../firebase";
//import add from "../img/a5.jpg";


const Chats = () => {

    const [chats, setChats] = useState([]);

    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    const [decryptedText, setDecryptedText] = useState('');
    const key = 'my-secret-key';
   

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            });
    
            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats()
    }, [currentUser.uid]);

    //console.log(Object.entries(chats));
    
    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload: u });
    }

    
    
    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{ chat[1].lastMessage?
                                ((CryptoJS.AES.decrypt(chat[1].lastMessage?.text , key)).toString(CryptoJS.enc.Utf8))
                                :""
                        }</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats