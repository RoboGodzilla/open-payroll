import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import Footer from "../Footer";
import TrabajadoresTable from "./TrabajadoresTable";
const Trabajadores = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ height: "80vh" }}>
        <TrabajadoresTable />
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Trabajadores;
