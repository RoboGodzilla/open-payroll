/* eslint-disable react/prop-types */
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import { deleteTrabajador } from "../../api/trabajadores/trabajadores";

const TrabajadoresActions = ({
  // react/prop-types
  params,
  data,
  setData,
  abrirModalEditar,
  setTrabajadorSeleccionado,
}) => {
  const delTrabajador = async (id) => {
    await deleteTrabajador(id);
    setData(!data);
  };
  const eliminar = (params) => {
    delTrabajador(params.row.id);
    setData(!data);
  };
  const onClickEdit = (e) => {
    e.stopPropagation(); // don't select this row after clicking
    setTrabajadorSeleccionado(params);
    abrirModalEditar();
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
      <Tooltip title="Editar Trabajador" arrow>
        <IconButton aria-label="delete" onClick={onClickEdit} size="small">
          <Edit color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Elimiar Trabajador" arrow>
        <IconButton aria-label="delete" onClick={onClickDelete} size="small">
          <Delete color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TrabajadoresActions;
