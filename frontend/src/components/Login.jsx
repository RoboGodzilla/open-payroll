import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Register.css";
import { useEffect, useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../api/firebase";
import Loader from "../components/Loader";
import { logUser } from "../api/auth/Log";
const initialData = {
  username: "",
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialData);
  const [campos, setCampos] = useState(true);
  const [visible, setVisible] = useState(false);
  const [longitud, setLongitud] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    if (!form.email.trim() && !form.password.trim()) {
      setCampos(false);
    } else {
      setCampos(true);
    }
    form.password.length >= 8 ? setLongitud(true) : setLongitud(false);
  }, [[form]]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logUser(form);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper login">
        <span className="logo">OenPayROll</span>
        <span className="tittle">Inicio de Sesión</span>
        <form className="formInputs" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              id="username"
              name="username"
              onChange={handleChange}
              style={{
                borderColor:
                  visible === false
                    ? "#9e9e9e"
                    : campos === true && visible === true
                    ? "#9e9e9e"
                    : "#ff4040",
              }}
            />
            <label htmlFor="usrname">Nombre de Usuario</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder=" "
              id="correo"
              name="email"
              onChange={handleChange}
              style={{
                borderColor:
                  visible === false
                    ? "#9e9e9e"
                    : campos === true && visible === true
                    ? "#9e9e9e"
                    : "#ff4040",
              }}
            />
            <label htmlFor="correo">Correo electrónico</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder=" "
              id="contra"
              name="password"
              onChange={handleChange}
              style={{
                borderColor:
                  visible === false
                    ? "#9e9e9e"
                    : campos === true && visible === true
                    ? "#9e9e9e"
                    : "#ff4040",
              }}
            />
            <label htmlFor="contra">Contraseña</label>
          </div>
          <button className="btn">Iniciar Sesión</button>
        </form>
        {/* {error ? <MessageError message={"Algo salió mal"} /> : null}
        {campos === false && visible === true ? (
          <MessageError message={"Debe llenar todos los campos"} />
        ) : (
          true
        )}
        {longitud === false && campos === true ? (
          <MessageError
            message={"La contraseña debe tener un minimo de 8 caracteres"}
          />
        ) : (
          false
        )} */}
        <p style={{ fontSize: "1rem" }}>
          ¿Aún no tienes una cuenta? <Link to="/register">Registrate aquí</Link>
        </p>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Login;
