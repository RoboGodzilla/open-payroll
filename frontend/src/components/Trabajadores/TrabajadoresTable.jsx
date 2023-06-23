import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Chip, ThemeProvider, createTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditarTrabajador from "../../layouts/modals/EditarTrabajador";
import AgregarTrabajador from "../../layouts/modals/AgregarTrabajador";
import {
  getTrabajadores,
  addTrabajador,
  updateTrabajador,
} from "../../api/trabajadores/trabajadores";
import { useEffect, useState } from "react";
import MDButton from "../MDButton";
import { useMaterialUIController } from "../../context";
import TrabajadoresActions from "./TrabajadoresActions";

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

const TrabajadoresTable = () => {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  const [controller] = useMaterialUIController();
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

  const createTrabajador = async (data) => {
    await addTrabajador(data);
    setData(data);
  };

  const upTrabajador = async (data) => {
    await updateTrabajador(data);
    setData(data);
  };
  const abrirModalAgregar = () => {
    setModalAgregar(!modalAgregar);
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
      width: 120,
      renderCell: (params) => {
        const valor = params.row.is_active;
        return (
          <>
            {valor ? (
              <Chip
                label={"Activo"}
                color="primary"
                className="chipActive"
                style={{ width: 80 }}
              />
            ) : (
              <Chip label="Inactivo" color="error" style={{ width: 80 }} />
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <TrabajadoresActions
          {...{ params }}
          data={data}
          setData={setData}
          setTrabajadorSeleccionado={setTrabajadorSeleccionado}
          abrirModalEditar={abrirModalEditar}
        />
      ),
    },
  ];
  const getData = async () => {
    const filas = [];
    const datos = await getTrabajadores();
    if (datos.data.id != null) setData(true);
    {
      datos.data.map((content) => {
        // datos.map((content) => {
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
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [data]);

  return (
    <Box sx={{ height: "65vh", width: "95%" }}>
      <div>
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => abrirModalAgregar()}
        >
          <AddIcon fontSize="medium" />
          <p style={{ color: "transparent" }}>a</p> Agregar
        </MDButton>
      </div>

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
    </Box>
  );
};

export default TrabajadoresTable;
