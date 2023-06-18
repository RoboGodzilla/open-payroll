import { Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../assets/styles/modal.css";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import MDTypography from "../../components/MDTypography";
import Switch from "@mui/material/Switch";
import MDButton from "../../components/MDButton";

const EditarTrabajador = ({
  modalEditar,
  abrirModalEditar,
  upTrabajador,
  trabajadorSeleccionado,
}) => {
  const [form, setForm] = useState(trabajadorSeleccionado.row);
  const [value, setValue] = React.useState(form.fecha_contratacion);
  const [valueRG, setValueRG] = React.useState(form.is_active);

  const handleChangeActive = () => {
    setValueRG(!valueRG);
    setForm(() => ({
      ...form,
      is_active: !valueRG,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(() => ({
      ...form,
      [name]: value,
    }));
  };

  const BODY = (
    <div className="modal">
      <h3>Editando Trabajador</h3>
      <TextField
        name="nombre"
        label="Nombres"
        onChange={handleChange}
        value={form && form.nombre}
      />
      <TextField
        name="apellido"
        label="Apellidos"
        onChange={handleChange}
        value={form && form.apellido}
      />
      <TextField
        type="number"
        name="numero_seguro_social"
        label="Numero INSS"
        onChange={handleChange}
        value={form && form.numero_seguro_social}
      />
      <TextField
        type="number"
        name="salario"
        label="Salario Base"
        onChange={handleChange}
        value={form && form.salario}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="textInput"
          defaultValue={dayjs(value)}
          maxDate={dayjs(Date.now())}
          format="YYYY-MM-DD"
          label="Fecha Contrato"
          onChange={(newValue) => {
            form.fecha_contratacion = dayjs(newValue).format("YYYY-MM-DD");
          }}
        />
      </LocalizationProvider>
      <TextField
        type="number"
        name="cont_vacaciones"
        label="Vacaciones disponibles"
        onChange={handleChange}
        value={form && form.cont_vacaciones}
      />
      <div className="active">
        <MDTypography variant="h6">Activo</MDTypography>

        <Switch checked={valueRG} onChange={() => handleChangeActive()} />
      </div>
      <br />
      <div className="btns">
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => {
            abrirModalEditar();
            upTrabajador(form);
            Swal.fire({
              icon: "success",
              title: "Trabajador Actualizado Exitosamente",
              showConfirmButton: false,
              timer: 1500,
            });
          }}
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
            abrirModalEditar();
          }}
        >
          Cancelar
        </MDButton>
      </div>
    </div>
  );
  return (
    <Modal open={modalEditar} onClose={abrirModalEditar}>
      {BODY}
    </Modal>
  );
};

export default EditarTrabajador;
