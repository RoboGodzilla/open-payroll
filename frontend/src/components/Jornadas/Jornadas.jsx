import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import Footer from "../Footer";
import JornadasTable from "./JornadasTable";

const Jornadas = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <div style={{ height: "75vh" }}>
        <JornadasTable />
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Jornadas;
