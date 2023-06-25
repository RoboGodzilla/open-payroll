import DashboardLayout from "./LayoutContainers/DashboardLayout";
import DashboardNavbar from "./Navbars/DashboardNavbar";
import Footer from "./Footer";
import { TextField } from "@mui/material";
import { useState } from "react";
import "../assets/styles/formulario.css";
import Swal from "sweetalert2";
import MDButton from "./MDButton";
import data from "../data/formulario.json";
import MDTypography from "./MDTypography";

const Formulario = () => {
  const [ir, setIr] = useState(data[0].IR[0].procentaje);
  // console.log(data[0].IR[0].Formula1);
  // console.log(data[0].IR[0]);
  // console.log(data[0].INNS[0]);
  // console.log(data[0].URL[0]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form className="form">
        <MDTypography variant="h3">IR</MDTypography>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "-8vh",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            <MDTypography variant="h5">Formula 1</MDTypography>
            <TextField
              type="number"
              name="ir"
              value={ir}
              // label="IR"
              onChange={(e) => setIr(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            <MDTypography variant="h5">Formula 2</MDTypography>
            <TextField
              type="number"
              name="ir"
              // value={data[0].IR[0].Formula3}
              label="IR"
              // onChange={(e) => setIr(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div
        className="btn"
        style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
      >
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => {
            Swal.fire("Guardado", "Cambios Guardados Exitosamente", "success");
          }}
        >
          Guardar
        </MDButton>
        <MDButton
          color="primary"
          variant="gradient"
          onClick={() => {
            Swal.fire({
              title: "¿Está Seguro?",
              text: "¡Está apunto de reestablecer los valores!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Reestablecer",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("¡Datos Reestablecidos!", "", "success");
              }
            });
          }}
        >
          Reestablecer
        </MDButton>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </DashboardLayout>
  );
};

export default Formulario;
