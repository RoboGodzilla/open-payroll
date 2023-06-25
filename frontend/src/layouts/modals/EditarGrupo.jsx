/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Autocomplete, Checkbox, Modal, TextField } from "@mui/material";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "../../context";
import "../../assets/styles/modal.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { getTrabajadores } from "../../api/trabajadores/trabajadores";
import { getGrupoById, updateGrupo } from "../../api/grupos/grupos";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const EditarGrupo = ({
  modalEditar,
  setModalEditar,
  grupoSeleccionado,
  data,
  setData,
}) => {
  const [form, setForm] = useState(grupoSeleccionado);
  const [trabajadores, setTrabajadores] = useState([]);
  const [trabajadoresId, setTrabajadoresId] = useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [selecciones, setSelecciones] = useState([]);
  const [cambios, setCambios] = useState(false);
  const [errorCampos, setErrorCampos] = useState(false);
  const [errorEmpleados, setErrorEmpleados] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleUpdate = async () => {
    if (form.nombre != "" && form.descripcion != "") {
      setErrorCampos(false);
      if (form.empleados.length >= 2) {
        setErrorEmpleados(false);
        await updateGrupo(form);
        setModalEditar(!modalEditar);
        Swal.fire({
          icon: "success",
          title: "Grupo Actualizado Exitosamente",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setData(!data);
          window.location.reload();
        });
      } else {
        setErrorEmpleados(true);
      }
    } else {
      setErrorCampos(true);
    }
  };
  const getData = async () => {
    const datos = await getTrabajadores();
    setTrabajadores(datos.data);
  };
  const onSelectTag = (value) => {
    const arr = [];

    value.map((el) => arr.push(el.id));
    setForm({
      ...form,
      empleados: arr,
    });

    setSelecciones(value);
  };

  const getNombres = async () => {
    const ids = await getGrupoById(grupoSeleccionado.id);

    setTrabajadoresId(ids.data.empleados);
    const arr = [];
    trabajadoresId.map((content) => {
      arr.push(trabajadores.find((el) => el.id === content));
    });
    setSelecciones(arr);
    setCambios(true);
  };
  const BODY = (
    <div className={darkMode ? "modal dark" : "modal ligth"}>
      <MDTypography variant="h3">Editando Grupo</MDTypography>

      <TextField
        type="text"
        name="nombre"
        label="Nombre"
        onChange={handleChange}
        value={form && form.nombre}
      />
      <TextField
        type="text"
        name="descripcion"
        label="Descripción"
        onChange={handleChange}
        value={form && form.descripcion}
      />
      <Autocomplete
        multiple
        options={trabajadores}
        value={selecciones}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        disableCloseOnSelect
        onChange={(e, value) => onSelectTag(value)}
        getOptionLabel={(option) => option?.nombre + " " + option?.apellido}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option?.nombre + " " + option?.apellido}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Trabajadores" />}
        style={{ maxHeight: "20h" }}
      />
      {errorCampos && (
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
            setModalEditar(!modalEditar);
          }}
        >
          Cancelar
        </MDButton>
      </div>
    </div>
  );

  useEffect(() => {
    getData();
    getNombres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cambios]);
  return <Modal open={modalEditar}>{BODY}</Modal>;
};

export default EditarGrupo;
