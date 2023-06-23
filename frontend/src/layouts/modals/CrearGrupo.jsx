/* eslint-disable react/prop-types */
import "../../assets/styles/modal.css";
import Swal from "sweetalert2";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import { useMaterialUIController } from "../../context";
import {
  Autocomplete,
  Checkbox,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getTrabajadores } from "../../api/trabajadores/trabajadores";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const initalValues = {
  nombre: "",
  descripcion: "",
  is_active: false,
  empleados: [],
};

const CrearGrupo = ({ modalCrearGrupo, abrirModalCrearGrupo, createGrupo }) => {
  const [form, setForm] = useState(initalValues);
  const [trabajadores, setTrabajadores] = useState([]);
  const [active, setActive] = useState(false);
  const [campos, setCampos] = useState(false);
  const [errorEmpleados, setErrorEmpleados] = useState(false);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const getData = async () => {
    const datos = await getTrabajadores();
    setTrabajadores(datos.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(() => ({
      ...form,
      [name]: value,
    }));
  };

  const onSelectTag = (value) => {
    const arr = [];
    value.map((el) => arr.push(el.id));
    setForm({
      ...form,
      empleados: arr,
    });
  };

  const handleChangeActive = () => {
    setActive(!active);
    setForm(() => ({
      ...form,
      is_active: !active,
    }));
  };

  const handleSaveGrupo = async () => {
    if (form.nombre != "" && form.descripcion != "") {
      setCampos(false);
      if (form.empleados.length >= 2) {
        setErrorEmpleados(false);
        abrirModalCrearGrupo();
        await createGrupo(form);
        Swal.fire({
          icon: "success",
          title: "Grupo Creado Exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setErrorEmpleados(true);
      }
    } else {
      setCampos(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const BODY = (
    <div className={darkMode ? "modal dark" : "modal ligth"}>
      <MDTypography variant="h3">Crear Nuevo Grupo</MDTypography>

      <TextField
        type="textarea"
        className="textInput"
        name="nombre"
        label="Nombre"
        onChange={handleChange}
      />
      <TextField
        className="textInput"
        name="descripcion"
        label="Descripción"
        onChange={handleChange}
      />
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={trabajadores}
        disableCloseOnSelect
        onChange={(e, value) => onSelectTag(value)}
        getOptionLabel={(option) => option.nombre + " " + option.apellido}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.nombre + " " + option.apellido}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Trabajadores" />}
        style={{ maxHeight: "80vh" }}
      />

      <div className="active">
        <MDTypography variant="h6">Activo</MDTypography>

        <Switch checked={active} onChange={() => handleChangeActive()} />
      </div>
      {campos && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>Debe llemar todos los campos</p>
        </MDTypography>
      )}
      {errorEmpleados && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>
            Debe seleccionar al menos 2 trabajadores
          </p>
        </MDTypography>
      )}
      <div className="btns">
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => handleSaveGrupo()}
        >
          Crear
        </MDButton>
        <MDButton
          color="primary"
          variant="gradient"
          onClick={() => {
            Swal.fire({
              icon: "error",
              title: "Cancelado",
              showConfirmButton: false,
              timer: 1500,
            });
            abrirModalCrearGrupo();
          }}
        >
          Cancelar
        </MDButton>
      </div>
    </div>
  );

  return <Modal open={modalCrearGrupo}>{BODY}</Modal>;
};

export default CrearGrupo;
