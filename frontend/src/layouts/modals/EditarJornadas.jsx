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

const EditarJornadas = ({
  modalEditar,
  abrirModalEditar,
  upJornada,
  JornadaSeleccionada,
}) => {
  const [form, setForm] = useState(JornadaSeleccionada.row);
  const [value, setValue] = React.useState(form.fecha);
  const [valueFeriado, setValueFeriado] = React.useState(form.feriado);
  const [valueSeptimo, setValueSeptimo] = React.useState(form.septimo_dia);
  const [valueVacaciones, setValueVacaciones] = React.useState(form.vacaciones);
  const [valueAusencia, setValueAusencia] = React.useState(form.ausencia);

  const handleChangeFeriado = () => {
    setValueFeriado(!valueFeriado);
    setForm(() => ({
      ...form,
      feriado: !valueFeriado,
    }));
  };
  const handleChangeSeptimo = () => {
    setValueSeptimo(!valueSeptimo);
    setForm(() => ({
      ...form,
      septimo_dia: !valueSeptimo,
    }));
  };
  const handleChangeVacaciones = () => {
    setValueVacaciones(!valueVacaciones);
    setForm(() => ({
      ...form,
      vacaciones: !valueVacaciones,
    }));
  };
  const handleChangeAusencia = () => {
    setValueAusencia(!valueAusencia);
    setForm(() => ({
      ...form,
      ausencia: !valueAusencia,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(() => ({
      ...form,
      [name]: value,
    }));
  };

  // const handleClick = () => {
  //   updateData(form);
  // };

  const BODY = (
    <div className="modal">
      <MDTypography variant="h3">
        Editando Jornada de {form.nombre}
      </MDTypography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="textInput"
          defaultValue={dayjs(value)}
          maxDate={dayjs(Date.now())}
          format="YYYY-MM-DD"
          label="Fecha de Jornada"
          onChange={(newValue) => {
            form.fecha = dayjs(newValue).format("YYYY-MM-DD");
          }}
        />
      </LocalizationProvider>
      <div className="active">
        <MDTypography variant="h6">
          Feriado<span style={{ color: "transparent" }}>ppp</span>
        </MDTypography>
        <Switch checked={valueFeriado} onChange={() => handleChangeFeriado()} />
        <MDTypography variant="h6">
          Séptimo<span style={{ color: "transparent" }}>pp`</span>
        </MDTypography>

        <Switch checked={valueSeptimo} onChange={() => handleChangeSeptimo()} />
      </div>
      <div className="active">
        <MDTypography variant="h6">Vacaciones</MDTypography>

        <Switch
          checked={valueVacaciones}
          onChange={() => handleChangeVacaciones()}
        />
        <MDTypography variant="h6">
          Ausencia<span style={{ color: "transparent" }}>p1</span>
        </MDTypography>

        <Switch
          checked={valueAusencia}
          onChange={() => handleChangeAusencia()}
        />
      </div>
      <TextField
        type="number"
        name="horas_extra"
        label="Horas Extras"
        onChange={handleChange}
        value={form && form.horas_extra}
      />
      <TextField
        type="number"
        name="multa"
        label="Multa"
        onChange={handleChange}
        value={form && form.multa}
      />
      <div className="btns">
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => {
            abrirModalEditar();
            upJornada(form);
            Swal.fire({
              icon: "success",
              title: "Jornada Actualizada Exitosamente",
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

export default EditarJornadas;
