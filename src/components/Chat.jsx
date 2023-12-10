import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Mundo from "../img/mundo.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import {useState, useEffect} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Chat = () => {
    const [estado, setEstado] = useState([])
    const { data } = useContext(ChatContext);

    useEffect (() => {
        if(data.user.uid){
        
            const unSub = onSnapshot(doc(db, "users", data.user.uid), (doc)=>{
                doc.exists() && setEstado(doc.data().estado);
                setEstado(doc.data().estado?doc.data().estado:"No Info");
            })

            return () => {
                unSub()
            }
        }
    })

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <span>{estado}</span>
                
                <span>{}</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                    <img src={Mundo} alt="" />
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat