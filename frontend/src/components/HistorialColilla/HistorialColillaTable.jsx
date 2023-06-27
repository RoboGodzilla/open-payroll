import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import EditarJornadas from "../../layouts/modals/EditarJornadas";
import { updateJornada } from "../../api/jornadas/jornadas";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "../../context";

import { getNomina } from "../../api/nomina/nomina";

import HistorialColillaAction from "./HistorialColillaAction";
import ColillaPorFecha from "./ColillaPorFecha";

function CreateDataElement(id, fechai, fecha, cantidad) {
  return {
    id,
    fechai,
    fecha,
    cantidad,
  };
}

const HistorialColillaTable = () => {
  const [rows, setRows] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [JornadaSeleccionada, setJornadaSeleccionada] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verJornada, setVerJornada] = useState(false);

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
    {
      field: "fechai",
      headerName: "Fecha Inicio",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fecha",
      headerName: "Fecha Fin",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidad",
      headerName: "Cantidad a Pagar",
      width: 500,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      width: 120,
      renderCell: (params) => (
        <HistorialColillaAction
          {...{ params }}
          setJornadaSeleccionada={setJornadaSeleccionada}
          setVerJornada={setVerJornada}
          verJornada={verJornada}
        />
      ),
    },
  ];

  const getData = async () => {
    const fechas = [];
    setLoading(true);
    const filas = [];
    let datos = null;

    let cantidadPagar = 0;
    try {
      datos = await getNomina();
    } catch (error) {
      console.log(error);
    } finally {
      if (datos.data.id !== null) setData(true);
      datos.data.map((content) => {
        if (!fechas.find((el) => el === content.fecha_final)) {
          fechas.push(content.fecha_final);
        }
        if (content.fecha_final === "2023-06-30")
          cantidadPagar += Number(content.totales[1]);
      });
      fechas.map((el, i) => {
        filas.push(CreateDataElement(i, "2023-06-01", el, cantidadPagar));
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
      {verJornada && (
        <div style={{ marginTop: "1rem", height: "80vh" }}>
          {" "}
          <ColillaPorFecha FechaFiltro={JornadaSeleccionada} />
        </div>
      )}
    </Box>
  );
};

export default HistorialColillaTable;
