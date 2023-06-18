import DashboardLayout from "./LayoutContainers/DashboardLayout";
import DashboardNavbar from "./Navbars/DashboardNavbar";
import Footer from "./Footer";
import TrabajadoresTable from "./TrabajadoresTable";
const Trabajadores = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <TrabajadoresTable />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </DashboardLayout>
  );
};

export default Trabajadores;
