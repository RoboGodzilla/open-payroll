import DashboardLayout from "./LayoutContainers/DashboardLayout";
import DashboardNavbar from "./Navbars/DashboardNavbar";
import Footer from "./Footer";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "../assets/styles/formulario.css";
import Swal from "sweetalert2";
import MDButton from "./MDButton";

const Formulario = () => {
  const [ir, setIr] = useState({});
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <form className="form">
        <h2>IR</h2>
        <div className="row">
          <TextField
            name="ir"
            label="IR"
            onChange={(e) => setIr(e.target.value)}
          />
          <TextField
            name="ir"
            label="IR"
            onChange={(e) => setIr(e.target.value)}
          />
          <TextField
            name="ir"
            label="IR"
            onChange={(e) => setIr(e.target.value)}
          />
        </div>
        <div className="row">
          <TextField
            name="ir"
            label="IR"
            onChange={(e) => setIr(e.target.value)}
          />
          <TextField
            name="ir"
            label="IR"
            onChange={(e) => setIr(e.target.value)}
          />
          <TextField
            name="ir"
            label="IR"
            onChange={(e) => setIr(e.target.value)}
          />
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
            Swal.fire(
              "Restablecer",
              "Los Datos se han Reestablecido Exitosamente",
              "success"
            );
          }}
        >
          Reestablecer
        </MDButton>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Formulario;
