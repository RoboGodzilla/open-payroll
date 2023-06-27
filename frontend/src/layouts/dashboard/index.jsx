import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import MDButton from "../../components/MDButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

import Footer from "../../components/Footer";
import HistorialJornadasTable from "../../components/HistorialJornadas/HistorialJornadasTable";
import { Button } from "@mui/material";
import HistorialColillaTable from "../../components/HistorialColilla/HistorialColillaTable";

const Dashboard = () => {
  const [verJornadas, setVerJornadas] = useState(false);
  const [verColillas, setVerColillas] = useState(false);

  const handleJornadas = () => {
    verColillas && setVerColillas(false);
    setVerJornadas(!verJornadas);
  };
  const handleColillas = () => {
    verJornadas && setVerJornadas(false);
    setVerColillas(!verColillas);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <Button
          style={{
            background: !verJornadas ? "#4caf50" : "#f44336",
            color: "white",
          }}
          variant="contained"
          onClick={() => handleJornadas()}
        >
          {!verJornadas ? (
            <RemoveRedEyeIcon fontSize="medium" />
          ) : (
            <VisibilityOffIcon fontSize="medium" />
          )}
          <p style={{ color: "transparent" }}>a</p>
          Historial de Jornadas
        </Button>
        <MDButton
          color={!verColillas ? "success" : "error"}
          variant="gradient"
          onClick={() => handleColillas()}
        >
          {!verColillas ? (
            <RemoveRedEyeIcon fontSize="medium" />
          ) : (
            <VisibilityOffIcon fontSize="medium" />
          )}
          <p style={{ color: "transparent" }}>a</p>Historial Colillas
        </MDButton>
      </div>
      {verJornadas && (
        <div style={{ height: "73vh" }}>
          <HistorialJornadasTable />
        </div>
      )}
      {verColillas && (
        <div style={{ height: "73vh" }}>
          <HistorialColillaTable />
        </div>
      )}
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
