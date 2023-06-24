// Material Dashboard 2 React example components
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import MDButton from "../../components/MDButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

import Footer from "../../components/Footer";
import HistorialJornadasTable from "../../components/HistorialJornadas/HistorialJornadasTable";

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
        <MDButton
          color={!verJornadas ? "success" : "error"}
          variant="gradient"
          onClick={() => handleJornadas()}
        >
          {!verJornadas ? (
            <RemoveRedEyeIcon fontSize="medium" />
          ) : (
            <VisibilityOffIcon fontSize="medium" />
          )}
          <p style={{ color: "transparent" }}>a</p>Historial Jornadas
        </MDButton>
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
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
