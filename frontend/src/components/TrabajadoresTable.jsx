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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditarTrabajador from "../layouts/modals/EditarTrabajador";
import AgregarTrabajador from "../layouts/modals/AgregarTrabajador";
import {
  getTrabajadores,
  addTrabajador,
  updateTrabajador,
  deleteTrabajador,
} from "../api/trabajadores/trabajadores";
import { useEffect, useState } from "react";
import MDButton from "./MDButton";
import Swal from "sweetalert2";

function CreateDataElement(
  id,
  nombre,
  apellido,
  numero_seguro_social,
  salario,
  fecha_contratacion,
  cont_vacaciones,
  is_active
) {
  return {
    id,
    nombre,
    apellido,
    numero_seguro_social,
    salario,
    fecha_contratacion,
    cont_vacaciones,
    is_active,
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
    nombre: "Jostin Joel",
    apellido: "Moreno Ulloa",
    numero_seguro_social: 43243432,
    salario: 25000,
    fecha_contratacion: "2023-05-15",
    cont_vacaciones: 30,
    is_active: true,
  },
  {
    id: 212312412,
    nombre: "Roberto Jesé",
    apellido: "Zepeda Calero",
    numero_seguro_social: 8979879,
    salario: 22000,
    fecha_contratacion: "2023-05-10",
    cont_vacaciones: 30,
    is_active: true,
  },
  {
    id: 34213124142,
    nombre: "Engel Antonio",
    apellido: "Largaespada Vargas",
    numero_seguro_social: 78667886,
    salario: 15000,
    fecha_contratacion: "2023-03-15",
    cont_vacaciones: 10,
    is_active: false,
  },
];

const TrabajadoresTable = () => {
  const [rows, setRows] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);

  const createTrabajador = async (data) => {
    await addTrabajador(data);
    window.location.replace("");
  };

  const upTrabajador = async (data) => {
    await updateTrabajador(data);
    // window.location.replace("");
  };

  const delTrabajador = async (id) => {
    await deleteTrabajador(id);
  };

  const editar = (params) => {
    setTrabajadorSeleccionado(params);
    abrirModalEditar();
  };

  const eliminar = () => {
    // delTrabajador(trabajadorSeleccionado.row.id);
    abrirModalEliminar();
  };

  const abrirModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  };

  const abrirModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const abrirModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const columns = [
    { field: "nombre", headerName: "Nombres", width: 150 },
    { field: "apellido", headerName: "Apellidos", width: 150 },
    { field: "numero_seguro_social", headerName: "Número INSS", width: 150 },
    { field: "salario", headerName: "Salario Base", width: 150 },
    { field: "fecha_contratacion", headerName: "Fecha Contrato", width: 150 },
    {
      field: "cont_vacaciones",
      headerName: "Vacaciones(días)",
      width: 150,
    },
    {
      field: "is_active",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => {
        const valor = params.row.is_active;
        return (
          <>
            {valor ? (
              <Chip label={"Activo"} color="primary" className="chipActive" />
            ) : (
              <Chip label="Inactivo" />
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 122,
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
              setTrabajadorSeleccionado(params);
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
    // const datos = await getTrabajadores();
    const datos = DATA;
    {
      // datos.data.map((content) => {
      datos.map((content) => {
        filas.push(
          CreateDataElement(
            content.id,
            content.nombre,
            content.apellido,
            content.numero_seguro_social,
            content.salario,
            content.fecha_contratacion,
            content.cont_vacaciones,
            content.is_active
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
      <div style={{ marginTop: "-1rem" }}>
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => abrirModalAgregar()}
        >
          <AddIcon fontSize="medium" /> Agregar
        </MDButton>
      </div>
      {modalAgregar && (
        <AgregarTrabajador
          modalAgregar={modalAgregar}
          abrirModalAgregar={abrirModalAgregar}
          createTrabajador={createTrabajador}
        />
      )}
      {modalEditar && (
        <EditarTrabajador
          abrirModalEditar={abrirModalEditar}
          modalEditar={modalEditar}
          trabajadorSeleccionado={trabajadorSeleccionado}
          upTrabajador={upTrabajador}
        />
      )}

      <br />
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

export default TrabajadoresTable;
