import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Pagination, IconButton, Tooltip, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditarJornadas from "../layouts/modals/EditarJornadas";
import {
  getJornadas,
  updateJornada,
  deleteJornada,
} from "../api/jornadas/jornadas";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function CreateDataElement(
  id,
  nombre,
  fecha,
  feriado,
  septimo_dia,
  vacaciones,
  ausencia,
  horas_extra,
  multa
) {
  return {
    id,
    nombre,
    fecha,
    feriado,
    septimo_dia,
    vacaciones,
    ausencia,
    horas_extra,
    multa,
  };
}

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ display: "flex" }}>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const DATA = [
  {
    id: 1231231,
    nombre: "Jostin Joel Moreno Ulloa",
    fecha: "2023-06-04",
    feriado: true,
    septimo_dia: false,
    vacaciones: true,
    ausencia: false,
    horas_extra: 0,
    multa: 0,
  },
  {
    id: 212312412,
    nombre: "Roberto Jesé Zepeda Calero",
    fecha: "2023-06-04",
    feriado: false,
    septimo_dia: false,
    vacaciones: false,
    ausencia: false,
    horas_extra: 0,
    multa: 0,
  },
  {
    id: 34213124142,
    nombre: "Engel Antonio Largaespada Vargas",
    fecha: "2023-06-04",
    feriado: false,
    septimo_dia: false,
    vacaciones: false,
    ausencia: false,
    horas_extra: 0,
    multa: 0,
  },
];

const JornadasTable = () => {
  const [rows, setRows] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [JornadaSeleccionada, setJornadaSeleccionada] = useState(null);

  const upJornada = async (data) => {
    await updateJornada(data);
    // window.location.replace("");
  };

  const delJornada = async (id) => {
    await deleteJornada(id);
    window.location.replace("");
  };

  const editar = (params) => {
    setJornadaSeleccionada(params);
    abrirModalEditar();
  };

  const eliminar = () => {
    // console.log(JornadaSeleccionada.row.id);
    // delJornada(JornadaSeleccionada.row.id);
  };

  const abrirModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const columns = [
    { field: "nombre", headerName: "Trabajador", width: 300 },
    { field: "fecha", headerName: "Fecha", width: 120 },
    {
      field: "feriado",
      headerName: "Feriado",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.feriado;
        return (
          <>
            {valor ? (
              <Chip label={"Aplica"} color="primary" className="chipActive" />
            ) : (
              <Chip label="No Aplica" />
            )}
          </>
        );
      },
    },
    {
      field: "septimo_dia",
      headerName: "Séptimo",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.septimo_dia;
        return (
          <>
            {valor ? (
              <Chip label={"Aplica"} color="primary" className="chipActive" />
            ) : (
              <Chip label="No Aplica" />
            )}
          </>
        );
      },
    },
    {
      field: "vacaciones",
      headerName: "Vacaciones",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.vacaciones;
        return (
          <>
            {valor ? (
              <Chip label={"Aplica"} color="primary" className="chipActive" />
            ) : (
              <Chip label="No Aplica" />
            )}
          </>
        );
      },
    },
    {
      field: "ausencia",
      headerName: "Ausencia",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.ausencia;
        return (
          <>
            {valor ? (
              <Chip label={"Aplica"} color="primary" className="chipActive" />
            ) : (
              <Chip label="No Aplica" />
            )}
          </>
        );
      },
    },
    { field: "horas_extra", headerName: "Horas Extra", width: 100 },
    { field: "multa", headerName: "Multa", width: 80 },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 120,
      renderCell: (params) => {
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
              setJornadaSeleccionada(params);
              eliminar();
            }
          });
        };
        return (
          <>
            <Tooltip title="Editar" arrow>
              <IconButton
                aria-label="delete"
                onClick={onClickEdit}
                size="small"
              >
                <EditIcon color="info" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Elimiar" arrow>
              <IconButton
                aria-label="delete"
                onClick={onClickDelete}
                size="small"
              >
                <DeleteIcon color="primary" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const getData = async () => {
    const filas = [];
    // const datos = await getJornadas();
    const datos = DATA;
    {
      datos.map((content) => {
        filas.push(
          CreateDataElement(
            content.id,
            content.nombre,
            content.fecha,
            content.feriado,
            content.septimo_dia,
            content.vacaciones,
            content.ausencia,
            content.horas_extra,
            content.multa
          )
        );
      });
    }
    setRows(filas);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ height: "60vh", width: "100%" }}>
      {modalEditar && (
        <EditarJornadas
          abrirModalEditar={abrirModalEditar}
          modalEditar={modalEditar}
          JornadaSeleccionada={JornadaSeleccionada}
          upJornada={upJornada}
        />
      )}

      <DataGrid
        pagination
        pageSize={10}
        rowsPerPageOptions={[5]}
        density="compact"
        components={{
          Pagination: CustomPagination,
          Toolbar: CustomToolbar,
        }}
        rows={rows}
        columns={columns}
      />
    </Box>
  );
};

export default JornadasTable;
