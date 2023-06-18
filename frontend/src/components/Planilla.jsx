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
import DeleteIcon from "@mui/icons-material/Delete";

import DashboardLayout from "./LayoutContainers/DashboardLayout";
import DashboardNavbar from "./Navbars/DashboardNavbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function CreateDataElement(
  id,
  vacaciones,
  aguinaldo,
  viatico,
  fecha_inicial,
  fecha_final,
  t_s_bruto,
  t_s_prestacion,
  t_s_deduccion,
  t_s_viatico,
  t_s_neto
) {
  return {
    id,
    vacaciones,
    aguinaldo,
    viatico,
    fecha_inicial,
    fecha_final,
    t_s_bruto,
    t_s_prestacion,
    t_s_deduccion,
    t_s_viatico,
    t_s_neto,
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
    Vacaciones: false,
    Aguinaldo: false,
    Viatico: false,
    Fecha_inicial: "11-01-2022",
    Fecha_final: "11-15-2022",
    T_s_bruto: 20000,
    T_s_prestacion: 0,
    T_s_deduccion: 1000,
    T_s_viatico: 0,
    T_s_neto: 19000,
  },
  {
    id: 212312412,
    Vacaciones: true,
    Aguinaldo: false,
    Viatico: true,
    Fecha_inicial: "11-01-2022",
    Fecha_final: "11-15-2022",
    T_s_bruto: 20000,
    T_s_prestacion: 0,
    T_s_deduccion: 1000,
    T_s_viatico: 2000,
    T_s_neto: 21000,
  },
  {
    id: 34213124142,
    Vacaciones: true,
    Aguinaldo: true,
    Viatico: true,
    Fecha_inicial: "11-01-2022",
    Fecha_final: "11-15-2022",
    T_s_bruto: 20000,
    T_s_prestacion: 0,
    T_s_deduccion: 0,
    T_s_viatico: 0,
    T_s_neto: 20000,
  },
];

const Planilla = () => {
  const [rows, setRows] = useState([]);
  const [JornadaSeleccionada, setJornadaSeleccionada] = useState({});
  const eliminar = () => {
    // console.log("eliminado", JornadaSeleccionada.row.id);
  };

  const columns = [
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
      field: "aguinaldo",
      headerName: "Aguinaldo",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.aguinaldo;
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
      field: "viatico",
      headerName: "Viático",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.viatico;
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
      field: "fecha_inicial",
      headerName: "Fecha Inicial",
      width: 120,
    },
    {
      field: "fecha_final",
      headerName: "Fecha Final",
      width: 120,
    },
    {
      field: "t_s_bruto",
      headerName: "T. S. Bruto",
      width: 120,
    },
    {
      field: "t_prestacion",
      headerName: "T. Prestación",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.t_s_prestacion;
        return <>{valor === 0 ? 0 : valor}</>;
      },
    },
    {
      field: "t_s_deduccion",
      headerName: "T. Deducción",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.t_s_deduccion;
        return <>{valor === 0 ? 0 : valor}</>;
      },
    },
    {
      field: "t_s_viatico",
      headerName: "T. Viático",
      width: 120,
      renderCell: (params) => {
        const valor = params.row.t_s_viatico;
        return <>{valor === 0 ? 0 : valor}</>;
      },
    },
    { field: "t_s_neto", headerName: "T. Sal. Neto", width: 120 },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 120,
      renderCell: (params) => {
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
            <Tooltip title="Elimiar" arrow>
              <IconButton
                aria-label="delete"
                onClick={() => onClickDelete()}
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
  //   async
  useEffect(() => {
    const filas = [];
    const datos = DATA; //await getUsers();
    {
      datos.map((content) => {
        filas.push(
          CreateDataElement(
            content.id,
            content.Vacaciones,
            content.Aguinaldo,
            content.Viatico,
            content.Fecha_inicial,
            content.Fecha_final,
            content.T_s_bruto,
            content.T_s_prestacion,
            content.T_s_deduccion,
            content.T_s_viatico,
            content.T_s_neto
          )
        );
      });
    }
    setRows(filas);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box sx={{ height: "60vh", width: "100%" }}>
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
      <br />
      <br />
      <br />
      <Footer />
    </DashboardLayout>
  );
};

export default Planilla;
