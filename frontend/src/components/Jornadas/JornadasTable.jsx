import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Chip, createTheme, ThemeProvider } from "@mui/material";
import EditarJornadas from "../../layouts/modals/EditarJornadas";
import {
  addJornada,
  deleteJornada,
  getJornadas,
  updateJornada,
} from "../../api/jornadas/jornadas";
import { getTrabajadores } from "../../api/trabajadores/trabajadores";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "../../context";
import JornadasActions from "./JornadasActions";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";
import MDButton from "../MDButton";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import axios from "axios";
import MDTypography from "../MDTypography";
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
let FERIADOS = null;
const JornadasTable = () => {
  const [rows, setRows] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [JornadaSeleccionada, setJornadaSeleccionada] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(null);

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
      if (datos.data.id !== null) setData(true);
      datos.data.map((content) => {
        if (
          content.fecha === dayjs(Date.now()).format("YYYY-MM-DD").toString()
        ) {
          setExists(true);
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
        } else {
          setExists(false);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      exists === false && (await createJornadas());
    }

    setRows(filas);
    setLoading(false);
  };
  const delJornadas = async () => {
    const datos = await getJornadas();
    const jornadas = datos.data;
    jornadas.map(async (el) => {
      if (el.fecha === dayjs(Date.now()).format("YYYY-MM-DD").toString())
        await deleteJornada(el.id);
    });
  };
  const createJornadas = async () => {
    const response = await getTrabajadores();
    const trabajadores = response.data;
    const trabajadoresActivos = [];
    let feriado = false;
    await trabajadores.map((el) => {
      if (el.is_active) trabajadoresActivos.push(el);
    });
    FERIADOS.map((el) => {
      if (el.date === dayjs(Date.now()).format("YYYY-MM-DD").toString)
        // if (el.date === "2023-05-30")
        feriado = true;
    });

    trabajadoresActivos.map(async (el) => {
      await addJornada({
        id: uuid(),

        // fecha: "2023-05-30",
        fecha: dayjs(Date.now()).format("YYYY-MM-DD"),
        feriado: feriado ? true : false,
        septimo_dia: false,
        vacaciones: false,
        ausencia: false,
        horas_extra: 0,
        multa: 0,
        empleado: el.id,
      });
    });
    Swal.fire({
      icon: "success",
      title: `Jornadas del ${dayjs(Date.now())
        .format("YYYY-MM-DD")
        .toString()} Creadas Exitosamente`,
      confirmButtonAriaLabel: "OK",
    }).then(() => {
      window.location.reload();
    });
  };
  const Regenerate = () => {
    Swal.fire({
      title: "¿Está Seguro?",
      text: "¡Perderá todos los cambios que haya hecho!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await delJornadas();
        await createJornadas();
      }
    });
  };
  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    const getFeriados = async () => {
      const a = await axios.get(
        "https://date.nager.at/api/v3/PublicHolidays/2023/NI"
      );
      FERIADOS = a.data;
    };
    getFeriados();
  }, []);
  return (
    <Box sx={{ height: "65vh", width: "100%" }}>
      <div
        style={{
          marginTop: "-1.5rem",
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          height: "3rem",
        }}
      >
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => Regenerate()}
        >
          <RotateLeftIcon fontSize="medium" />
          <p style={{ color: "transparent" }}>a</p> Regenerar
        </MDButton>
        <MDTypography variant="h4">
          Jornadas del {dayjs(Date.now()).format("YYYY-MM-DD").toString()}
        </MDTypography>
      </div>
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

export default JornadasTable;
