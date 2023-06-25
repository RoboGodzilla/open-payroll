/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Box, IconButton, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { deleteGrupo, getGrupoById, getGrupos } from "../../api/grupos/grupos";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getTrabajadorById } from "../../api/trabajadores/trabajadores";
import { Delete, Edit } from "@mui/icons-material";

const GruposActions = ({
  params,
  setCambios,
  cambios,
  setVer,
  setGrupoSeleccionado,
  modalEditar,
  setModalEditar,
}) => {
  const [grupo, setgrupo] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [data, setData] = useState(null);
  const eliminar = async (params) => {
    await deleteGrupo(params.row.id);

    setCambios(!cambios);
  };

  const nomPorId = (data) => {
    const a = [];
    data.map(async (el) => {
      const nombrePorId = await getTrabajadorById(el);
      a.push(nombrePorId.data.nombre + " " + nombrePorId.data.apellido);
    });
    setNombres(a);
  };
  const getMiembros = async () => {
    const data = await getGrupos(params);
    setgrupo(data.data);
    grupo.map((el) => {
      if (el.id === params.row.id) {
        nomPorId(el.empleados);
      }
    });
    grupo.map((el) => {
      if (el.id === params.row.id) {
        setGrupoSeleccionado({
          ...el,
          nombresPorId: nombres,
        });
      }
    });
    setData(true);
  };
  const onClickSee = async (e) => {
    await getMiembros();
    e.stopPropagation(); // don't select this row after clicking
    // setData(false);
    setVer(true);
  };
  const onClickEdit = async (e) => {
    e.stopPropagation(); // don't select this row after clicking
    const grupoCompleto = await getGrupoById(params.row.id);
    setGrupoSeleccionado(grupoCompleto.data);
    setModalEditar(!modalEditar);
  };

  const onClickDelete = () => {
    Swal.fire({
      title: "¿Está Seguro?",
      text: "¡No podrá revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Eliminado!", "", "success");
        // setTrabajadorSeleccionado(params);
        eliminar(params);
      }
    });
  };

  useEffect(() => {
    getMiembros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box>
      <Tooltip title="Ver Grupo" arrow>
        <IconButton aria-label="delete" onClick={onClickSee} size="small">
          <RemoveRedEyeIcon color="info" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar Grupo" arrow>
        <IconButton aria-label="delete" onClick={onClickEdit} size="small">
          <Edit color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Elimiar Grupo" arrow>
        <IconButton aria-label="delete" onClick={onClickDelete} size="small">
          <Delete color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default GruposActions;
