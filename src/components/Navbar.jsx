import React, { useContext, useEffect, useState } from "react";
//import add from "../img/a5.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    //console.log(currentUser);
    const [estado, setEstado] = useState("k")

    useEffect (() => {
        if(currentUser.uid){
        
            const unSub = onSnapshot(doc(db, "users", currentUser.uid), (doc)=>{
                doc.exists() && setEstado(doc.data().estado);
                setEstado(doc.data().estado?doc.data().estado:"No Info");
            })

            return () => {
                unSub()
            }
        }
    })

    const handleSend = async (event) => {
        const estado = event.target.value;
        await updateDoc(doc(db, "users", currentUser.uid), {
            estado
        }); 
    };

    return (
        <div className="navbar">
            <span className="logo">Boom - Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <select id="Estado" onChange={handleSend}>
                    <option value='Disponible' selected={estado === 'Disponible' ? true : false}>Disponible</option>
                    <option value='No Molestar' selected={estado === 'No Molestar' ? true : false}>No Molestar</option>
                    <option value='Ocupado' selected={estado === 'Ocupado' ? true : false}>Ocupado</option>
                    <option value='Desconectado' selected={estado === 'Desconectado' ? true : false}>Desconectado</option>
                </select>
                <button onClick={()=>signOut(auth)}>Cerrar</button>
            </div>
        </div>
    )
}

export default Navbar