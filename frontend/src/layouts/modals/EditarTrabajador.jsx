/* eslint-disable react/prop-types */
import { Modal, TextField } from "@mui/material";
import { useState } from "react";
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

const EditarTrabajador = ({
  modalEditar,
  abrirModalEditar,
  upTrabajador,
  trabajadorSeleccionado,
}) => {
  const [form, setForm] = useState(trabajadorSeleccionado.row);
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(form.fecha_contratacion);
  const [valueRG, setValueRG] = useState(form.is_active);
  const [campos, setCampos] = useState(false);
  const [length, setLength] = useState(false);
  const [salario, setSalario] = useState(false);
  const [errorVacaciones, setErrorVacaciones] = useState(false);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

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

  const handleUpdate = () => {
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
            abrirModalEditar();
            upTrabajador(form);
            Swal.fire({
              icon: "success",
              title: "Trabajador Actualizado Exitosamente",
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

  const BODY = (
    <div className={darkMode ? "modal dark" : "modal ligth"}>
      <MDTypography variant="h3">Editando Trabajador</MDTypography>
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

export default EditarTrabajador;
