import Footer from "../Footer";
import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import { addGrupos } from "../../api/grupos/grupos";
import { useState } from "react";
import MDButton from "../MDButton";
import AddIcon from "@mui/icons-material/Add";
import CrearGrupo from "../../layouts/modals/CrearGrupo";
import GruposTable from "./GruposTable";

const Grupos = () => {
  const [cambios, setCambios] = useState(false);
  const [modalCrearGrupo, setModalCrearGrupo] = useState(false);

  const abrirModalCrearGrupo = () => {
    setModalCrearGrupo(!modalCrearGrupo);
  };

  const createGrupo = async (data) => {
    await addGrupos(data);
    setCambios(!cambios);
    // setData(data);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <MDButton
          color="success"
          variant="gradient"
          onClick={() => abrirModalCrearGrupo()}
        >
          <AddIcon fontSize="medium" />
          <p style={{ color: "transparent" }}>a</p> Crear
        </MDButton>
      </div>

      {modalCrearGrupo && (
        <CrearGrupo
          modalCrearGrupo={modalCrearGrupo}
          abrirModalCrearGrupo={abrirModalCrearGrupo}
          createGrupo={createGrupo}
        />
      )}
      <div style={{ height: "75vh" }}>
        <GruposTable cambios={cambios} setCambios={setCambios} />
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Grupos;
