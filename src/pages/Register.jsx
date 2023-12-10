import React, { useState } from "react";
import add from "../img/a4.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;    
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        const estado = "Disponible";

        //const auth = getAuth();
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            //const storage = getStorage();
            const storageRef = ref(storage, displayName);

            /*const uploadTask = await uploadBytesResumable(storageRef, file);

            uploadTask.on(
            (error) => {
                setErr(true);
            },*/
            await uploadBytesResumable(storageRef, file).then(() => {
                //getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "users", res.user.uid),{
                        uid: res.user.uid,
                        displayName,
                        email,
                        estado,
                        photoURL : downloadURL
                    });

                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");

                });
            }
            );
        }catch(err){
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Se miembro del Castillo</span>
                <span className="title">Unirme al Castillo</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre de Usuario"/>
                    <input type="email" placeholder="Correo Electronico"/>
                    <input type="password" placeholder="Contraseña"/>
                    <input style={{display: "none"}} type="file" id="File"/>
                    <label htmlFor="File">  
                        <img src={add} alt="" />
                        <span>Ingresa una Foto para tu Perfil</span>
                    </label>
                    <button>Registrarme a Boomtower</button>
                    {err && <span>Houston, tenemos un problema</span>}
                </form>
                <p>Ya estas Registrado? <Link to="/login">Ingresa al Castillo</Link></p>
            </div>
        </div>
    )
}

export default Register