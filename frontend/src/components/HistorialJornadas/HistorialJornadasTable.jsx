import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import EditarJornadas from "../../layouts/modals/EditarJornadas";
import { getJornadas, updateJornada } from "../../api/jornadas/jornadas";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "../../context";
import JornadaPorFecha from "./JornadaPorFecha";

import HistorialAction from "./HistorialAction";
import { getTrabajadores } from "../../api/trabajadores/trabajadores";

function CreateDataElement(id, fecha, cantidad) {
  return {
    id,
    fecha,
    cantidad,
  };
}

const HistorialJornadasTable = () => {
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

  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 500,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidad",
      headerName: "Cantidad de Trabajadores que realizaron la jornada",
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
        <HistorialAction
          {...{ params }}
          setJornadaSeleccionada={setJornadaSeleccionada}
          setVerJornada={setVerJornada}
          verJornada={verJornada}
        />
      ),
    },
  ];
  function contadorElemento(matrizValores, busqueda) {
    let unaLinea = matrizValores.flat();
    return unaLinea.filter((elemento) => elemento === busqueda).length;
  }

  const getData = async () => {
    const fechas = [];
    setLoading(true);
    const filas = [];
    let datos = null;
    let prueba = [];
    let cantidadTrabajadores = 0;
    const response = await getTrabajadores();
    const trabajadores = response.data;
    trabajadores.map(() => {
      cantidadTrabajadores++;
    });
    try {
      datos = await getJornadas();
    } catch (error) {
      console.log(error);
    } finally {
      if (datos.data.id !== null) setData(true);
      datos.data.map((content) => {
        if (!fechas.find((el) => el === content.fecha)) {
          fechas.push(content.fecha);
        }
        prueba.push(content.fecha);
      });
      const elemenstos = [];
      fechas.map((el) => {
        elemenstos.push({
          fecha: el,
          completados: contadorElemento(prueba, el),
        });
      });

      elemenstos.map((el, i) => {
        filas.push(
          CreateDataElement(
            i,
            el.fecha,
            el.completados + "/" + cantidadTrabajadores
          )
        );
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
          <JornadaPorFecha FechaFiltro={JornadaSeleccionada} />
        </div>
      )}
    </Box>
  );
};

export default HistorialJornadasTable;
