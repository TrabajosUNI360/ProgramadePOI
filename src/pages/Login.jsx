import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import add from "../img/a4.png";

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        //const auth = getAuth();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }catch(err){
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Bienvenido a Boomtower</span>
                <span className="title">¡Inicia Sesion ahora mismo!</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Ingresa tu Correo Electronico"/>
                    <input type="password" placeholder="Ingresa tu Contraseña si"/>
                    <button>Entrar</button>
                    <button>Inicia Sesion desde Google</button>
                    {err && <span>Error al Ingresar, intentalo de nuevo</span>}
                </form>
                <p>No tienes Cuenta? <Link to="/register">Registrate</Link></p>
            </div>
        </div>
    );
};

export default Login;