/* eslint-disable react/prop-types */
import { useState } from "react";
import { Backdrop, Modal, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../assets/styles/modal.css";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import MDTypography from "../../components/MDTypography";
import Switch from "@mui/material/Switch";
import MDButton from "../../components/MDButton";
import { useMaterialUIController } from "../../context";

const initalValues = {
  nombre: "",
  apellido: "",
  fecha_contratacion: "",
  numero_seguro_social: 0,
  salario: 0,
  cont_vacaciones: 0,
  is_active: true,
};

const AgregarTrabajador = ({
  modalAgregar,
  abrirModalAgregar,
  createTrabajador,
}) => {
  const [form, setForm] = useState(initalValues);
  // eslint-disable-next-line no-unused-vars
  const [valueD, setValueD] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
  const [active, setActive] = useState(true);
  const [campos, setCampos] = useState(false);
  const [length, setLength] = useState(false);
  const [salario, setSalario] = useState(false);
  const [errorVacaciones, setErrorVacaciones] = useState(false);
  form.fecha_contratacion = valueD;

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(() => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSaveEmployee = () => {
    if (
      form.nombre != "" &&
      form.apellido != "" &&
      form.numero_seguro_social != 0 &&
      form.salario != 0
    ) {
      setCampos(false);
      if (form.numero_seguro_social.length !== 8) {
        setLength(true);
      } else {
        setLength(false);

        if (form.salario > 0) {
          setSalario(false);

          if (form.cont_vacaciones >= 0 && form.cont_vacaciones <= 30) {
            setErrorVacaciones(false);
            abrirModalAgregar();
            createTrabajador(form);

            Swal.fire({
              icon: "success",
              title: "Trabajador Agreado Exitosamente",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            setErrorVacaciones(true);
          }
        } else {
          setSalario(true);
        }
      }
    } else {
      setCampos(true);
    }
  };

  const handleChangeActive = () => {
    setActive(!active);
    setForm(() => ({
      ...form,
      is_active: !active,
    }));
  };

  const BODY = (
    <div className={darkMode ? "modal dark" : "modal ligth"}>
      <MDTypography variant="h3">Agregar Nuevo Trabajador</MDTypography>

      <TextField
        className="textInput"
        name="nombre"
        label="Nombres"
        onChange={handleChange}
      />
      <TextField
        className="textInput"
        name="apellido"
        label="Apellidos"
        onChange={handleChange}
      />
      <TextField
        className="textInput"
        type="number"
        name="numero_seguro_social"
        label="Numero INSS"
        onChange={handleChange}
      />
      <TextField
        className="textInput"
        type="number"
        name="salario"
        label="Salario Base"
        onChange={handleChange}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="textInput"
          // defaultValue={dayjs(Date.now())}
          maxDate={dayjs(Date.now())}
          format="YYYY-MM-DD"
          label="Fecha Contrato"
          value={dayjs(valueD)}
          onChange={(newValue) => {
            setValueD(dayjs(newValue).format("YYYY-MM-DD"));
            form.fecha_contratacion = valueD;
          }}
        />
      </LocalizationProvider>
      <TextField
        className="textInput"
        type="number"
        name="cont_vacaciones"
        label="Vacaciones disponibles"
        onChange={handleChange}
      />
      <div className="active">
        <MDTypography variant="h6">Activo</MDTypography>

        <Switch checked={active} onChange={() => handleChangeActive()} />
      </div>
      {campos && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>Debe llenar todos los campos</p>
        </MDTypography>
      )}
      {length && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>
            El número INSS debe contener 8 digitos
          </p>
        </MDTypography>
      )}
      {salario && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>El salario debe ser mayor a 0</p>
        </MDTypography>
      )}
      {errorVacaciones && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>
            Las vacaciones deben tener un valor positvo y su valor maximo es de
            30
          </p>
        </MDTypography>
      )}
      <div className="btns">
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => handleSaveEmployee()}
        >
          Guardar
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
            abrirModalAgregar();
          }}
        >
          Cancelar
        </MDButton>
      </div>
    </div>
  );

  // return <Modal open={modalAgregar}>{BODY}</Modal>;
  return (
    <Modal
      open={modalAgregar}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      {BODY}
    </Modal>
  );
};

export default AgregarTrabajador;
