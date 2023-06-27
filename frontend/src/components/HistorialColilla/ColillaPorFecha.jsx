import { ThemeProvider } from "@emotion/react";
import MDTypography from "../MDTypography";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Chip, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "../../context";
import Swal from "sweetalert2";
import { addNomina, deleteNomina, getNomina } from "../../api/nomina/nomina";
import dayjs from "dayjs";
import { getTrabajadores } from "../../api/trabajadores/trabajadores";
import MDButton from "../MDButton";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function CreateDataElement(
  id,
  nombre,
  vacaciones,
  aguinaldo,
  fecha_inicial,
  fecha_final,
  salario_bruto,
  deducciones,
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
    viaticos,
    salario_neto,
  };
}

const MES = new Date().getMonth() + 1;

const ColillaPorFecha = ({ FiltroFecha }) => {
  const [rows, setRows] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [controller] = useMaterialUIController();
  const [cambiosTrabajadores, setCambiosTrabajadores] = useState(null);
  const [exists, setExists] = useState(null);
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
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
    { field: "nombre", headerName: "Trabajador", width: 300 },
    {
      field: "fecha_inicial",
      headerName: "Fecha Inicial",
      width: 100,
    },
    {
      field: "fecha_final",
      headerName: "Fecha Final",
      width: 100,
    },
    {
      field: "vacaciones",
      headerName: "Vacaciones",
      headerAlign: "center",
      align: "center",
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
              <Chip
                label="No Aplica"
                color="error"
                className="chipActive"
                style={{ width: 90 }}
              />
            )}
          </>
        );
      },
    },
    {
      field: "aguinaldo",
      headerName: "Aguinaldo",
      headerAlign: "center",
      align: "center",
      width: 110,
      renderCell: (params) => {
        const valor = params.row.aguinaldo;
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
              <Chip
                label="No Aplica"
                color="error"
                className="chipActive"
                style={{ width: 90 }}
              />
            )}
          </>
        );
      },
    },
    {
      field: "salario_bruto",
      headerName: "Salario bruto",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "deducciones",
      headerName: "inns",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "viaticos",
      headerName: "IR",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "salario_neto",
      headerName: "Salario neto",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
  ];
  function obtenerNombreMes(numero) {
    let miFecha = new Date();
    if (0 < numero && numero <= 12) {
      miFecha.setMonth(numero - 1);
      return new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
        miFecha
      );
    } else {
      return null;
    }
  }
  function dosDecimales(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }
  const delColillas = async () => {
    const datos = await getNomina();
    const nomias = datos.data;
    nomias.map(async (el) => {
      if (
        el.fecha_inicial.slice(5, 7) ===
        dayjs(Date.now()).format("YYYY-MM-DD").toString().slice(5, 7)
      )
        await deleteNomina(el.id);
    });
  };
  const createColilla = async () => {
    const DIA_FINAL = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    const FECHA_INICIAL = `2023-${MES.length === 1 ? "0" + MES : MES}-01`;
    const FECHA_FINAL = `2023-${
      MES.length === 1 ? "0" + MES : MES
    }-${DIA_FINAL}`;

    const response = await getTrabajadores();
    const trabajadoresActivos = [];
    setTrabajadores(response.data);
    trabajadores.map((el) => {
      if (el.is_active) trabajadoresActivos.push(el);
    });
    const calculos = [];
    trabajadoresActivos.map((el) => {
      //   let Salario_Anual = 312000;
      let Salario_Anual = Number(el.salario) * 12;
      //   let INNS = (Salario_Anual / 12) * 0.07;
      let INNS = Number(el.salario) * 0.07;
      let IR_anual = 0;
      let Salario_Neto = 0;
      if (Salario_Anual > 100000 && Salario_Anual <= 200000) {
        IR_anual = (Salario_Anual - 100000) * 0.15;
      }
      if (Salario_Anual > 200000 && Salario_Anual <= 350000) {
        IR_anual = (Salario_Anual - 200000) * 0.2 + 15000;
      }
      if (Salario_Anual > 350000 && Salario_Anual <= 500000) {
        IR_anual = (Salario_Anual - 350000) * 0.25 + 45000;
      }
      if (Salario_Anual > 500000) {
        IR_anual = (Salario_Anual - 500000) * 0.3 + 82500;
      }
      //   Salario_Neto = Salario_Anual / 12 - INNS - IR_anual / 12;
      Salario_Neto = Number(el.salario) - INNS - IR_anual / 12;
      calculos.push({
        empleado: el,
        SalarioBruto: Number(el.salario),
        SalarioAnual: dosDecimales(Salario_Anual),
        INNS: dosDecimales(INNS),
        IR: dosDecimales(IR_anual / 12),
        SalarioNeto: dosDecimales(Salario_Neto),
      });
    });
    calculos[0] &&
      calculos.map(async (el) => {
        const a = [el.SalarioAnual, el.INNS];
        const b = [el.IR, el.SalarioNeto];
        await addNomina({
          fecha_inicial: FECHA_INICIAL,
          fecha_final: FECHA_FINAL,
          vacaciones: false,
          aguinaldo: false,
          salario: el.SalarioBruto,
          calculos: a,
          totales: b,
          empleado: el.empleado.id,
          formulas: ["d2bd19ae-692d-4702-a422-6316b5165adc"],
          jornadas: ["c7ff9e42-c3a9-4ad1-a520-37361d314627"],
        });
      });
    setCambiosTrabajadores(true);
    Swal.fire({
      icon: "success",
      title: `Colilla del Mes de ${obtenerNombreMes(MES)} Creada Exitosamente`,
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
        await delColillas();
        await createColilla();
      }
    });
  };
  const getData = async () => {
    setLoading(true);
    const response = await getNomina();
    const filas = [];
    const datos = response.data;
    {
      datos.map((content) => {
        if (
          content.fecha_final.slice(5, 7) ===
          dayjs(Date.now()).format("YYYY-MM-DD").toString().slice(5, 7)
        ) {
          setExists(true);
          filas.push(
            CreateDataElement(
              content.id,
              content.empleadoinfo.nombre + " " + content.empleadoinfo.apellido,
              content.vacaciones,
              content.aguinaldo,
              content.fecha_inicial,
              content.fecha_final,
              content.salario,
              content.calculos[1],
              content.totales[0],
              content.totales[1]
            )
          );
        } else {
          setExists(false);
        }
      });
    }
    datos[0] === null && createColilla();
    setData(true);
    setRows(filas);
    setLoading(false);
  };
  //   async
  useEffect(() => {
    getData();
  }, [data]);
  useEffect(() => {
    cambiosTrabajadores && createColilla();
  }, [cambiosTrabajadores]);
  return (
    <Box sx={{ height: "60vh", width: "100%" }}>
      <ThemeProvider theme={darkMode ? dark : ligth}>
        <DataGrid
          loading={loading}
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

export default ColillaPorFecha;
