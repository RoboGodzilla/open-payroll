/* eslint-disable react/prop-types */
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import { deleteJornada } from "../../api/jornadas/jornadas";

const JornadasActions = ({
  params,
  setJornadaSeleccionada,
  abrirModalEditar,
  data,
  setData,
}) => {
  const delJornada = async (id) => {
    await deleteJornada(id);
    setData(!data);
  };

  const editar = (params) => {
    setJornadaSeleccionada(params);
    abrirModalEditar();
  };

  const eliminar = (params) => {
    delJornada(params.row.id);
  };
  const onClickEdit = (e) => {
    e.stopPropagation(); // don't select this row after clicking
    editar(params);
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
        eliminar(params);
      }
    });
  };

  return (
    <Box>
      <Tooltip title="Editar Jornada" arrow>
        <IconButton aria-label="delete" onClick={onClickEdit} size="small">
          <Edit color="info" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Elimiar Jornada" arrow>
        <IconButton aria-label="delete" onClick={onClickDelete} size="small">
          <Delete color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default JornadasActions;
