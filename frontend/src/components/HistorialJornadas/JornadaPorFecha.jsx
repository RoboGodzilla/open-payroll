import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Chip, createTheme, ThemeProvider } from "@mui/material";
import EditarJornadas from "../../layouts/modals/EditarJornadas";
import { getJornadas, updateJornada } from "../../api/jornadas/jornadas";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "../../context";
import JornadasActions from "../../components/Jornadas/JornadasActions";

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

const JornadaPorFecha = ({ FechaFiltro }) => {
  const [rows, setRows] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [JornadaSeleccionada, setJornadaSeleccionada] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const upJornada = async (DATA) => {
    await updateJornada(DATA);
    setData(!data);
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
      filterable: false,
      width: 110,
      renderCell: (params) => {
        const valor = params.row.feriado;
        return (
          <>
            {valor ? (
              <Chip
                label={"Aplica"}
                color="primary"
                className="chipActive"
                style={{ width: 90 }}
              />
            ) : (
              <Chip label="No Aplica" color="error" style={{ width: 90 }} />
            )}
          </>
        );
      },
    },
    {
      field: "septimo_dia",
      headerName: "Séptimo",
      filterable: false,
      width: 110,
      renderCell: (params) => {
        const valor = params.row.septimo_dia;
        return (
          <>
            {valor ? (
              <Chip
                label={"Aplica"}
                color="primary"
                className="chipActive"
                style={{ width: 90 }}
              />
            ) : (
              <Chip label="No Aplica" color="error" style={{ width: 90 }} />
            )}
          </>
        );
      },
    },
    {
      field: "vacaciones",
      headerName: "Vacaciones",
      filterable: false,
      width: 110,
      renderCell: (params) => {
        const valor = params.row.vacaciones;
        return (
          <>
            {valor ? (
              <Chip
                label={"Aplica"}
                color="primary"
                className="chipActive"
                style={{ width: 90 }}
              />
            ) : (
              <Chip label="No Aplica" color="error" style={{ width: 90 }} />
            )}
          </>
        );
      },
    },
    {
      field: "ausencia",
      headerName: "Ausencia",
      filterable: false,
      width: 110,
      renderCell: (params) => {
        const valor = params.row.ausencia;
        return (
          <>
            {valor ? (
              <Chip
                label={"Aplica"}
                color="primary"
                className="chipActive"
                style={{ width: 90 }}
              />
            ) : (
              <Chip label="No Aplica" color="error" style={{ width: 90 }} />
            )}
          </>
        );
      },
    },
    { field: "horas_extra", headerName: "Horas Extra", width: 100 },
    { field: "multa", headerName: "Multa", width: 120 },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => (
        <JornadasActions
          {...{ params }}
          setJornadaSeleccionada={setJornadaSeleccionada}
          abrirModalEditar={abrirModalEditar}
          data={data}
          setData={setData}
        />
      ),
    },
  ];

  const getData = async () => {
    setLoading(true);
    const filas = [];
    let datos = null;
    try {
      datos = await getJornadas();
    } catch (error) {
      console.log(error);
    } finally {
      if (datos.data.id !== null) setData(true);
      datos.data.map((content) => {
        if (content.fecha === FechaFiltro.row.fecha) {
          filas.push(
            CreateDataElement(
              content.id,
              (content.nombre =
                content.empleadoinfo.nombre +
                " " +
                content.empleadoinfo.apellido),
              content.fecha,
              content.feriado,
              content.septimo_dia,
              content.vacaciones,
              content.ausencia,
              content.horas_extra,
              content.multa
            )
          );
        }
      });
    }
    setRows(filas);
    setLoading(false);
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box sx={{ height: "65vh", width: "100%" }}>
      {modalEditar && (
        <EditarJornadas
          abrirModalEditar={abrirModalEditar}
          modalEditar={modalEditar}
          JornadaSeleccionada={JornadaSeleccionada}
          upJornada={upJornada}
        />
      )}

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
          pageSizeOptions={[10, 25, 50]}
          rows={rows}
          columns={columns}
          loading={loading}
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
    </Box>
  );
};

export default JornadaPorFecha;
