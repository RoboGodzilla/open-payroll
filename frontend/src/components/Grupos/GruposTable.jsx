/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  AppBar,
  Box,
  Chip,
  Container,
  Dialog,
  IconButton,
  Slide,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

import { forwardRef, useEffect, useState } from "react";
import { useMaterialUIController } from "../../context";
import { getGrupos } from "../../api/grupos/grupos";
import GruposActions from "./GruposActions";
import { Close } from "@mui/icons-material";
import MDTypography from "../MDTypography";
import EditarGrupo from "../../layouts/modals/EditarGrupo";

function CreateDataElement(id, nombre, descripcion, is_active) {
  return {
    id,
    nombre,
    descripcion,
    is_active,
  };
}

export default function GruposTable({ cambios, setCambios }) {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [controller] = useMaterialUIController();
  const [ver, setVer] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const { darkMode } = controller;

  const ligth = createTheme({
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

  const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });
  const columns = [
    { field: "nombre", headerName: "Nombres", width: 300 },
    { field: "descripcion", headerName: "Descripción", width: 600 },
    {
      field: "is_active",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => {
        const valor = params.row.is_active;
        return (
          <>
            {valor ? (
              <Chip
                label={"Activo"}
                color="primary"
                className="chipActive"
                sx={{ width: 90 }}
              />
            ) : (
              <Chip label="Inactivo" color="error" sx={{ width: 90 }} />
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
      renderCell: (params) => (
        <GruposActions
          {...{ params }}
          setCambios={setCambios}
          cambios={cambios}
          setVer={setVer}
          ver={ver}
          setGrupoSeleccionado={setGrupoSeleccionado}
          modalEditar={modalEditar}
          setModalEditar={setModalEditar}
        />
      ),
    },
  ];
  const getData = async () => {
    setLoading(true);
    const filas = [];
    const datos = await getGrupos();
    if (datos.data.id != null) setData(true);
    {
      datos.data.map((content) => {
        // datos.map((content) => {
        filas.push(
          CreateDataElement(
            content.id,
            content.nombre,
            content.descripcion,
            content.is_active,
            content.empleados
          )
        );
      });
    }
    setRows(filas);
    setLoading(false);
  };

  useEffect(() => {
    // setLoading(true);
    getData();
  }, [data, cambios]);

  return (
    <Box sx={{ height: "65vh", width: "100%" }}>
      <br />
      <ThemeProvider theme={darkMode ? dark : ligth}>
        <DataGrid
          pagination
          pageSize={10}
          density="compact"
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          loading={loading}
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
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        />
      </ThemeProvider>
      {ver && (
        <Dialog
          // fullScreen
          open={ver}
          onClose={() => setVer(false)}
          TransitionComponent={Transition}
          // maxWidth="md"
          fullWidth
        >
          <AppBar
            position="relative"
            sx={{
              backgroundColor: darkMode ? "#1a2035" : "#f0f2f566",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Toolbar>
              <Typography variant="h4" component="h3">
                Grupo Seleccionado: {grupoSeleccionado.nombre}
                <IconButton onClick={() => setVer(false)}>
                  <Close color={darkMode ? "white" : "black"} />
                </IconButton>
              </Typography>
            </Toolbar>
          </AppBar>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              backgroundColor: darkMode ? "#1f283e" : "#f0f2f566",
            }}
          >
            <MDTypography display="block">
              Descripción: {grupoSeleccionado.descripcion}
            </MDTypography>
            <MDTypography>
              Miembros:{" "}
              {grupoSeleccionado.nombresPorId.map((el, i) => (
                <li key={i}>{el.nombre + " " + el.apellido}</li>
              ))}
            </MDTypography>
            <MDTypography>
              Estado: {grupoSeleccionado.is_active ? "Activo" : "Inactivo"}
            </MDTypography>
          </Container>
        </Dialog>
      )}
      {modalEditar && grupoSeleccionado && (
        <EditarGrupo
          modalEditar={modalEditar}
          setModalEditar={setModalEditar}
          grupoSeleccionado={grupoSeleccionado}
          setData={setData}
          data={data}
        />
      )}
    </Box>
  );
}
