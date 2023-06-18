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
  const [rows, setRows] = useState([]);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);
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
                <DeleteIcon />
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
      <br />
      <Footer />
    </DashboardLayout>
  );
};

export default Colilla;
