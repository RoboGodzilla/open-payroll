/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../assets/styles/modal.css";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import MDTypography from "../../components/MDTypography";
import Switch from "@mui/material/Switch";
import MDButton from "../../components/MDButton";

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
  const [error, setError] = useState(false);
  form.fecha_contratacion = valueD;
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
      form.salario != 0 &&
      form.cont_vacaciones != 0
    ) {
      setError(false);
      abrirModalAgregar();
      createTrabajador(form);

      Swal.fire({
        icon: "success",
        title: "Trabajador Agreado Exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setError(true);
      // Swal.fire("Cancelado", "Debe llenar todos los campos", "error");
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
    <div className="modal">
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
          defaultValue={dayjs(Date.now())}
          maxDate={dayjs(Date.now())}
          format="YYYY-MM-DD"
          label="Fecha Contrato"
          onChange={(newValue) => {
            form.fecha_contratacion = dayjs(newValue).format("YYYY-MM-DD");
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
      {error && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>Debe llenar todos los campos</p>
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

  return (
    <Modal open={modalAgregar} onClose={abrirModalAgregar}>
      {BODY}
    </Modal>
  );
};

export default AgregarTrabajador;
