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
import {
  Box,
  Pagination,
  IconButton,
  Tooltip,
  Chip,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardLayout from "./LayoutContainers/DashboardLayout";
import DashboardNavbar from "./Navbars/DashboardNavbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MDTypography from "./MDTypography";
import { useMaterialUIController } from "../context";

function CreateDataElement(
  id,
  nombre,
  vacaciones,
  aguinaldo,
  fecha_inicial,
  fecha_final,
  salario_bruto,
  deducciones,
  prestaciones,
  viaticos,
  salario_neto
) {
  return {
    id,
    nombre,
    vacaciones,
    aguinaldo,
    fecha_inicial,
    fecha_final,
    salario_bruto,
    deducciones,
    prestaciones,
    viaticos,
    salario_neto,
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

const DATA = [
  {
    id: 13243443,
    Nombre: "Jostin Joel Moreno Ulloa",
    Vacaciones: false,
    Aguinaldo: false,
    Fecha_inicial: "11-01-2022",
    Fecha_final: "11-15-2022",
    Salario_bruto: 21000,
    Prestaciones: 0,
    Deducciones: 3166.67,
    Viaticos: 0,
    Salario_neto: 17833.33,
  },
  {
    id: 2432324,
    Nombre: "Roberto Jesé Zepeda Calero",
    Vacaciones: true,
    Aguinaldo: false,
    Fecha_inicial: "11-01-2022",
    Fecha_final: "11-15-2022",
    Salario_bruto: 21000,
    Prestaciones: 800,
    Deducciones: 3166.67,
    Viaticos: 400,
    Salario_neto: 19033.33,
  },
  {
    id: 3253235235,
    Nombre: "Engel Antonio Largaespada Vargas",
    Vacaciones: true,
    Aguinaldo: true,
    Fecha_inicial: "11-01-2022",
    Fecha_final: "11-15-2022",
    Salario_bruto: 15000,
    Prestaciones: 500,
    Deducciones: 1796.88,
    Viaticos: 200,
    Salario_neto: 13903.12,
  },
];

const Colilla = () => {
  const [rows, setRows] = useState(null);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const ligth = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: "#f5f5f5",
          },
          header: {
            backgroundColor: "#3f51b5",
            color: "#fff",
          },
          row: {
            "&:nth-of-type(odd)": {
              backgroundColor: "#fff",
            },
            "&:nth-of-type(even)": {
              backgroundColor: "#f5f5f5",
            },
          },
        },
      },
    },
  });
  const dark = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiDataGrid: {
        defaultProps: {
          localeText: {
            // Texto de localización personalizado en español
            // Aquí se pueden agregar más traducciones personalizadas según sea necesario
            columns: "Columnas",
            rowsPerPage: "Filas por página:",
            noResults: "No se encontraron resultados",

            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()} filas seleccionadas`
                : `${count.toLocaleString()} fila seleccionada`,
          },
        },
      },
    },
  });

  const eliminar = () => {
    // console.log(trabajadorSeleccionado.row.id);
  };
  const columns = [
    { field: "nombre", headerName: "Trabajador", width: 300 },
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
      field: "salario_bruto",
      headerName: "Salario bruto",
      width: 120,
    },
    { field: "prestaciones", headerName: "Prestaciones", width: 100 },
    { field: "deducciones", headerName: "Deduciones", width: 80 },
    { field: "viaticos", headerName: "Viáticos", width: 80 },
    { field: "salario_neto", headerName: "Salario neto", width: 120 },
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
              setTrabajadorSeleccionado(params);
              eliminar();
            }
          });
        };
        return (
          <>
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
  //   async
  useEffect(() => {
    const filas = [];
    const datos = DATA; //await getUsers();
    {
      datos.map((content) => {
        filas.push(
          CreateDataElement(
            content.id,
            content.Nombre,
            content.Vacaciones,
            content.Aguinaldo,
            content.Fecha_inicial,
            content.Fecha_final,
            content.Salario_bruto,
            content.Deducciones,
            content.Prestaciones,
            content.Viaticos,
            content.Salario_neto
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
        {rows ? (
          <ThemeProvider theme={darkMode ? dark : ligth}>
            <DataGrid
              pagination
              pageSize={10}
              density="compact"
              components={{
                Toolbar: CustomToolbar,
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              rows={rows}
              columns={columns}
              sx={{
                "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                  width: "0.4rem",
                  height: "0.4rem",
                },
                "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
                  background: "transparent",
                  borderRadius: "1rem",
                },
                "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "1rem",
                },
                "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover":
                  {
                    background: "#555",
                  },
              }}
            />
          </ThemeProvider>
        ) : (
          <div
            style={{
              display: "flex",
              height: "50vh",
              justifyContent: "center",
              alignItems: "cen",
            }}
          >
            <MDTypography variant="h2">Sin Datos</MDTypography>
          </div>
        )}
      </Box>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </DashboardLayout>
  );
};

export default Colilla;
