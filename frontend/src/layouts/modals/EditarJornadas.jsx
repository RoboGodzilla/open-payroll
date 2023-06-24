/* eslint-disable react/prop-types */
import { Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { getJornadaById, getJornadas } from "../../api/jornadas/jornadas";

const EditarJornadas = ({
  modalEditar,
  abrirModalEditar,
  upJornada,
  JornadaSeleccionada,
}) => {
  const [form, setForm] = useState(JornadaSeleccionada.row);
  const [value] = React.useState(form.fecha);
  const [valueFeriado, setValueFeriado] = React.useState(form.feriado);
  const [valueSeptimo, setValueSeptimo] = React.useState(form.septimo_dia);
  const [valueVacaciones, setValueVacaciones] = React.useState(form.vacaciones);
  const [valueAusencia, setValueAusencia] = React.useState(form.ausencia);
  const [errorHoras, setErrorHoras] = useState(false);
  const [errorHorasDisponibles, setErrorHorasDisponibles] = useState(false);
  const [horasDisponibles, setHorasDisponibles] = useState(null);
  const [data, setData] = useState(null);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

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
  const getIdEmpleado = async (id) => {
    const a = await getJornadaById(id);
    setForm({ ...form, empleado: a.data.empleado });
  };
  function takeYear(theDate) {
    var x = theDate.getYear();
    var y = x % 100;
    y += y < 38 ? 2000 : 1900;
    return y;
  }
  const getWeek = (date) => {
    var today = new Date(date);
    var Year = takeYear(today);
    var Month = today.getMonth();
    var Day = today.getDate();
    var now = Date.UTC(Year, Month, Day + 1, 0, 0, 0);
    var Firstday = new Date();
    Firstday.setYear(Year);
    Firstday.setMonth(0);
    Firstday.setDate(1);
    var then = Date.UTC(Year, 0, 1, 0, 0, 0);
    var Compensation = Firstday.getDay();
    if (Compensation > 3) Compensation -= 4;
    else Compensation += 3;
    var NumberOfWeek = Math.round(((now - then) / 86400000 + Compensation) / 7);
    return NumberOfWeek;
  };
  const verifyHorasExtras = async () => {
    let contador = 0;
    let validation = false;
    const a = await getJornadas();
    const b = a.data;
    const jornadasTrabajador = [];
    b.map((el) => {
      if (el.empleado === form.empleado) jornadasTrabajador.push(el);
    });
    jornadasTrabajador.map((el) => {
      if (getWeek(el.fecha) === getWeek(form.fecha))
        contador = contador + Number(el.horas_extra);
    });
    if (contador < 9) {
      const cantidad = 9 - contador;
      setHorasDisponibles(cantidad);
      setData(true);
      validation = true;
    } else {
      validation = false;
    }
    return validation;
  };
  const handleUpdate = () => {
    if (form.horas_extra >= 0 && form.horas_extra <= 3) {
      setErrorHoras(false);
      if (verifyHorasExtras() && horasDisponibles >= form.horas_extra) {
        setErrorHorasDisponibles(false);
        if (form.multa >= 0) {
          abrirModalEditar();
          upJornada(form);
          Swal.fire({
            icon: "success",
            title: "Jornada Actualizada Exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        setErrorHorasDisponibles(true);
      }
    } else {
      setErrorHoras(true);
    }
  };

  useEffect(() => {
    getIdEmpleado(form.id);
  }, [data]);
  const BODY = (
    <div className={darkMode ? "modal dark" : "modal ligth"}>
      <MDTypography variant="h3">
        Editando Jornada de {form.nombre}
      </MDTypography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled
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
      {errorHoras && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>
            Las horas deben ser positivas y el Artículo 58. Solo permite 3 hrs
            por día
          </p>
        </MDTypography>
      )}
      {errorHorasDisponibles && (
        <MDTypography variant="h6">
          <p style={{ color: "#ff4040" }}>
            El Artículo 58. Solo permite 9 hrs a la semana,{" "}
            {horasDisponibles
              ? `el trabajador solo tiene ${horasDisponibles} hrs extras disponibles`
              : "el trabajador ya no dispone de horas extras disponibles"}
          </p>
        </MDTypography>
      )}
      <div className="btns">
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => handleUpdate()}
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
  return <Modal open={modalEditar}>{BODY}</Modal>;
};

export default EditarJornadas;
