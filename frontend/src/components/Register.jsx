import "../assets/styles/Register.css";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../api/auth/Log";
import MDTypography from "./MDTypography";

const initialData = {
  username: "",
  email: "",
  password1: "",
  password2: "",
};

const Register = () => {
  const [form, setForm] = useState(initialData);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState({
    state: false,
    username: "",
    password: "",
    email: "",
  });
  const [ccont, setCcont] = useState(true);
  const [loading, setLoading] = useState(false);
  const [campos, setCampos] = useState(true);
  const [longitud, setLongitud] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    setVisible(true);
    e.preventDefault();
    if (campos && ccont && longitud) {
      setLoading(true);
      try {
        await addUser(form);
        // console.log("sepudo");
      } catch (error) {
        setError({
          ...error,
          state: true,
          password: error.response.data?.password1[0],
          username: error.response.data?.username[0],
          email: error.response.data?.email,
        });
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      form.username === "" &&
      form.email === "" &&
      form.password1 === "" &&
      form.password2 === ""
    ) {
      setCampos(false);
    } else {
      setCampos(true);
    }
    if (
      form.password1.length >= 8 &&
      form.password2.length >= 8 &&
      campos === true
    ) {
      setLongitud(true);
    } else {
      setLongitud(false);
    }
    if (
      form.password1 === form.password2 &&
      longitud === true &&
      campos === true
    ) {
      setCcont(true);
    } else {
      setCcont(false);
    }
  });

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">OpenPayRoll</span>
        <span className="tittle">Registrarse</span>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="Username"
              placeholder=" "
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
            <label htmlFor="Username">Nombre de Usuario</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              id="correo"
              placeholder=" "
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
              id="contra"
              placeholder=" "
              name="password1"
              onChange={handleChange}
              style={{
                borderColor:
                  visible === false
                    ? "#9e9e9e"
                    : ccont === true && visible === true
                    ? "#9e9e9e"
                    : "#ff4040",
              }}
            />
            <label htmlFor="contra">Contraseña</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="ccontra"
              placeholder=" "
              name="password2"
              onChange={handleChange}
              style={{
                borderColor:
                  visible === false
                    ? "#9e9e9e"
                    : ccont === true && visible === true
                    ? "#9e9e9e"
                    : "#ff4040",
              }}
            />
            <label htmlFor="ccontra">Confirmar contraseña</label>
          </div>
          <button className="btn">Registrarse</button>
          {error.state && (
            <p style={{ color: "#ff4040", fontSize: "1rem" }}>
              {error.username
                ? error.username
                : error.password
                ? error.password
                : error.email && error.email}
            </p>
          )}
          {/* {ccont === false && longitud === true ? (
            <MessageError message={"Las contraseñas no coinciden"} />
          ) : (
            true
          )}
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
        </form>
        <p style={{ fontSize: "1rem" }}>
          ¿Ya tines una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Register;
